import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ElicitRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { courseMaterial, courseRoot, createPlan, criteriaView, getLesson, goals, lessons, toolChecklist } from "../src/curriculum.js";
import { tips } from "../src/tips.js";
import { ProgressStore, type Profile, type Review } from "../src/progress.js";

const profile: Profile = { topics: ["javascript"], level: "beginner", topicLevels: {}, priorKnowledge: {}, includePrerequisites: false, projectPath: "/tmp/my-learning-project" };
const practiced: Review = { status: "practiced", evidence: "Erster Versuch", checks: [], understanding: "" };

test("Katalog ist eindeutig, Quellen existieren und Voraussetzungen sind frueher eingeordnet", async () => {
  assert.equal(new Set(lessons.map((lesson) => lesson.id)).size, lessons.length);
  for (const [index, lesson] of lessons.entries()) {
    for (const prerequisite of lesson.prerequisites) {
      const prerequisiteIndex = lessons.findIndex((entry) => entry.id === prerequisite);
      assert.ok(prerequisiteIndex >= 0 && prerequisiteIndex < index);
    }
    for (const source of await courseMaterial(lesson.id)) assert.ok(source.content.length > 0, source.path);
    assert.ok(lesson.criteria.length > 0);
    assert.ok(lesson.hints.length > 0);
    assert.ok(lesson.starter && lesson.example, `${lesson.id}: Ausgangsstand und Beispiel fehlen`);
    assert.ok(lesson.inspiration.length > 0, `${lesson.id}: Inspiration fehlt`);
    assert.ok(lesson.steps.length >= 2 && lesson.steps.length <= 7, `${lesson.id}: Schrittzahl`);
    assert.ok(lesson.sources.length <= 4, `${lesson.id}: zu viele Kapitel in einem Modul`);
  }
  assert.throws(() => getLesson("../../package.json"), /Unbekannte Lektion/);
});

test("Lernkatalog deckt alle fachlichen Buchkapitel und Setup ab", async () => {
  const summary = await readFile(join(courseRoot, "public/Doku/src/SUMMARY.md"), "utf8");
  const paths = [...summary.matchAll(/\]\(\.\/(0[2-7]_[^)]+\.md)\)/g)].map((match) => match[1]).filter((path) => path !== "02_setup/aiTutor.md");
  const covered = new Set(lessons.flatMap((lesson) => lesson.sources));
  for (const path of paths) assert.ok(covered.has(path), `Nicht abgedeckt: ${path}`);
});

test("Werkzeugliste folgt den gewaehlten Themen; Node/npm werden nie abgefragt", () => {
  const askable = (topicsChosen: Parameters<typeof createPlan>[0]) => toolChecklist(createPlan(topicsChosen, true)).filter((entry) => !entry.alreadyVerified).map((entry) => entry.tool);
  assert.deepEqual(askable(["html"]), ["chrome", "liveserver"]);
  assert.ok(!toolChecklist(createPlan(["css"], true)).some((entry) => entry.tool === "node"));
  assert.ok(toolChecklist(createPlan(["react"], true)).some((entry) => entry.tool === "node" && entry.alreadyVerified));
  assert.ok(!askable(["react"]).includes("node" as never));
});

test("Buch-Tipps sind je Lektion hinterlegt und kommen nicht doppelt vor", () => {
  const ids = new Set(lessons.map((lesson) => lesson.id));
  for (const id of Object.keys(tips)) assert.ok(ids.has(id), `Unbekannte Lektion: ${id}`);
  for (const lesson of lessons) assert.ok((tips[lesson.id] ?? []).length > 0, `${lesson.id}: Tipps fehlen`);
  const all = Object.values(tips).flat();
  assert.equal(new Set(all).size, all.length);
  assert.ok(tips["html-first-page"].some((tip) => tip.includes("Emmet") && tip.includes("`!`")));
});

test("Zielseiten gehoeren zu bekannten Modulen; HTML- und CSS-Module haben eines", () => {
  const ids = new Set(lessons.map((lesson) => lesson.id));
  for (const [id, goal] of Object.entries(goals)) {
    assert.ok(ids.has(id), id);
    assert.match(goal.url, /^https:\/\/learn-web-engineering\.web\.app\//);
  }
  for (const lesson of lessons.filter((entry) => ["html-article-header", "html-article-content", "html-article-extras"].includes(entry.id) || (entry.topic === "css" && entry.id !== "css-rwd-theory"))) {
    assert.ok(goals[lesson.id], `${lesson.id}: Zielseite fehlt`);
  }
  for (const lesson of lessons.filter((entry) => entry.topic === "html")) {
    assert.ok(!JSON.stringify(lesson).includes("irgendein") && !JSON.stringify(lesson).includes("beliebiger"));
  }
});

test("Verstaendniskriterien sind markiert, damit sie einmal gemeinsam gefragt werden", () => {
  const types = criteriaView(getLesson("html-first-page")).map((entry) => entry.type);
  assert.deepEqual(types, ["verhalten", "verhalten", "verhalten", "verstaendnis"]);
  assert.ok(lessons.filter((lesson) => lesson.id !== "react-intro").every((lesson) => criteriaView(lesson).some((entry) => entry.type === "verhalten")));
});

test("Themenfilter und transitive Voraussetzungen erzeugen einen geordneten Plan", () => {
  assert.ok(createPlan(["react"], false).every((lesson) => lesson.topic === "react"));
  const plan = createPlan(["react"], true);
  assert.ok(plan.some((lesson) => lesson.id === "html-first-page"));
  assert.ok(plan.some((lesson) => lesson.id === "ts-basics"));
  assert.ok(plan.findIndex((lesson) => lesson.id === "html-first-page") < plan.findIndex((lesson) => lesson.id === "css-intro"));
  assert.ok(!plan.some((lesson) => lesson.id === "backend-fetch"));
});

test("Fortschritt ueberlebt Neustart und Profilwechsel; verified benoetigt alle Belege", async () => {
  const directory = await mkdtemp(join(tmpdir(), "web-tutor-test-"));
  try {
    const store = new ProgressStore(directory);
    assert.equal(await store.read(), null);
    await store.start(profile);
    await assert.rejects(store.start(profile), /existiert bereits/);
    await store.updateProgress("js-basics", practiced);
    await assert.rejects(store.updateProgress("js-basics", { ...practiced, status: "verified" }), /Evidenz/);
    const verified: Review = {
      status: "verified", evidence: "Beispielaufrufe ausgefuehrt und Code geprueft",
      checks: getLesson("js-basics").criteria.map((_, index) => ({ criterion: index + 1, evidence: `Kriterium ${index + 1} beobachtet` })),
      understanding: "Parameter sind Eingaben; return gibt einen Wert an den Aufrufer zurueck."
    };
    await store.updateProgress("js-basics", verified);
    const resumed = new ProgressStore(directory);
    assert.equal((await resumed.required()).currentLesson, "js-objects");
    const changed = await resumed.updateProfile({ topics: ["react"], topicLevels: { react: "experienced" } });
    assert.equal(changed.records["js-basics"].status, "verified");
    assert.equal(changed.profile.topicLevels.react, "experienced");
    assert.equal(changed.currentLesson, "react-intro");
    await assert.rejects(resumed.updateProgress("js-basics", practiced), /nicht im Lernplan/);
    await resumed.updateProgress("react-intro", { ...practiced, status: "solution_shown" });
    assert.equal((await resumed.required()).records["react-intro"].status, "solution_shown");
    assert.equal((await stat(join(directory, "progress.json"))).mode & 0o777, 0o600);
    await writeFile(join(directory, "progress.json"), "invalid json");
    await assert.rejects(resumed.read(), SyntaxError);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("Lernstand mit umbenannter aktueller Lektion wird beim Laden repariert", async () => {
  const directory = await mkdtemp(join(tmpdir(), "web-tutor-legacy-"));
  try {
    const store = new ProgressStore(directory);
    await store.start(profile);
    const file = join(directory, "progress.json");
    const saved = JSON.parse(await readFile(file, "utf8"));
    saved.currentLesson = "html-structure";
    await writeFile(file, JSON.stringify(saved));
    assert.equal((await store.required()).currentLesson, "js-basics");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("Parallele Fortschrittsupdates verlieren keine Ergebnisse", async () => {
  const directory = await mkdtemp(join(tmpdir(), "web-tutor-queue-"));
  try {
    const store = new ProgressStore(directory);
    await store.start(profile);
    await Promise.all([store.updateProgress("js-basics", practiced), store.updateProgress("js-debugging", practiced)]);
    assert.equal(Object.keys((await store.required()).records).length, 2);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("Echter MCP-Client startet Server, liest Quellen und nimmt das Profil wieder auf", async () => {
  const directory = await mkdtemp(join(tmpdir(), "web-tutor-mcp-"));
  async function connect(answer?: string) {
    const client = new Client({ name: "tutor-test", version: "1.0.0" }, answer ? { capabilities: { elicitation: {} } } : undefined);
    if (answer) client.setRequestHandler(ElicitRequestSchema, async () => ({ action: "accept" as const, content: { status: answer } }));
    const configuration = JSON.parse(await readFile(join(courseRoot, "tutor/mcp.vscode.json"), "utf8")).servers["web-engineering-tutor"];
    const transport = new StdioClientTransport({
      command: configuration.command,
      args: configuration.args.map((argument: string) => argument.replaceAll("${workspaceFolder}", courseRoot.replace(/\/$/, ""))),
      cwd: join(courseRoot, "tutor"),
      env: { ...Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined)), TUTOR_STATE_DIR: directory }
    });
    await client.connect(transport);
    return client;
  }
  let client: Client | undefined;
  try {
    client = await connect();
    assert.equal((await client.listTools()).tools.length, 8);
    const topics = await client.callTool({ name: "list_topics" });
    assert.ok(JSON.stringify(topics).includes("typescript"));
    const started = await client.callTool({ name: "start_tutor", arguments: profile });
    assert.ok(!started.isError, JSON.stringify(started));
    const changed = await client.callTool({ name: "update_profile", arguments: { topicLevels: { javascript: "experienced" }, priorKnowledge: { javascript: "kennt Variablen" } } });
    assert.ok(!changed.isError, JSON.stringify(changed));
    const saved = await client.callTool({ name: "update_progress", arguments: { lessonId: "js-basics", ...practiced } });
    assert.ok(!saved.isError, JSON.stringify(saved));
    const material = await client.callTool({ name: "get_course_material", arguments: { lessonId: "js-like" } });
    assert.ok(JSON.stringify(material).includes("Push the button"));
    const invalid = await client.callTool({ name: "get_course_material", arguments: { lessonId: "../../package.json" } });
    assert.equal(invalid.isError, true);
    await client.close();
    client = await connect();
    const progress = await client.callTool({ name: "get_progress" });
    assert.ok(JSON.stringify(progress).includes("my-learning-project"));
    const lesson = await client.callTool({ name: "get_lesson", arguments: {} });
    assert.ok(JSON.stringify(lesson).includes("js-basics"));
    assert.ok(JSON.stringify(lesson).includes("experienced"));
    assert.ok(JSON.stringify(lesson).includes("kennt Variablen") && JSON.stringify(lesson).includes("courseGoal"));
    assert.ok(JSON.stringify(lesson).includes("tips") && JSON.stringify(lesson).includes("Debug-Funktion"));
    assert.ok(JSON.stringify(lesson).includes("steps") && JSON.stringify(lesson).includes("inspiration"));
    assert.ok(JSON.stringify(progress).includes("practiced"));
    const payload = (response: unknown) => JSON.parse((response as { content: { text: string }[] }).content[0].text);
    const withoutSupport = payload(await client.callTool({ name: "ask_ready", arguments: {} }));
    assert.equal(withoutSupport.available, false);
    await client.close();
    client = await connect("hint");
    const withSupport = payload(await client.callTool({ name: "ask_ready", arguments: { question: "Bist du mit dem Grundgerüst fertig?" } }));
    assert.equal(withSupport.answer, "hint");
    assert.match(withSupport.next, /Hinweis/);
  } finally {
    await client?.close();
    await rm(directory, { recursive: true, force: true });
  }
});