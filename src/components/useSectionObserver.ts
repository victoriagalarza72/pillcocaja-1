// src/hooks/useSectionObserver.ts
import { useEffect, useState } from "react";

export function useSectionObserver(ids: string[], rootMargin = "-40% 0px -40% 0px") {
  const [activeId, setActiveId] = useState<string>(ids[0] || "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    // Try to use the nearest scrollable ancestor as the root (works for pages
    // that use an inner overflow container instead of the viewport scroll).
    let rootEl: Element | null = null;
    if (els.length > 0) {
      let p: HTMLElement | null = els[0].parentElement;
      while (p) {
        const style = getComputedStyle(p);
        if (/(auto|scroll|hidden)/.test(style.overflowY)) {
          rootEl = p;
          break;
        }
        p = p.parentElement;
      }
    }

    const obs = new IntersectionObserver(
      (entries) => {
        // el más visible gana
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: rootEl, threshold: [0.25, 0.5, 0.75], rootMargin }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
