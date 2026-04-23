function toCSV(rows, columns) {
  const header = columns.map((c) => escape(c.label)).join(",");
  const body = rows.map(
    (r) => columns.map((c) => escape(r[c.key])).join(",")
  );
  return [header, ...body].join("\n");
}
function escape(val) {
  if (val === null || val === void 0) return "";
  const s = typeof val === "string" ? val : String(val);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export { toCSV as t };
//# sourceMappingURL=csv-CDoNwCwp.js.map
