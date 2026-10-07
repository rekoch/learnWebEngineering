import { cpSync, readdirSync, rmSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = join(root, "public");
const outputDir = join(root, "dist", "hosting");
const reactDir = join(publicDir, "07_react");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} fehlgeschlagen`);
  }
}

run("mdbook", ["--version"]);
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

const excluded = new Set(["00_backend", "07_react", "Doku", "demos"]);
cpSync(publicDir, outputDir, {
  recursive: true,
  filter(sourcePath) {
    const parts = relative(publicDir, sourcePath).split(sep);
    return !excluded.has(parts[0]) && !parts.some(
      (part) => part === "node_modules" || part.startsWith("."),
    );
  },
});

run("mdbook", ["build", join(publicDir, "Doku"), "--dest-dir", join(outputDir, "Doku", "book")]);

const projects = readdirSync(reactDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(reactDir, entry.name, "package.json")))
  .map((entry) => entry.name)
  .sort();

for (const project of projects) {
  const projectDir = join(reactDir, project);
  const demoDir = join(outputDir, "demos", "react", project);
  mkdirSync(dirname(demoDir), { recursive: true });
  run(npm, ["ci"], projectDir);
  run(npm, [
    "run", "build", "--",
    "--base", `/demos/react/${project}/`,
    "--outDir", demoDir,
    "--emptyOutDir",
  ], projectDir);
}

console.log(`Hosting-Build fertig: ${outputDir} (${projects.length} React-Demos und Buch)`);