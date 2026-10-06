import type { ComparisonRow, ComparisonSeries } from "../components/ComparisonTable";

export const gardenSeries: ComparisonSeries[] = [
  { id: "garden-a", label: "Stadtgarten A", color: "#9b7653" },
  { id: "garden-b", label: "Stadtgarten B", color: "#d8b530" },
  { id: "garden-c", label: "Stadtgarten C", color: "#cf5656" },
];

export const gardenRows: ComparisonRow[] = [
  { id: "variant-a", label: "Variante A", values: { "garden-a": 720, "garden-b": 789, "garden-c": 1023 } },
  { id: "variant-b", label: "Variante B", values: { "garden-a": 1916, "garden-b": 1823, "garden-c": 2979 } },
];