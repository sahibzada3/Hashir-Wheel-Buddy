import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MomentViewer, type UserMoments } from "@/components/MomentViewer";
import { usersList as baseUsers, userMomentsData } from "@/lib/momentsData";
import { BottomBar, UploadWheelCluster, type UploadGroup, type UserUpload } from "@/components/PostingSystem";
import { CommentsModal } from "@/components/CommentsModal";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moments Buddy — Daily Feed" },
      { name: "description", content: "Daily moments in a clean vertical feed." },
    ],
  }),
  component: Index,
});

// Vibrant moments for friends in vertical list
interface FriendFeedItem {
  id: string;
  name: string;
  avatar: string;
  timeAgo: string;
  photo: string;
  quote: string;
  graphic: string;
  caption: string;
  reactions: { name: string; avatar: string }[];
}

const feedData: FriendFeedItem[] = [
  {
    id: "f1",
    name: "Arsalan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    timeAgo: "25 min ago",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    quote: "kjawhebfj\nrfffffffffb\nhituehijrtbyj\nrbjrtgbj",
    graphic: "🎻",
    caption: "Morning acoustic vibes along the desert trail.",
    reactions: [
      { name: "Akram", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" },
      { name: "Sara", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" },
      { name: "Omar", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" },
    ],
  },
  {
    id: "f2",
    name: "Darlene",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    timeAgo: "2 hrs ago",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    quote: "Such a wonderful\nand informative\nmoment seen.",
    graphic: "🌸",
    caption: "Fresh sea breeze and quiet morning coffee.",
    reactions: [
      { name: "Akram", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" },
      { name: "Zara", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" },
    ],
  },
  {
    id: "f3",
    name: "Hamza",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    timeAgo: "5 hrs ago",
    photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80",
    quote: "Fast strides\ncrossing bridges\nbefore dark.",
    graphic: "🏃",
    caption: "City marathon training run before sunset.",
    reactions: [
      { name: "Akram", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" },
      { name: "Bilal", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&q=80" },
      { name: "Sara", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" },
    ],
  },
  {
    id: "f4",
    name: "Ayesha",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    timeAgo: "7 hrs ago",
    photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80",
    quote: "Handmade shapes\nfresh from the\nstudio kiln.",
    graphic: "🎨",
    caption: "Ceramics showcase exhibition today.",
    reactions: [
      { name: "Akram", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" },
      { name: "Hina", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" },
    ],
  },
  {
    id: "f5",
    name: "Bilal",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
    timeAgo: "12 hrs ago",
    photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80",
    quote: "20km coastal\ntrail under\nclear skies.",
    graphic: "🚴",
    caption: "Waterfront cycling route along the bay.",
    reactions: [
      { name: "Akram", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" },
      { name: "Ali", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80" },
    ],
  },
  {
    id: "f6",
    name: "Fatima",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    timeAgo: "1 day ago",
    photo: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
    quote: "Garden lights\nglowing under\nthe pines.",
    graphic: "✨",
    caption: "Weekend gathering lights and warm memories.",
    reactions: [
      { name: "Akram", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" },
      { name: "Sara", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" },
    ],
  },
];

// Helper to convert an item into MomentViewer data
function buildViewerFromFeedItem(item: FriendFeedItem): UserMoments {
  return {
    userIndex: 0,
    name: item.name,
    avatar: item.avatar,
    handle: `@${item.name.toLowerCase()}`,
    moments: [
      {
        id: `${item.id}-photo`,
        title: "Photo Moment",
        description: item.caption,
        time: item.timeAgo,
        gradient: "bg-gradient-to-br from-zinc-800 to-zinc-950",
        image: item.photo,
        momentType: "photo",
        likes: 18,
      },
      {
        id: `${item.id}-quote`,
        title: "Quote Moment",
        quoteText: item.quote,
        description: item.caption,
        time: item.timeAgo,
        gradient: "bg-gradient-to-br from-stone-900 to-neutral-950",
        momentType: "quote",
        likes: 24,
      },
      {
        id: `${item.id}-graphic`,
        title: item.graphic,
        graphicEmoji: item.graphic,
        description: item.caption,
        time: item.timeAgo,
        gradient: "bg-gradient-to-br from-indigo-950 to-zinc-950",
        momentType: "graphic",
        likes: 31,
      },
    ],
  };
}

function buildViewerFromUserUploads(uploads: UserUpload[], description: string): UserMoments {
  return {
    userIndex: 999,
    name: "Hashir",
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23FF3BA7'/%3E%3Ctext x='20' y='26' text-anchor='middle' font-size='18' fill='white'%3E👤%3C/text%3E%3C/svg%3E",
    handle: "@hashir",
    moments: uploads.map((u) => ({
      id: u.id,
      title: u.type === "photo" ? (u.mediaType === "video" ? "📹 My Video" : "📷 My Photo") : u.type === "quote" ? `"${u.quoteText}"` : `${u.graphicEmoji}`,
      description: description || "My daily moment upload.",
      time: "Just now",
      gradient: u.type === "photo"
        ? "bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900"
        : u.type === "quote"
          ? "bg-gradient-to-br from-stone-900 via-zinc-800 to-neutral-900"
          : "bg-gradient-to-br from-indigo-950 via-slate-900 to-zinc-900",
      image: u.type === "photo" ? u.photoUrl : undefined,
      graphicEmoji: u.type === "graphic" ? u.graphicEmoji : undefined,
      quoteText: u.type === "quote" ? u.quoteText : undefined,
      momentType: u.type,
      likes: 12,
    })),
  };
}

function Index() {
  const [activeViewerUser, setActiveViewerUser] = useState<UserMoments | null>(null);
  const [commentsTarget, setCommentsTarget] = useState<{ name: string; caption: string } | null>(null);

  const [uploadGroup, setUploadGroup] = useState<UploadGroup>({
    uploads: [
      {
        id: "demo-photo",
        type: "photo",
        photoUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        mediaType: "image",
      },
      {
        id: "demo-quote",
        type: "quote",
        quoteText: "kjawhebfj\nrfffffffffb\nhituehijrtbyj\nrbjrtgbj",
      },
      {
        id: "demo-graphic",
        type: "graphic",
        graphicEmoji: "🎻",
        graphicMotion: "float",
      },
    ],
    description: "Such a wonderful and informative thing i have ever seen.",
  });

  return (
    <main className="app-shell" style={{ background: "#FFFFFF", color: "#111827" }}>
      <section
        className="phone-stage"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* App Masthead */}
        <header
          style={{
            padding: "14px 18px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            background: "#FFFFFF",
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF3BA7" }} />
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", color: "#111827" }}>
              MOMENTS BUDDY
            </span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#FF3BA7", letterSpacing: "0.05em" }}>
            DAILY FEED
          </span>
        </header>

        {/* ── VERTICAL FEED: Fits 3 users on screen, extreme left layout ── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "8px 14px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* USER SLOT (Hashir) at top if has uploads */}
          {uploadGroup.uploads.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: "8px 0 10px",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                minHeight: "calc((100dvh - 180px) / 3)",
                justifyContent: "center",
              }}
            >
              {/* Profile Image + Name + Time in top corner */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF3BA7, #9B51E0)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      color: "#fff",
                      boxShadow: "0 0 10px rgba(255,59,167,0.4)",
                      border: "1.5px solid #FFFFFF",
                      flexShrink: 0,
                    }}
                  >
                    👤
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#111827" }}>
                    Hashir <span style={{ color: "#FF3BA7", fontSize: 10, fontWeight: 800 }}>(You)</span>
                  </span>
                </div>
                {/* Time in corner */}
                <span style={{ fontSize: 10.5, color: "#9CA3AF", fontWeight: 500 }}>
                  Just now
                </span>
              </div>

              {/* Row: Extreme left half-covered uploads + Compact caption/react box */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                {/* Extreme Left Uploads (Half-covered style) */}
                <div
                  onClick={() => setActiveViewerUser(buildViewerFromUserUploads(uploadGroup.uploads, uploadGroup.description))}
                  style={{ flexShrink: 0, cursor: "pointer" }}
                >
                  <UploadWheelCluster
                    group={uploadGroup}
                    onClick={() => setActiveViewerUser(buildViewerFromUserUploads(uploadGroup.uploads, uploadGroup.description))}
                  />
                </div>

                {/* Compact Right Side Box: Caption + React Button + Akram+3 */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    background: "#FAFAFA",
                    borderRadius: 14,
                    padding: "8px 10px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {/* Caption line */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "#1F2937",
                      fontWeight: 600,
                      fontStyle: "italic",
                      lineHeight: 1.35,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    "{uploadGroup.description || "Daily moment."}"
                  </p>

                  {/* React Button & Reactions row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                    {/* Reactions text */}
                    <div
                      onClick={() => setCommentsTarget({ name: "Hashir", caption: uploadGroup.description })}
                      style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                          alt="Akram"
                          style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid #fff" }}
                        />
                        <img
                          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                          alt="Sara"
                          style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid #fff", marginLeft: -5 }}
                        />
                      </div>
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: "#4B5563" }}>
                        Akram + 3
                      </span>
                    </div>

                    {/* React Button */}
                    <button
                      onClick={() => setCommentsTarget({ name: "Hashir", caption: uploadGroup.description })}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 8,
                        background: "#FF3BA7",
                        border: "none",
                        color: "#FFFFFF",
                        fontSize: 10,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        cursor: "pointer",
                      }}
                    >
                      <Heart size={10} fill="#FFFFFF" />
                      <span>React</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FRIENDS FEED ITEMS */}
          {feedData.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: "8px 0 10px",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                minHeight: "calc((100dvh - 180px) / 3)",
                justifyContent: "center",
              }}
            >
              {/* 1. Profile Image + Name + Time in corner */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1.5px solid rgba(0,0,0,0.08)",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#111827" }}>
                    {item.name}
                  </span>
                </div>
                {/* Time in corner */}
                <span style={{ fontSize: 10.5, color: "#9CA3AF", fontWeight: 500 }}>
                  {item.timeAgo}
                </span>
              </div>

              {/* 2. Row: Extreme Left Uploads + Compact Caption/React Box */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                {/* Extreme Left Uploads: Photo + Black Quote Card + Floating Graphic exactly matching image */}
                <div
                  onClick={() => setActiveViewerUser(buildViewerFromFeedItem(item))}
                  style={{
                    position: "relative",
                    width: 124,
                    height: 64,
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  {/* Photo Square (Extreme Left) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 56,
                      height: 56,
                      borderRadius: 8,
                      overflow: "hidden",
                      border: "1.5px solid rgba(0,0,0,0.12)",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
                      background: "#E5E7EB",
                      zIndex: 1,
                    }}
                  >
                    <img src={item.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  {/* Black Quote Card (Half covers Photo) */}
                  <div
                    style={{
                      position: "absolute",
                      left: 34,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      background: "#000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 7,
                        color: "#FFFFFF",
                        textAlign: "center",
                        lineHeight: 1.25,
                        fontWeight: 600,
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.quote}
                    </span>
                  </div>

                  {/* Graphic Sticker (Half covers Quote) */}
                  <span
                    style={{
                      position: "absolute",
                      left: 66,
                      top: "45%",
                      transform: "translateY(-50%)",
                      fontSize: 44,
                      lineHeight: 1,
                      display: "inline-block",
                      filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.25))",
                      zIndex: 3,
                    }}
                  >
                    {item.graphic}
                  </span>
                </div>

                {/* Compact Right Side Box: Caption + React Button + Akram+3 */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    background: "#FAFAFA",
                    borderRadius: 14,
                    padding: "8px 10px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {/* Caption line */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "#1F2937",
                      fontWeight: 600,
                      fontStyle: "italic",
                      lineHeight: 1.35,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    "{item.caption}"
                  </p>

                  {/* React Button & Reactions row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                    {/* Reactions text */}
                    <div
                      onClick={() => setCommentsTarget({ name: item.name, caption: item.caption })}
                      style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {item.reactions.slice(0, 2).map((r, i) => (
                          <img
                            key={r.name + i}
                            src={r.avatar}
                            alt={r.name}
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              border: "1px solid #fff",
                              marginLeft: i === 0 ? 0 : -5,
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: "#4B5563" }}>
                        Akram + {item.reactions.length}
                      </span>
                    </div>

                    {/* React Button */}
                    <button
                      onClick={() => setCommentsTarget({ name: item.name, caption: item.caption })}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 8,
                        background: "#FF3BA7",
                        border: "none",
                        color: "#FFFFFF",
                        fontSize: 10,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        cursor: "pointer",
                      }}
                    >
                      <Heart size={10} fill="#FFFFFF" />
                      <span>React</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Modals & Viewers ── */}

        {/* Card Deck Swipe Viewer on item click */}
        {activeViewerUser !== null && (
          <MomentViewer
            user={activeViewerUser}
            onClose={() => setActiveViewerUser(null)}
          />
        )}

        {/* Comments & Reactions Modal */}
        {commentsTarget !== null && (
          <CommentsModal
            userName={commentsTarget.name}
            caption={commentsTarget.caption}
            onClose={() => setCommentsTarget(null)}
          />
        )}
      </section>

      {/* Bottom Posting Bar (White background, pink plus button, 3 upload tools) */}
      <BottomBar
        group={uploadGroup}
        onGroupChange={setUploadGroup}
      />
    </main>
  );
}
