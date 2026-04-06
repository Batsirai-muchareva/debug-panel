const t = /* @__PURE__ */ new Map();
let a = !1;
const o = (e) => {
  if (d(e.id), t.has(e.id))
    throw new Error(`[DevPanel] Provider ${e.id} is already registered`);
  for (const r of e.variants)
    if (i(r.id))
      throw new Error(`[DevPanel] Variant "${r.id}" is already registered`);
  t.set(e.id, e);
}, d = (e) => {
  if (a)
    throw new Error(
      `[DevPanel] Cannot register "${e}" after init. Register inside the "dev-panel:init" event.`
    );
}, l = () => [...t.values()], f = (e) => t.get(e), i = (e) => {
  for (const r of t.values()) {
    const n = r.variants.find(({ id: s }) => s === e);
    if (n)
      return n;
  }
}, c = () => {
  a = !0;
}, v = { add: o, seal: c, getAll: l, find: f, findVariant: i };
export {
  v as providerRegistry
};
