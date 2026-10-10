import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { X, Heart } from "lucide-react";

export interface MomentItem {
  id: string;
  title: string;
  description: string;
  time: string;
  location?: string;
  gradient: string;
  image?: string;        // data URL or src for photo moments
  graphicEmoji?: string; // for graphic sticker moments
  quoteText?: string;    // for quote moments
  momentType?: "photo" | "graphic" | "quote" | "friend";
  likes: number;
}

export interface UserMoments {
  userIndex: number;
  name: string;
  avatar: string;
  handle: string;
  moments: MomentItem[];
}

interface MomentViewerProps {
  user: UserMoments;
  initialIndex?: number;
  onClose: () => void;
  onNextUser?: () => void;
  onPrevUser?: () => void;
}

export function MomentViewer({ user, initialIndex = 0, onClose }: MomentViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [hasLikedMap, setHasLikedMap] = useState<Record<string, boolean>>({});

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    loop: false,
    duration: 18,
    dragFree: false,
  });

  const moments = user.moments;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(initialIndex, true);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, initialIndex, onSelect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi, onClose]);

  const toggleLike = (id: string, base: number) => {
    const liked = hasLikedMap[id] ?? false;
    const cur = likesMap[id] ?? base;
    setHasLikedMap((p) => ({ ...p, [id]: !liked }));
    setLikesMap((p) => ({ ...p, [id]: liked ? cur - 1 : cur + 1 }));
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "rgba(0,0,0,0.94)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        position: "relative",
        width: "100%", maxWidth: 420,
        height: "100dvh",
        display: "flex", flexDirection: "column",
        paddingTop: 16, paddingBottom: 28,
      }}>

        {/* ── Header: avatar + name + close ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingInline: 20, paddingBottom: 14, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                objectFit: "cover",
                border: "1.5px solid rgba(255,255,255,0.25)",
              }}
            />
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: 0, lineHeight: 1.2 }}>
                {user.name}
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: 0 }}>
                {moments[selectedIndex]?.time ?? ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* ── Embla card deck ── */}
        <div
          ref={emblaRef}
          style={{
            overflow: "hidden", flex: 1,
            cursor: "grab", touchAction: "pan-y",
          }}
        >
          <div style={{
            display: "flex", height: "100%",
            alignItems: "center",
          }}>
            {moments.map((m, i) => {
              const isActive = i === selectedIndex;
              return (
                <div
                  key={m.id}
                  style={{
                    flex: "0 0 80%",
                    height: "88%",
                    paddingInline: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease",
                    transform: isActive ? "scale(1)" : "scale(0.84)",
                    opacity: isActive ? 1 : 0.55,
                    cursor: isActive ? "grab" : "pointer",
                  }}
                  onClick={() => { if (!isActive) emblaApi?.scrollTo(i); }}
                >
                  <CardContent
                    moment={m}
                    isActive={isActive}
                    liked={hasLikedMap[m.id] ?? false}
                    likes={(likesMap[m.id] ?? m.likes)}
                    onLike={() => toggleLike(m.id, m.likes)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dots ── */}
        {moments.length > 1 && (
          <div style={{
            display: "flex", justifyContent: "center", gap: 6,
            paddingTop: 14,
          }}>
            {moments.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                style={{
                  width: i === selectedIndex ? 20 : 7,
                  height: 7, borderRadius: 999,
                  background: i === selectedIndex ? "#fff" : "rgba(255,255,255,0.3)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Individual card ────────────────────────────────────────────────────────────
function CardContent({ moment, isActive, liked, likes, onLike }: {
  moment: MomentItem;
  isActive: boolean;
  liked: boolean;
  likes: number;
  onLike: () => void;
}) {
  const isPhoto = (moment.momentType === "photo" || (!moment.momentType && moment.image));
  const isGraphic = moment.momentType === "graphic";
  const isQuote = moment.momentType === "quote";

  return (
    <div
      style={{
        width: "100%", height: "100%",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: isActive
          ? "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 12px 32px rgba(0,0,0,0.5)",
        position: "relative",
        display: "flex", flexDirection: "column",
        background: isGraphic ? "#0a0a0a" : isQuote ? "#101010" : "#111",
        userSelect: "none",
      }}
    >
      {/* ── Photo card ── */}
      {isPhoto && moment.image && (
        <img
          src={moment.image}
          alt={moment.title}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
          draggable={false}
        />
      )}

      {/* Gradient overlay on photo */}
      {isPhoto && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
        }} />
      )}

      {/* ── Graphic card: large emoji centered ── */}
      {isGraphic && (
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          {/* Soft radial glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(255,59,167,0.06) 0%, transparent 70%)",
          }} />
          <span style={{ fontSize: 120, lineHeight: 1, zIndex: 1 }}>
            {moment.graphicEmoji || moment.title}
          </span>
        </div>
      )}

      {/* ── Quote card: styled text ── */}
      {isQuote && (
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 28,
          background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
        }}>
          <div style={{
            border: "2px solid rgba(255,255,255,0.7)",
            borderRadius: 20, padding: "28px 24px",
            textAlign: "center",
          }}>
            <p style={{
              color: "#fff", fontSize: 20, fontStyle: "italic",
              lineHeight: 1.55, margin: 0, fontWeight: 500,
            }}>
              {moment.quoteText || moment.title}
            </p>
          </div>
        </div>
      )}

      {/* ── Friend moment card (generic) ── */}
      {!isPhoto && !isGraphic && !isQuote && (
        <>
          {/* Gradient background */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          }} />
          {moment.image && (
            <img
              src={moment.image}
              alt=""
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", opacity: 0.45,
                mixBlendMode: "overlay",
              }}
              draggable={false}
            />
          )}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
          }} />
        </>
      )}

      {/* ── Bottom info bar (shows on photo + friend cards) ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 20px 22px",
        zIndex: 5,
      }}>
        {/* Title */}
        <p style={{
          color: "#fff", fontSize: 20, fontWeight: 700,
          margin: 0, lineHeight: 1.25,
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
        }}>
          {(isGraphic || isQuote) ? "" : moment.title}
        </p>

        {/* Description */}
        {moment.description && !isQuote && !isGraphic && (
          <p style={{
            color: "rgba(255,255,255,0.75)", fontSize: 13, margin: "6px 0 0",
            lineHeight: 1.5, textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}>
            {moment.description}
          </p>
        )}

        {/* Like button */}
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onLike(); }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 999,
              background: liked ? "rgba(244,63,94,0.85)" : "rgba(255,255,255,0.12)",
              border: "none", color: "#fff", fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s ease",
              backdropFilter: "blur(8px)",
            }}
          >
            <Heart size={14} style={{ fill: liked ? "#fff" : "none", stroke: "#fff" }} />
            {likes}
          </button>
        </div>
      </div>
    </div>
  );
}
