// ----------- CSV export helper -----------
// Converts an array of row-objects into a CSV string.
// Safe against commas, quotes, newlines inside values.

/**
 * @param {Array<Record<string, any>>} rows
 * @param {Array<{key: string, label: string}>} columns
 */
export function toCSV(rows, columns) {
  const header = columns.map((c) => escape(c.label)).join(',');
  const body = rows.map((r) =>
    columns.map((c) => escape(r[c.key])).join(',')
  );
  return [header, ...body].join('\n');
}

function escape(val) {
  if (val === null || val === undefined) return '';
  const s = typeof val === 'string' ? val : String(val);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
