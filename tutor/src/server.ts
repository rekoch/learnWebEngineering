import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { courseGoal, courseMaterial, createPlan, criteriaView, getLesson, goals, lessons, levels, teachingStyles, toolChecklist, topics, topicTools, tutorInstructions } from "./curriculum.js";
import { tips } from "./tips.js";
import { defaultStateDirectory, profileSchema, ProgressStore, progressView, reviewSchema, statusSchema } from "./progress.js";

const store = new ProgressStore(process.env.TUTOR_STATE_DIR || defaultStateDirectory());
const server = new McpServer({ name: "web-engineering-tutor", version: "0.1.0" }, { instructions: tutorInstructions });
const readOnly = { readOnlyHint: true, destructiveHint: false, openWorldHint: false };
const localWrite = { readOnlyHint: false, destructiveHint: false, openWorldHint: false };

function result(value: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] };
}

server.registerTool("list_topics", {
  description: "Zeigt Themen, Lernmodule und Voraussetzungen dieses Kurses. Ohne Profil nutzbar.",
  annotations: readOnly
}, async () => result({ topics, levels, courseGoal, requiredToolsPerTopic: topicTools, lessons: lessons.map(({ id, topic, title, prerequisites }) => ({ id, topic, title, prerequisites })) }));

server.registerTool("start_tutor", {
  description: "Startet den Web-Engineering-Tutor mit gewaehlten Themen und Niveau. Erst Themen, Niveau, eigenen Arbeitsordner und Vorkenntnisse je Thema (einmalig, als priorKnowledge) klaeren. Existierendes Profil wird nicht ueberschrieben.",
  inputSchema: profileSchema.shape,
  annotations: localWrite
}, async (profile) => result({ instructions: tutorInstructions, ...progressView(await store.start(profile)) }));

server.registerTool("get_progress", {
  description: "Laedt Profil, Plan und lokalen Lernstand; zuerst fuer Start oder Wiederaufnahme aufrufen.",
  annotations: readOnly
}, async () => result({ instructions: tutorInstructions, stateDirectory: store.directory, ...progressView(await store.read()) }));

server.registerTool("update_profile", {
  description: "Aendert auf Wunsch Themen, Niveau pro Thema, Voraussetzungen oder Arbeitsordner. Bisherige Ergebnisse bleiben erhalten; topicLevels ersetzt die bisherigen Einzelwerte.",
  inputSchema: profileSchema.partial().shape,
  annotations: localWrite
}, async (changes) => result(progressView(await store.updateProfile(changes))));

server.registerTool("get_lesson", {
  description: "Liefert Ausgangsstand, kleines Beispiel, Teilschritte, Inspirationsquellen, Gesamtaufgabe, Kriterien, Voraussetzungen und niveaugerechten Unterrichtsstil. Ohne ID wird die aktuelle Lektion geliefert. Teilschritte einzeln nach teachingStyle vergeben, Hinweise nur auf Nachfrage.",
  inputSchema: { lessonId: z.string().optional() },
  annotations: readOnly
}, async ({ lessonId }) => {
  const state = await store.required();
  const lesson = getLesson(lessonId ?? state.currentLesson);
  const level = state.profile.topicLevels[lesson.topic] ?? state.profile.level;
  const plan = createPlan(state.profile.topics, state.profile.includePrerequisites);
  return result({
    ...lesson, level, teachingStyle: teachingStyles[level], projectPath: state.profile.projectPath,
    inPlan: plan.some((entry) => entry.id === lesson.id),
    toolChecklist: toolChecklist(plan),
    prerequisitesToCheck: lesson.prerequisites.filter((id) => state.records[id]?.status !== "verified"),
    criteria: criteriaView(lesson),
    courseGoal, goal: goals[lesson.id] ?? null, tips: tips[lesson.id] ?? [],
    priorKnowledge: state.profile.priorKnowledge[lesson.topic] ?? null,
    answeredQuestions: Object.entries(state.records).filter(([, record]) => record.understanding).map(([id, record]) => ({ lesson: id, understanding: record.understanding })),
    note: "Starter klaeren, Quellen mit get_course_material laden. Nie die ganze Aufgabe auf einmal geben: steps nacheinander, jeweils mit example und inspiration. Zielseite (goal) nennen. Tipps (tips) beim passenden Teilschritt je einmal weitergeben, nicht alle auf einmal. Kriterien vom Typ verstaendnis in EINER Frage am Ende pruefen; nichts erneut abfragen, was priorKnowledge oder answeredQuestions schon zeigen. fallbackStart und Loesung nur auf ausdruecklichen Wunsch."
  });
});

server.registerTool("get_course_material", {
  description: "Laedt die originalen Buchquellen einer bekannten Lektion als fachliche Referenz. Enthaelt teils Loesungscode: nicht ungefragt an Lernende weitergeben. Keine frei waehlbaren Dateipfade.",
  inputSchema: { lessonId: z.string() },
  annotations: readOnly
}, async ({ lessonId }) => result({ lessonId, materials: await courseMaterial(lessonId) }));

server.registerTool("update_progress", {
  description: "Speichert die Tutor-Beurteilung, fuehrt selbst KEINE Pruefung aus. verified erst nach Code-/Verhaltenspruefung aller Kriterien und Verstaendnisfrage. Loesungen als solution_shown, Ueberspringen als skipped, ungepruefte Arbeit als practiced speichern.",
  inputSchema: {
    lessonId: z.string(), status: statusSchema,
    evidence: z.string().trim().max(3000), checks: z.array(reviewSchema),
    understanding: z.string().trim().max(1500)
  },
  annotations: localWrite
}, async ({ lessonId, ...review }) => result(progressView(await store.updateProgress(lessonId, review))));

const readyOptions = [
  { const: "done", title: "Fertig, bitte prüfen" },
  { const: "hint", title: "Ich brauche einen Hinweis" },
  { const: "smaller", title: "Schritt kleiner machen" },
  { const: "pause", title: "Noch nicht fertig / Pause" }
];
const readyActions: Record<string, string> = {
  done: "Prüfe jetzt den Code der Person und stelle danach die Verständnisfrage, falls die Lektion abgeschlossen ist.",
  hint: "Gib einen kleinen Hinweis, noch keine Lösung.",
  smaller: "Zerlege den aktuellen Schritt in einen kleineren und zeige ein Beispiel.",
  pause: "Speichere den Stand mit update_progress (practiced, Teilschritt in evidence) und beende freundlich."
};

server.registerTool("ask_ready", {
  description: "Zeigt der lernenden Person eine Auswahl mit Schaltflächen (fertig, Hinweis, kleiner, Pause). IMMER verwenden, wenn du wissen willst, ob sie mit einem Schritt oder einer Lektion fertig ist, statt einen Freitext wie «schreib done» zu verlangen. Meldet das Ergebnis available=false, nutze ein Fragewerkzeug des Clients mit denselben vier Optionen oder frage kurz im Chat.",
  inputSchema: { question: z.string().trim().max(300).optional() },
  annotations: readOnly
}, async ({ question }) => {
  const unavailable = { available: false, fallback: "Frage mit einem Fragewerkzeug des Clients (Optionen: Fertig, bitte prüfen / Ich brauche einen Hinweis / Schritt kleiner machen / Noch nicht fertig, Pause) oder kurz im Chat." };
  if (!server.server.getClientCapabilities()?.elicitation) return result(unavailable);
  try {
    const answer = await server.server.elicitInput({
      mode: "form",
      message: question ?? "Bist du mit diesem Schritt fertig?",
      requestedSchema: { type: "object", properties: { status: { type: "string", title: "Wie weit bist du?", oneOf: readyOptions } }, required: ["status"] }
    }, { timeout: 30 * 60 * 1000 });
    const status = String(answer.content?.status ?? "");
    if (answer.action !== "accept" || !(status in readyActions)) return result({ available: true, answer: "keine Auswahl", next: "Die Person hat nicht geantwortet. Warte auf ihre nächste Nachricht." });
    return result({ available: true, answer: status, next: readyActions[status] });
  } catch {
    return result(unavailable);
  }
});

await server.connect(new StdioServerTransport());