import type { ComparisonRow, ComparisonSeries } from "../components/ComparisonTable";

export const gardenSeries: ComparisonSeries[] = [
  { id: "garden-a", label: "Stadtgarten A", color: "var(--brand-brown)" },
  { id: "garden-b", label: "Stadtgarten B", color: "var(--brand-yellow)" },
  { id: "garden-c", label: "Stadtgarten C", color: "var(--brand-red)" },
];

export const gardenRows: ComparisonRow[] = [
  { id: "variant-a", label: "Variante A", values: { "garden-a": 720, "garden-b": 789, "garden-c": 1023 } },
  { id: "variant-b", label: "Variante B", values: { "garden-a": 1916, "garden-b": 1823, "garden-c": 2979 } },
];