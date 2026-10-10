import React, { useState } from "react";
import { X, Send, Heart, MessageSquare, Reply, Share2, MoreHorizontal, Smile } from "lucide-react";

export interface CommentReply {
  id: string;
  author: string;
  avatar: string;
  text: string;
  taggedUser?: string;
  time: string;
  likes: number;
}

export interface CommentThread {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  location?: string;
  likes: number;
  reactions?: Record<string, number>; // emoji reactions (e.g. ❤️, 🔥, 👏)
  replies: CommentReply[];
}

interface CommentsModalProps {
  userName: string;
  caption: string;
  onClose: () => void;
}

const EMOJI_OPTIONS = ["❤️", "🔥", "👏", "😂", "😍", "🎉"];

export function CommentsModal({ userName, caption, onClose }: CommentsModalProps) {
  const [threads, setThreads] = useState<CommentThread[]>([
    {
      id: "t1",
      author: "Darlene Lawson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      text: "Beautiful result! Loving how the moments line up together.",
      time: "10h ago",
      location: "Desert Breezes",
      likes: 2,
      reactions: { "❤️": 2 },
      replies: [
        {
          id: "r1",
          author: "Bryan P.",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
          text: "if you check the latest update, it flows seamlessly with no obligation!",
          taggedUser: "Darlene",
          time: "1h ago",
          likes: 1,
        },
      ],
    },
    {
      id: "t2",
      author: "Akram Khan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      text: "Such a vibe! Just checking if this fits into the daily recap.",
      time: "8h ago",
      location: "The Cove",
      likes: 4,
      reactions: { "🔥": 3, "❤️": 1 },
      replies: [],
    },
    {
      id: "t3",
      author: "Jose Tamez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      text: "Super clean layout and aesthetic 👌",
      time: "8h ago",
      location: "Desert View",
      likes: 1,
      reactions: { "👏": 1 },
      replies: [],
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [replyingTo, setReplyingTo] = useState<{ threadId: string; author: string } | null>(null);
  const [activeEmojiPickerThreadId, setActiveEmojiPickerThreadId] = useState<string | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, boolean>>({});

  const toggleThreadLike = (id: string) => {
    setLikesMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddReaction = (threadId: string, emoji: string) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== threadId) return t;
        const currentReactions = { ...(t.reactions || {}) };
        currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
        return { ...t, reactions: currentReactions };
      })
    );
    setActiveEmojiPickerThreadId(null);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    if (replyingTo) {
      // Add a nested reply with tagged user
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id !== replyingTo.threadId) return t;
          const newReply: CommentReply = {
            id: `r-${Date.now()}`,
            author: "Hashir",
            avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23FF3BA7'/%3E%3Ctext x='20' y='26' text-anchor='middle' font-size='18' fill='white'%3E👤%3C/text%3E%3C/svg%3E",
            text: inputText.trim(),
            taggedUser: replyingTo.author,
            time: "Just now",
            likes: 0,
          };
          return { ...t, replies: [...t.replies, newReply] };
        })
      );
      setReplyingTo(null);
    } else {
      // Add top-level comment
      const newThread: CommentThread = {
        id: `t-${Date.now()}`,
        author: "Hashir",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23FF3BA7'/%3E%3Ctext x='20' y='26' text-anchor='middle' font-size='18' fill='white'%3E👤%3C/text%3E%3C/svg%3E",
        text: inputText.trim(),
        time: "Just now",
        location: "Wheel Buddy",
        likes: 0,
        reactions: {},
        replies: [],
      };
      setThreads((prev) => [...prev, newThread]);
    }

    setInputText("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 70,
        }}
      />

      {/* Modal Bottom Sheet matching the uploaded Nextdoor/Reddit style UI */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100vw, 420px)",
          height: "82dvh",
          maxHeight: 740,
          background: "#FFFFFF",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "24px 24px 0 0",
          zIndex: 71,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -20px 50px rgba(0,0,0,0.22)",
          overflow: "hidden",
        }}
      >
        {/* Top Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.18)" }} />
        </div>

        {/* Top Stats Bar matching Image 1: [146 Likes] [42 Comments] [Share] */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 18px 12px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(0,0,0,0.04)",
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              <Heart size={14} color="#FF3BA7" fill="#FF3BA7" />
              <span>146</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(0,0,0,0.04)",
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              <MessageSquare size={14} color="#4B5563" />
              <span>{threads.reduce((acc, t) => acc + 1 + t.replies.length, 0)}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                background: "rgba(0,0,0,0.04)",
                padding: "6px 10px",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                fontWeight: 600,
                color: "#4B5563",
              }}
            >
              <Share2 size={13} />
              <span>9</span>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.05)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#6B7280",
              }}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Caption summary */}
        {caption && (
          <div
            style={{
              padding: "8px 18px",
              background: "rgba(255,59,167,0.05)",
              borderBottom: "1px solid rgba(255,59,167,0.1)",
              fontSize: 12,
              color: "#374151",
              fontStyle: "italic",
            }}
          >
            <span style={{ fontWeight: 700, color: "#111827", fontStyle: "normal" }}>{userName}: </span>
            "{caption}"
          </div>
        )}

        {/* Comment Thread List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {threads.map((t) => {
            const isLiked = likesMap[t.id] || false;
            return (
              <div key={t.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Top Comment Item */}
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <img
                    src={t.avatar}
                    alt={t.author}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1.5px solid rgba(0,0,0,0.08)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{t.author}</span>
                        <span style={{ fontSize: 11, color: "#9CA3AF", marginLeft: 6 }}>
                          {t.time} {t.location ? `• ${t.location}` : ""}
                        </span>
                      </div>
                      <MoreHorizontal size={14} color="#9CA3AF" />
                    </div>

                    <p style={{ margin: "4px 0 6px", fontSize: 13, color: "#1F2937", lineHeight: 1.45 }}>
                      {t.text}
                    </p>

                    {/* Reactions display (e.g. ❤️ 2, 🔥 1) */}
                    {t.reactions && Object.keys(t.reactions).length > 0 && (
                      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                        {Object.entries(t.reactions).map(([emoji, count]) => (
                          <span
                            key={emoji}
                            style={{
                              background: "rgba(0,0,0,0.04)",
                              border: "1px solid rgba(0,0,0,0.06)",
                              borderRadius: 999,
                              padding: "2px 6px",
                              fontSize: 11,
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <span>{emoji}</span>
                            <span style={{ fontWeight: 600, color: "#4B5563" }}>{count}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions row: Heart | Reply | React (emoji) */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, color: "#6B7280" }}>
                      <button
                        onClick={() => toggleThreadLike(t.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          color: isLiked ? "#FF3BA7" : "#6B7280",
                          fontWeight: 600,
                          padding: 0,
                        }}
                      >
                        <Heart size={13} fill={isLiked ? "#FF3BA7" : "none"} />
                        <span>{t.likes + (isLiked ? 1 : 0)}</span>
                      </button>

                      <button
                        onClick={() => setReplyingTo({ threadId: t.id, author: t.author })}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          color: "#6B7280",
                          fontWeight: 600,
                          padding: 0,
                        }}
                      >
                        <Reply size={13} />
                        <span>Reply</span>
                      </button>

                      <div style={{ position: "relative" }}>
                        <button
                          onClick={() =>
                            setActiveEmojiPickerThreadId(activeEmojiPickerThreadId === t.id ? null : t.id)
                          }
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            color: "#6B7280",
                            fontWeight: 600,
                            padding: 0,
                          }}
                        >
                          <Smile size={13} />
                          <span>React</span>
                        </button>

                        {/* Floating Emoji Picker Popover */}
                        {activeEmojiPickerThreadId === t.id && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 22,
                              left: 0,
                              background: "#FFFFFF",
                              border: "1px solid rgba(0,0,0,0.12)",
                              borderRadius: 999,
                              padding: "4px 8px",
                              display: "flex",
                              gap: 6,
                              boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
                              zIndex: 10,
                            }}
                          >
                            {EMOJI_OPTIONS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleAddReaction(t.id, emoji)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: 16,
                                  padding: 2,
                                  transition: "transform 0.1s",
                                }}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nested Nested Replies with connected line (Image 1 style) */}
                {t.replies.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      marginLeft: 32,
                      paddingLeft: 12,
                      borderLeft: "2px solid rgba(0,0,0,0.08)",
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <img
                      src={r.avatar}
                      alt={r.author}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid rgba(0,0,0,0.1)",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{r.author}</span>
                        <span style={{ fontSize: 10, color: "#9CA3AF" }}>{r.time}</span>
                      </div>
                      <p style={{ margin: "2px 0 4px", fontSize: 12, color: "#374151", lineHeight: 1.4 }}>
                        {r.taggedUser && (
                          <span style={{ color: "#FF3BA7", fontWeight: 700, textDecoration: "underline", marginRight: 4 }}>
                            @{r.taggedUser}
                          </span>
                        )}
                        {r.text}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, color: "#9CA3AF" }}>
                        <button
                          onClick={() => toggleThreadLike(r.id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: likesMap[r.id] ? "#FF3BA7" : "#6B7280",
                            fontWeight: 600,
                            padding: 0,
                          }}
                        >
                          Like
                        </button>
                        <button
                          onClick={() => setReplyingTo({ threadId: t.id, author: r.author })}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#6B7280",
                            fontWeight: 600,
                            padding: 0,
                          }}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: "10px 16px 20px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "#FAFAFA",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {replyingTo && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingInline: 6 }}>
              <span style={{ fontSize: 11, color: "#6B7280" }}>
                Replying to <b style={{ color: "#FF3BA7" }}>@{replyingTo.author}</b>
              </span>
              <button
                onClick={() => setReplyingTo(null)}
                style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 11, cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23FF3BA7'/%3E%3Ctext x='20' y='26' text-anchor='middle' font-size='18' fill='white'%3E👤%3C/text%3E%3C/svg%3E"
              alt="You"
              style={{ width: 30, height: 30, borderRadius: "50%" }}
            />
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder={replyingTo ? `Reply to @${replyingTo.author}...` : "Add a comment..."}
              style={{
                flex: 1,
                background: "#FFFFFF",
                border: "1.5px solid rgba(0,0,0,0.12)",
                borderRadius: 22,
                padding: "8px 14px",
                fontSize: 12.5,
                outline: "none",
                color: "#111827",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: inputText.trim() ? "#FF3BA7" : "rgba(0,0,0,0.1)",
                color: "#FFFFFF",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: inputText.trim() ? "pointer" : "default",
                flexShrink: 0,
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
