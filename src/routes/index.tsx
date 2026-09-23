import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import portraitProfile from "@/assets/portrait-profile.jpg";
import redSunglasses from "@/assets/red-sunglasses.jpg";
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

const accents: Record<number, React.ReactNode> = {
  0: <div className="free-badge">FREE</div>,
  1: <div className="smile" aria-label="Smiling face"><span>⌣</span></div>,
  2: <div className="speech"><i>YA</i><i>ÖH</i><i>UCH!</i></div>,
  3: <img src={walkingDetail} alt="Fashion in motion" width={816} height={816} loading="lazy" />,
  4: <div className="sattel">Sattel<span>〰</span></div>,
  5: <div className="folder" aria-label="Blue folder" />,
  6: <div className="loops" aria-label="Loop mark">∞</div>,
  7: <img src={redSunglasses} alt="Red sunglasses portrait" width={816} height={816} loading="lazy" />,
  8: <div className="swoosh" aria-label="Swoosh mark">⌁</div>,
  9: <div className="life"><b>♥</b> Life Happens</div>,
  10: <img src={portraitProfile} alt="Portrait in profile" width={816} height={816} loading="lazy" />,
  11: <p className="manifesto">Restart® is a versatile typeface family by Superior Type.<br/><br/>No logical absurdity results from the hypothesis that the world consists of mystic.</p>,
};

function Index() {
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight;
        setTurn(range > 0 ? (window.scrollY / range) * 360 : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <main className="recap-page">
      <header className="masthead" aria-label="Fico recap">
        <div className="wordmark">FICO</div>
        <div className="edition">RECAP 05</div>
      </header>

      <section className="viewport" aria-label="Scrollable year recap">
        <div className="wheel" style={{ transform: `translateY(-50%) rotate(${-turn}deg)` }}>
          {months.map((month, index) => {
            const angle = index * 30;
            return (
              <div className="month" key={month} style={{ transform: `rotate(${angle}deg)` }}>
                <div className="month-line">
                  <span className="month-name">{month}</span>
                  <span className="tick" />
                  <div className="artifact" style={{ transform: `translateY(-50%) rotate(${turn - angle}deg)` }}>
                    {accents[index]}
                  </div>
                </div>
              </div>
            );
          })}
          {Array.from({ length: 48 }).map((_, index) => (
            <span className="minor-tick" key={index} style={{ transform: `rotate(${index * 7.5}deg)` }} />
          ))}
        </div>
      </section>

      <footer className="footer-nav" aria-label="Project details">
        <span>JITTER</span><span>MOTION</span><span>TEMPLATE</span>
      </footer>
      <div className="scroll-space" aria-hidden="true" />
    </main>
  );
}