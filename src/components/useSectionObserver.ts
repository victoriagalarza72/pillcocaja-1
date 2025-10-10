// src/hooks/useSectionObserver.ts
import { useEffect, useState } from "react";

export function useSectionObserver(ids: string[], rootMargin = "-40% 0px -40% 0px") {
  const [activeId, setActiveId] = useState<string>(ids[0] || "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        // el más visible gana
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, threshold: [0.25, 0.5, 0.75], rootMargin }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
