import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { isAbsolute, join, resolve } from "node:path";
import { z } from "zod";
import { courseRoot, createPlan, getLesson, lessons, levels, toolChecklist, topics } from "./curriculum.js";

export const profileSchema = z.object({
  topics: z.array(z.enum(topics)).min(1),
  level: z.enum(levels),
  topicLevels: z.record(z.enum(topics), z.enum(levels)).default({}),
  priorKnowledge: z.record(z.enum(topics), z.string().trim().max(500)).default({}),
  includePrerequisites: z.boolean(),
  projectPath: z.string().min(1).refine(isAbsolute, "Der Arbeitsordner muss ein absoluter Pfad sein.")
});
export const statusSchema = z.enum(["practiced", "verified", "skipped", "solution_shown"]);
export const reviewSchema = z.object({
  criterion: z.number().int().min(1),
  evidence: z.string().trim().min(1).max(1500)
});
const recordSchema = z.object({
  status: statusSchema,
  evidence: z.string().trim().max(3000),
  checks: z.array(reviewSchema),
  understanding: z.string().trim().max(1500),
  updatedAt: z.string().datetime()
});
const stateSchema = z.object({
  version: z.literal(1),
  profile: profileSchema,
  currentLesson: z.string(),
  records: z.record(z.string(), recordSchema)
});
export type Profile = z.infer<typeof profileSchema>;
export type State = z.infer<typeof stateSchema>;
export type Review = Omit<z.infer<typeof recordSchema>, "updatedAt">;

export function defaultStateDirectory(workspace = process.env.TUTOR_WORKSPACE || courseRoot): string {
  const key = createHash("sha256").update(resolve(workspace)).digest("hex").slice(0, 16);
  return join(homedir(), ".learn-web-engineering", key);
}

export class ProgressStore {
  private queue: Promise<unknown> = Promise.resolve();

  constructor(readonly directory: string) {}

  async read(): Promise<State | null> {
    let content: string;
    try {
      content = await readFile(join(this.directory, "progress.json"), "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
    const state = stateSchema.parse(JSON.parse(content));
    // Ältere Lernstände können auf eine inzwischen umbenannte Lektion zeigen.
    if (!lessons.some((lesson) => lesson.id === state.currentLesson)) {
      const plan = createPlan(state.profile.topics, state.profile.includePrerequisites);
      state.currentLesson = plan.find((lesson) => !state.records[lesson.id] || state.records[lesson.id].status === "practiced")?.id ?? plan[0].id;
    }
    return state;
  }

  private async save(state: State): Promise<State> {
    stateSchema.parse(state);
    await mkdir(this.directory, { recursive: true, mode: 0o700 });
    const temporary = join(this.directory, `progress-${randomUUID()}.tmp`);
    await writeFile(temporary, JSON.stringify(state, null, 2) + "\n", { mode: 0o600 });
    await rename(temporary, join(this.directory, "progress.json"));
    return state;
  }

  private change(operation: () => Promise<State>): Promise<State> {
    const result = this.queue.then(operation);
    this.queue = result.catch(() => undefined);
    return result;
  }

  start(profile: Profile): Promise<State> {
    return this.change(async () => {
      if (await this.read()) throw new Error("Ein Lernprofil existiert bereits. Nutze get_progress oder update_profile.");
      const parsed = profileSchema.parse(profile);
      const plan = createPlan(parsed.topics, parsed.includePrerequisites);
      return this.save({ version: 1, profile: parsed, currentLesson: plan[0].id, records: {} });
    });
  }

  updateProfile(changes: Partial<Profile>): Promise<State> {
    return this.change(async () => {
      const state = await this.required();
      state.profile = profileSchema.parse({ ...state.profile, ...changes });
      const plan = createPlan(state.profile.topics, state.profile.includePrerequisites);
      if (!plan.some((lesson) => lesson.id === state.currentLesson)) {
        state.currentLesson = plan.find((lesson) => !state.records[lesson.id] || state.records[lesson.id].status === "practiced")?.id ?? plan[0].id;
      }
      return this.save(state);
    });
  }

  async required(): Promise<State> {
    const state = await this.read();
    if (!state) throw new Error("Noch kein Lernprofil vorhanden. Starte mit start_tutor.");
    return state;
  }

  updateProgress(lessonId: string, review: Review): Promise<State> {
    return this.change(async () => {
      const state = await this.required();
      const lesson = getLesson(lessonId);
      const plan = createPlan(state.profile.topics, state.profile.includePrerequisites);
      if (!plan.some((entry) => entry.id === lessonId)) throw new Error("Die Lektion ist nicht im Lernplan. Passe zuerst die Themen an.");
      const record = recordSchema.parse({ ...review, updatedAt: new Date().toISOString() });
      if (record.status === "verified") {
        const covered = new Set(record.checks.map((check) => check.criterion));
        if (!record.evidence || !record.understanding || lesson.criteria.some((_, index) => !covered.has(index + 1))) {
          throw new Error("verified benoetigt eine Pruefzusammenfassung, Evidenz fuer jedes Kriterium und eine Verstaendnisantwort.");
        }
      }
      if (record.checks.some((check) => check.criterion > lesson.criteria.length)) throw new Error("Unbekannte Kriteriennummer.");
      state.records[lessonId] = record;
      state.currentLesson = record.status === "practiced" ? lessonId : (plan.find((entry) => !state.records[entry.id] || state.records[entry.id].status === "practiced")?.id ?? lessonId);
      return this.save(state);
    });
  }
}

export function progressView(state: State | null) {
  if (!state) return { profile: null, message: "Frage nach Themen, Niveau und eigenem Arbeitsordner; rufe dann start_tutor auf." };
  const plan = createPlan(state.profile.topics, state.profile.includePrerequisites);
  return {
    ...state,
    toolChecklist: toolChecklist(plan),
    plan: plan.map((lesson) => ({
      id: lesson.id, title: lesson.title, topic: lesson.topic,
      level: state.profile.topicLevels[lesson.topic] ?? state.profile.level,
      prerequisiteModule: !state.profile.topics.includes(lesson.topic),
      status: state.records[lesson.id]?.status ?? "not_started",
      current: lesson.id === state.currentLesson
    })),
    note: "Fortschritt ist eine gespeicherte Tutor-Beurteilung, kein unabhaengiger Testnachweis. Pruefe den aktuellen Code beim Wiederaufnehmen erneut."
  };
}