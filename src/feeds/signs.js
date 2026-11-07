// One-off check: do VDOT's electronic sign messages include I-66 express lane prices?
// Reads the SmarterRoads "DMS Status (Active)" feed without knowing its exact layout: it splits the XML into
// one record per sign and keeps the signs whose text mentions 66 and shows a dollar amount.
export function signsWithPrices(xml, road = '66') {
  const text = String(xml);
  // The most common repeated element is one sign
  const counts = {};
  for (const m of text.matchAll(/<([A-Za-z_][\w:.-]*)[\s>]/g)) counts[m[1]] = (counts[m[1]] || 0) + 1;
  const tag = Object.entries(counts).filter(([t]) => !/^(\?xml|data|root)$/i.test(t))
    .sort((a, b) => b[1] - a[1]).map(([t]) => t)
    .find((t) => new RegExp(`<${t}[\\s>][\\s\\S]*?</${t}>`).test(text));
  if (!tag) return { tag: null, total: 0, matches: [] };
  const records = [...text.matchAll(new RegExp(`<${tag}[\\s>][\\s\\S]*?</${tag}>`, 'g'))].map((m) => m[0]);
  const flat = (r) => r.replace(/<[^>]+?(\w+)="([^"]*)"/g, ' $2 ').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const roadRe = new RegExp(`(^|\\D)${road}(\\D|$)`);
  const matches = records.map(flat).filter((t) => roadRe.test(t) && /\$\s?\d/.test(t)).slice(0, 50);
  return { tag, total: records.length, matches };
}
