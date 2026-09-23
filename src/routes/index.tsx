import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import walkingDetail from "@/assets/walking-detail.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fico — Recap 05" },
      { name: "description", content: "An interactive circular year in motion." },
      { property: "og:title", content: "Fico — Recap 05" },
      { property: "og:description", content: "An interactive circular year in motion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const months = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

const accents: Record<number, ReactNode> = {
  0: <div className="free-badge">FREE</div>,
  1: <div className="smile" aria-label="Smiling face"><span>⌣</span></div>,
  2: <div className="speech" aria-label="Ya, öh, uch"><i>YA</i><i>ÖH</i><i>UCH!</i></div>,
  3: <img src={walkingDetail} alt="Fashion in motion" width={816} height={816} />,
  4: <div className="sattel">Sattel<span>〰</span></div>,
  5: <div className="folder" aria-label="Blue folder" />,
  6: <div className="loops" aria-label="Loop mark">∞</div>,
  7: <div className="summer-orb" aria-label="Summer portrait">●</div>,
  8: <div className="swoosh" aria-label="Swoosh mark">⌁</div>,
  9: <div className="life"><b>♥</b> Life Happens</div>,
  10: <div className="portrait-pair"><span>T</span></div>,
  11: <p className="manifesto">Restart® is a versatile typeface family by Superior Type.<br/><br/>No logical absurdity results from the hypothesis that the world consists of mystic.</p>,
};

const START_ROTATION = -60;

function Index() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(START_ROTATION);
  const dragRef = useRef({ active: false, pointerId: -1, lastY: 0, lastX: 0, lastTime: 0, velocity: 0 });
  const inertiaRef = useRef<number | null>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    const wheel = wheelRef.current;
    if (!surface || !wheel) return;

    const paint = () => {
      const rotation = rotationRef.current;
      wheel.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      wheel.querySelectorAll<HTMLElement>("[data-counter-rotate]").forEach((item) => {
        const base = Number(item.dataset["baseAngle"] ?? 0);
        item.style.transform = `translateY(-50%) rotate(${-rotation - base}deg)`;
      });
    };

    const stopInertia = () => {
      if (inertiaRef.current !== null) cancelAnimationFrame(inertiaRef.current);
      inertiaRef.current = null;
    };

    const onPointerDown = (event: PointerEvent) => {
      stopInertia();
      surface.setPointerCapture(event.pointerId);
      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        lastY: event.clientY,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocity: 0,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;
      event.preventDefault();
      const now = performance.now();
      const dy = event.clientY - drag.lastY;
      const dx = event.clientX - drag.lastX;
      const elapsed = Math.max(8, now - drag.lastTime);
      const delta = dy * 0.34 + dx * 0.08;
      rotationRef.current += delta;
      drag.velocity = (delta / elapsed) * 16;
      drag.lastY = event.clientY;
      drag.lastX = event.clientX;
      drag.lastTime = now;
      paint();
    };

    const release = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;
      drag.active = false;
      if (surface.hasPointerCapture(event.pointerId)) surface.releasePointerCapture(event.pointerId);
      let velocity = drag.velocity;
      const glide = () => {
        velocity *= 0.94;
        if (Math.abs(velocity) < 0.015) {
          inertiaRef.current = null;
          return;
        }
        rotationRef.current += velocity;
        paint();
        inertiaRef.current = requestAnimationFrame(glide);
      };
      inertiaRef.current = requestAnimationFrame(glide);
    };

    paint();
    surface.addEventListener("pointerdown", onPointerDown);
    surface.addEventListener("pointermove", onPointerMove, { passive: false });
    surface.addEventListener("pointerup", release);
    surface.addEventListener("pointercancel", release);
    return () => {
      stopInertia();
      surface.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", release);
      surface.removeEventListener("pointercancel", release);
    };
  }, []);

  return (
    <main className="app-shell">
      <section ref={surfaceRef} className="phone-stage" aria-label="Drag to rotate the year">
        <header className="masthead">
          <div className="wordmark">FICO</div>
          <div className="edition">RECAP 05</div>
        </header>

        <div ref={wheelRef} className="wheel">
          {months.map((month, index) => {
            const angle = index * 30;
            return (
              <div className="month" key={month} style={{ "--month-angle": `${angle}deg` } as CSSProperties}>
                <span className="tick" />
                <span className="month-name">{month}</span>
                <div className="artifact" data-counter-rotate data-base-angle={angle}>
                  {accents[index]}
                </div>
              </div>
            );
          })}
          {Array.from({ length: 36 }).map((_, index) => (
            <span className="minor-tick" key={index} style={{ "--tick-angle": `${index * 10}deg` } as CSSProperties} />
          ))}
        </div>

        <footer className="footer-nav"><span>JITTER</span><span>MOTION</span><span>TEMPLATE</span></footer>
      </section>
    </main>
  );
}