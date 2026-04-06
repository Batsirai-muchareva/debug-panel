import { useEffect as d } from "react";
const l = (t = {}) => {
  const { historySize: i = 100, debug: u = !1 } = t, s = /* @__PURE__ */ new Map(), r = (e) => (s.has(e) || s.set(e, /* @__PURE__ */ new Set()), s.get(e));
  return {
    on: (e, n) => {
      const a = (Array.isArray(e) ? e : [e]).map((c) => {
        const f = r(c);
        return f.add(n), () => f.delete(n);
      });
      return () => a.forEach((c) => c());
    },
    once(e, n) {
      const o = (a) => {
        r(e).delete(o), n(a);
      };
      r(e).add(o);
    },
    emit(e, ...n) {
      const o = n[0];
      r(e).forEach((c) => {
        try {
          c(o);
        } catch (f) {
          console.error(`[EventBus] Error in handler for "${e}":`, f);
        }
      });
    },
    off(e) {
      s.delete(e);
    },
    offAll() {
      s.clear();
    }
  };
}, p = l(), y = (t, i) => {
  d(() => {
    const s = (Array.isArray(t) ? t : [t]).map(
      (r) => p.on(r, i)
    );
    return () => {
      s.forEach((r) => r());
    };
  }, [t, i]);
};
export {
  p as eventBus,
  y as useEventBus
};
