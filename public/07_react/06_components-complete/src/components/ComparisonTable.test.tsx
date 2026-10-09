import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ComparisonTable from "./ComparisonTable";

const series = [
  { id: "first", label: "Erste Reihe", color: "green" },
  { id: "second", label: "Zweite Reihe", color: "red" },
];

describe("ComparisonTable", () => {
  it("scales every row against the maximum of the whole comparison", () => {
    const markup = renderToStaticMarkup(<ComparisonTable title="Test" series={series} rows={[
      { id: "one", label: "Eins", values: { first: 25, second: 50 } },
      { id: "two", label: "Zwei", values: { first: 100, second: 200 } },
    ]} />);
    for (const width of [12.5, 25, 50, 100]) expect(markup).toContain(`width:${width}%`);
    expect(markup).toContain('aria-label="Eins, Erste Reihe: 25"');
  });

  it("renders each value inside its bar", () => {
    const markup = renderToStaticMarkup(<ComparisonTable title="Test" series={series} rows={[
      { id: "one", label: "Eins", values: { first: 25, second: 50 } },
    ]} />);
    for (const value of [25, 50]) {
      expect(markup).toMatch(new RegExp(`<div class="comparison-bar"[^>]*><span class="font-13 comparison-value">${value}</span></div>`));
    }
  });

  it("keeps zero, missing, negative and non-finite values safe", () => {
    const markup = renderToStaticMarkup(<ComparisonTable title="Test" series={series} rows={[
      { id: "zero", label: "Null", values: { first: 0 } },
      { id: "invalid", label: "Ungültig", values: { first: -1, second: Infinity } },
    ]} />);
    expect(markup.match(/width:0%/g)).toHaveLength(4);
    expect(markup).not.toMatch(/NaN|Infinity|width:-/);
  });

  it("handles empty data and gives independent instances their own scale", () => {
    expect(renderToStaticMarkup(<ComparisonTable title="Leer" series={series} rows={[]} />))
      .toContain("Keine Vergleichsdaten vorhanden.");
    expect(renderToStaticMarkup(<ComparisonTable title="Leer" series={[]} rows={[
      { id: "one", label: "Eins", values: {} },
    ]} />)).toContain("Keine Vergleichsdaten vorhanden.");
    const render = (value: number) => renderToStaticMarkup(<ComparisonTable title="Eigenständig" series={series} rows={[
      { id: "one", label: "Eins", values: { first: value, second: value * 2 } },
    ]} />);
    for (const markup of [render(5), render(500)]) {
      expect(markup).toContain("width:50%");
      expect(markup).toContain("width:100%");
    }
  });
});