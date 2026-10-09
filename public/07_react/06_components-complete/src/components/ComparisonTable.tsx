
export type ComparisonSeries = {
  id: string;
  label: string;
  color: string;
};

export type ComparisonRow = {
  id: string;
  label: string;
  values: Record<string, number>;
};

type ComparisonTableProps = {
  title: string;
  series: ComparisonSeries[];
  rows: ComparisonRow[];
  note?: string;
};

function getBarWidth(value: number, maximum: number) {
  if (!Number.isFinite(value) || value <= 0 || maximum <= 0) return 0;
  return Math.min(100, (value / maximum) * 100);
}

export default function ComparisonTable({ title, series, rows, note }: ComparisonTableProps) {
  const maximum = Math.max(0, ...rows.flatMap(row =>
    series.map(item => {
      const value = row.values[item.id] ?? 0;
      return Number.isFinite(value) ? value : 0;
    }),
  ));

  return (
    <section aria-label={title}>
      <h4 className="font-20 mb-s">{title}</h4>
      <div className="comparison-legend">
        {series.map(item => (
          <span key={item.id} className="font-13">
            <span className="comparison-swatch" style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
      {rows.length === 0 || series.length === 0 ? (
        <p className="font-13">Keine Vergleichsdaten vorhanden.</p>
      ) : rows.map(row => (
        <div key={row.id}>
          <h5 className="font-16 font-weight-medium mb-xxs">{row.label}</h5>
          {series.map(item => {
            const rawValue = row.values[item.id] ?? 0;
            const value = Number.isFinite(rawValue) ? Math.max(0, rawValue) : 0;
            return (
              <div
                key={item.id}
                className="comparison-row"
                role="img"
                aria-label={`${row.label}, ${item.label}: ${value}`}
              >
                <div className="comparison-track">
                  <div
                    className="comparison-bar"
                    style={{ width: `${getBarWidth(value, maximum)}%`, backgroundColor: item.color }}
                  />
                </div>
                <span className="font-13 comparison-value">{value}</span>
              </div>
            );
          })}
        </div>
      ))}
      {note && <p className="font-13 font-color-light">{note}</p>}
    </section>
  );
}