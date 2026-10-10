import React, { useState, useRef, useEffect } from "react";
import { Plus, X, Trash2, Camera, Video, Search, Check } from "lucide-react";
import { searchStickers, STICKER_CATEGORIES, motionClass, type Sticker } from "@/lib/graphicsLibrary";

// ── Constants ─────────────────────────────────────────────────────────────────
const PINK = "#FF3BA7";
const PURPLE = "#9B51E0";
const MAX_UPLOADS = 3;

// ── Types ─────────────────────────────────────────────────────────────────────
export type UploadType = "photo" | "graphic" | "quote";

export interface UserUpload {
  id: string;
  type: UploadType;
  photoUrl?: string;       // photo or captured video data URL
  mediaType?: "image" | "video";
  graphicEmoji?: string;   // graphic (raw emoji / sticker, no bg)
  graphicMotion?: string;  // optional motion animation
  quoteText?: string;      // quote
}

export interface UploadGroup {
  uploads: UserUpload[];
  description: string; // shared caption, max 60 chars
}

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM BAR
// ─────────────────────────────────────────────────────────────────────────────
interface BottomBarProps {
  group: UploadGroup;
  onGroupChange: (g: UploadGroup) => void;
}

export function BottomBar({ group, onGroupChange }: BottomBarProps) {
  const [pillOpen, setPillOpen] = useState(false);
  const [activePicker, setActivePicker] = useState<UploadType | null>(null);
  const [showManage, setShowManage] = useState(false);
  const isFull = group.uploads.length >= MAX_UPLOADS;
  const hasUploads = group.uploads.length > 0;

  const handleTypeSelect = (type: UploadType) => {
    setPillOpen(false);
    setActivePicker(type);
  };

  const handleUploadDone = (upload: UserUpload, caption?: string) => {
    const updatedDesc = caption !== undefined && caption.trim() !== "" ? caption.slice(0, 60) : group.description;
    onGroupChange({
      uploads: [...group.uploads, upload],
      description: updatedDesc,
    });
    setActivePicker(null);
  };

  const handleRemove = (id: string) => {
    onGroupChange({
      ...group,
      uploads: group.uploads.filter((u) => u.id !== id),
    });
  };

  const handleDescChange = (v: string) => {
    onGroupChange({ ...group, description: v.slice(0, 60) });
  };

  return (
    <>
      {/* Gradient pill popup with 3 icons exactly as in reference image */}
      {pillOpen && !isFull && (
        <PillMenu onSelect={handleTypeSelect} onClose={() => setPillOpen(false)} />
      )}

      {/* Main Bottom Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100vw, 420px)",
          height: hasUploads ? 90 : 76,
          background: "#FFFFFF",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          zIndex: 30,
          paddingBottom: 4,
        }}
      >
        {!hasUploads ? (
          /* Empty state: Centered round pink + button */
          <button
            onClick={() => setPillOpen((v) => !v)}
            aria-label="Add moment"
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: PINK,
              border: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: `0 0 0 5px rgba(255,59,167,0.22), 0 8px 28px rgba(255,59,167,0.45)`,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <Plus size={30} strokeWidth={2.8} />
          </button>
        ) : (
          /* Has uploads: Centered row with overlapping thumbnails & pink + */
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
              {/* Overlapping Thumbnails */}
              <div
                onClick={() => setShowManage(true)}
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                title="Click to manage uploads"
              >
                {group.uploads.map((u, i) => (
                  <UploadThumb key={u.id} upload={u} index={i} total={group.uploads.length} />
                ))}
              </div>

              {/* Pink + button half-peeking behind recent uploads */}
              {!isFull && (
                <button
                  onClick={() => setPillOpen((v) => !v)}
                  aria-label="Add more"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: PINK,
                    border: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    marginLeft: -14,
                    zIndex: 0,
                    flexShrink: 0,
                    boxShadow: `0 0 0 3px rgba(255,59,167,0.25)`,
                    transition: "transform 0.15s ease",
                  }}
                >
                  <Plus size={22} strokeWidth={2.5} />
                </button>
              )}

              {/* Manage hint button when full */}
              {isFull && (
                <button
                  onClick={() => setShowManage(true)}
                  style={{
                    marginLeft: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 10,
                    cursor: "pointer",
                  }}
                >
                  manage
                </button>
              )}
            </div>

            {/* Editable caption input right in bottom bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", paddingInline: 24 }}>
              <input
                value={group.description}
                onChange={(e) => handleDescChange(e.target.value)}
                maxLength={60}
                placeholder="Caption (shown on wheel)…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#111827",
                  fontSize: 12,
                  fontFamily: "inherit",
                  caretColor: PINK,
                }}
              />
              <span style={{ fontSize: 10, color: "#9CA3AF", flexShrink: 0 }}>
                {group.description.length}/60
              </span>
            </div>
          </>
        )}
      </div>

      {/* Pickers */}
      {activePicker === "photo" && (
        <CameraCaptureSheet
          currentCaption={group.description}
          onDone={handleUploadDone}
          onClose={() => setActivePicker(null)}
        />
      )}
      {activePicker === "graphic" && (
        <RealisticGraphicPickerSheet
          currentCaption={group.description}
          onDone={handleUploadDone}
          onClose={() => setActivePicker(null)}
        />
      )}
      {activePicker === "quote" && (
        <QuotePickerSheet
          currentCaption={group.description}
          onDone={handleUploadDone}
          onClose={() => setActivePicker(null)}
        />
      )}

      {/* Manage Sheet */}
      {showManage && (
        <ManageSheet
          group={group}
          onRemove={handleRemove}
          onClose={() => setShowManage(false)}
          onAddNew={() => {
            setShowManage(false);
            setPillOpen(true);
          }}
        />
      )}
    </>
  );
}

// ── Upload Thumbnail in Bottom Bar ───────────────────────────────────────────
function UploadThumb({ upload, index, total }: { upload: UserUpload; index: number; total: number }) {
  const isQuote = upload.type === "quote";
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: isQuote ? 10 : "50%",
        overflow: "hidden",
        background: isQuote ? "#1a1a1a" : "#111",
        border: "2.5px solid #FFFFFF",
        marginLeft: index === 0 ? 0 : -14,
        zIndex: total - index,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        position: "relative",
      }}
    >
      {upload.type === "photo" && upload.photoUrl && (
        upload.mediaType === "video" ? (
          <video src={upload.photoUrl} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <img src={upload.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )
      )}
      {upload.type === "graphic" && (
        <span style={{ fontSize: 26 }} className={upload.graphicMotion ? (motionClass[upload.graphicMotion] || "") : ""}>
          {upload.graphicEmoji}
        </span>
      )}
      {upload.type === "quote" && (
        <span
          style={{
            fontSize: 8,
            color: "rgba(255,255,255,0.9)",
            padding: 4,
            textAlign: "center",
            lineHeight: 1.25,
            fontStyle: "italic",
          }}
        >
          "{upload.quoteText?.slice(0, 20)}{(upload.quoteText?.length ?? 0) > 20 ? "…" : ""}"
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PILL MENU: Exact match to user image 2 (Gradient border pill, photo / circle / quotes)
// ─────────────────────────────────────────────────────────────────────────────
function PillMenu({ onSelect, onClose }: { onSelect: (t: UploadType) => void; onClose: () => void }) {
  return (
    <>
      {/* Dimmer backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 38,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Floating pill popup directly above the plus button */}
      <div
        style={{
          position: "fixed",
          bottom: 96,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 39,
          padding: 2.5,
          borderRadius: 999,
          background: `linear-gradient(135deg, ${PURPLE}, ${PINK})`,
          boxShadow: `0 8px 32px rgba(255,59,167,0.35)`,
        }}
      >
        <div
          style={{
            background: "#000000",
            borderRadius: 999,
            padding: "8px 26px",
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          {/* 1. Photo / Landscape icon */}
          <button
            onClick={() => onSelect("photo")}
            aria-label="Upload photo or video"
            style={{
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
              <rect x="1" y="1" width="26" height="22" rx="4" fill="#FF3BA7" />
              <circle cx="8" cy="8" r="2.5" fill="#fff" />
              <path d="M4 19L11 11L18 19H4Z" fill="#fff" />
              <path d="M15 19L19 14L24 19H15Z" fill="#fff" opacity="0.85" />
            </svg>
          </button>

          {/* 2. Graphic target / circle icon */}
          <button
            onClick={() => onSelect("graphic")}
            aria-label="Pick graphic sticker"
            style={{
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#FF3BA7" strokeWidth="2.5" />
              <circle cx="14" cy="14" r="6" fill="#FF3BA7" />
              <circle cx="14" cy="14" r="2.5" fill="#fff" />
            </svg>
          </button>

          {/* 3. Quote double quotation marks icon */}
          <button
            onClick={() => onSelect("quote")}
            aria-label="Write quote"
            style={{
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FF3BA7",
            }}
          >
            <span style={{ fontSize: 30, fontWeight: 900, lineHeight: 1, fontFamily: "sans-serif" }}>
              ❝
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA & VIDEO CAPTURE SHEET (With camera permissions & record video / snap)
// ─────────────────────────────────────────────────────────────────────────────
function CameraCaptureSheet({
  currentCaption,
  onDone,
  onClose,
}: {
  currentCaption: string;
  onDone: (u: UserUpload, caption?: string) => void;
  onClose: () => void;
}) {
  const [streamActive, setStreamActive] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [capturedMedia, setCapturedMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const [caption, setCaption] = useState(currentCaption);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Request camera and microphone stream
  const requestCamera = async () => {
    try {
      setPermissionError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStreamActive(true);
    } catch (err: unknown) {
      const e = err as Error;
      setPermissionError(
        e.name === "NotAllowedError" || e.name === "PermissionDeniedError"
          ? "Camera permission was denied. Please allow camera access in your browser or choose a file from your gallery."
          : "Could not access camera. You can still upload from your gallery."
      );
    }
  };

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Snap photo from live camera stream
  const snapPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedMedia({ url: dataUrl, type: "image" });
    // stop stream
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    setStreamActive(false);
  };

  // Start recording video
  const startRecording = () => {
    if (!mediaStreamRef.current) return;
    recordedChunksRef.current = [];
    const recorder = new MediaRecorder(mediaStreamRef.current);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(blob);
      setCapturedMedia({ url: videoUrl, type: "video" });
      setStreamActive(false);
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    };

    recorder.start();
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = window.setInterval(() => {
      setRecordingSeconds((s) => s + 1);
    }, 1000);
  };

  // Stop recording video
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // File picker handler (gallery)
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const isVideo = f.type.startsWith("video/");
    const reader = new FileReader();
    reader.onload = () => {
      setCapturedMedia({ url: reader.result as string, type: isVideo ? "video" : "image" });
    };
    reader.readAsDataURL(f);
  };

  const handleFinish = () => {
    if (!capturedMedia) return;
    onDone(
      {
        id: `p-${Date.now()}`,
        type: "photo",
        photoUrl: capturedMedia.url,
        mediaType: capturedMedia.type,
      },
      caption
    );
  };

  return (
    <Sheet onClose={onClose} title="Capture Moment">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />

      {/* Captured Preview */}
      {capturedMedia ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: "100%" }}>
          <div
            style={{
              width: 170,
              height: 170,
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${PINK}`,
              boxShadow: "0 8px 30px rgba(0,0,0,0.8)",
            }}
          >
            {capturedMedia.type === "video" ? (
              <video
                src={capturedMedia.url}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <img src={capturedMedia.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>

          {/* Caption input while uploading */}
          <div style={{ width: "100%" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: "0 0 6px" }}>
              Caption (shows on wheel, max 60 chars):
            </p>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, 60))}
              placeholder="e.g. Such a wonderful thing i have seen."
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 12,
                color: "#fff",
                padding: "10px 14px",
                fontSize: 13,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", float: "right", marginTop: 4 }}>
              {caption.length}/60
            </span>
          </div>

          <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 8 }}>
            <button
              onClick={() => {
                setCapturedMedia(null);
                setStreamActive(false);
              }}
              style={sheetBtnStyle("secondary")}
            >
              Retake
            </button>
            <button onClick={handleFinish} style={sheetBtnStyle("primary")}>
              Add to Moments →
            </button>
          </div>
        </div>
      ) : streamActive ? (
        /* Live Camera Screen */
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: "100%" }}>
          <div
            style={{
              position: "relative",
              width: 220,
              height: 220,
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${isRecording ? "#ef4444" : PINK}`,
              background: "#000",
            }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
            />
            {isRecording && (
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(239,68,68,0.9)",
                  color: "#fff",
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                REC {recordingSeconds}s
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* Snap photo */}
            {!isRecording && (
              <button
                onClick={snapPhoto}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "#fff",
                  color: "#000",
                  fontSize: 13,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Camera size={16} /> Snap Photo
              </button>
            )}

            {/* Video record */}
            {!isRecording ? (
              <button
                onClick={startRecording}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(239,68,68,0.9)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Video size={16} /> Record Video
              </button>
            ) : (
              <button
                onClick={stopRecording}
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  background: "#ef4444",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Stop Recording
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Initial Camera Request Screen */
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: "2px dashed rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <Camera size={44} color="rgba(255,255,255,0.3)" />
          </div>

          {permissionError && (
            <p style={{ color: "#f87171", fontSize: 12, textAlign: "center", margin: 0, paddingInline: 12 }}>
              {permissionError}
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
            <button onClick={requestCamera} style={sheetBtnStyle("primary")}>
              Open Camera (Snap or Record)
            </button>
            <button onClick={() => fileInputRef.current?.click()} style={sheetBtnStyle("secondary")}>
              Choose from Gallery / Files
            </button>
          </div>
        </div>
      )}
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REALISTIC GRAPHIC / STICKER PICKER SHEET (Search + Motion categories)
// ─────────────────────────────────────────────────────────────────────────────
function RealisticGraphicPickerSheet({
  currentCaption,
  onDone,
  onClose,
}: {
  currentCaption: string;
  onDone: (u: UserUpload, caption?: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<Sticker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [caption, setCaption] = useState(currentCaption);

  const filteredStickers = searchStickers(searchQuery, activeCategory);

  const handleDone = () => {
    if (!selected) return;
    onDone(
      {
        id: `g-${Date.now()}`,
        type: "graphic",
        graphicEmoji: selected.emoji,
        graphicMotion: selected.motion,
      },
      caption
    );
  };

  return (
    <Sheet onClose={onClose} title="Pick a Graphic Sticker">
      {/* Search Input */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 14,
          padding: "8px 12px",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Search size={16} color="rgba(255,255,255,0.4)" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stickers (guitar, fire, heart, moon...)"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 13,
            fontFamily: "inherit",
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 6,
          overflowX: "auto",
          paddingBottom: 4,
          scrollbarWidth: "none",
        }}
      >
        {STICKER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: "pointer",
              border: "none",
              background: activeCategory === cat ? PINK : "rgba(255,255,255,0.07)",
              color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.6)",
              transition: "all 0.15s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Selected Preview with Motion */}
      {selected && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 4,
            padding: 10,
            background: "rgba(255,59,167,0.08)",
            borderRadius: 16,
            border: `1px solid rgba(255,59,167,0.25)`,
            width: "100%",
          }}
        >
          <span
            style={{ fontSize: 56, lineHeight: 1 }}
            className={selected.motion ? (motionClass[selected.motion] || "") : ""}
          >
            {selected.emoji}
          </span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
            {selected.name} {selected.motion ? `(${selected.motion} motion)` : ""}
          </span>
        </div>
      )}

      {/* Stickers Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 8,
          width: "100%",
          maxHeight: 180,
          overflowY: "auto",
          paddingRight: 4,
        }}
      >
        {filteredStickers.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s)}
            style={{
              aspectRatio: "1",
              borderRadius: 12,
              fontSize: 26,
              background: selected?.id === s.id ? "rgba(255,59,167,0.25)" : "rgba(255,255,255,0.04)",
              border: `2px solid ${selected?.id === s.id ? PINK : "transparent"}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.12s ease",
            }}
            title={s.name}
          >
            <span className={s.motion ? (motionClass[s.motion] || "") : ""}>{s.emoji}</span>
          </button>
        ))}
      </div>

      {/* Optional Caption Field */}
      <div style={{ width: "100%" }}>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value.slice(0, 60))}
          placeholder="Caption for wheel (optional, max 60 chars)…"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 12,
            color: "#fff",
            padding: "8px 12px",
            fontSize: 12,
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      </div>

      <button
        onClick={handleDone}
        disabled={!selected}
        style={sheetBtnStyle(selected ? "primary" : "disabled")}
      >
        Add Graphic Sticker →
      </button>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUOTE WRITER SHEET
// ─────────────────────────────────────────────────────────────────────────────
function QuotePickerSheet({
  currentCaption,
  onDone,
  onClose,
}: {
  currentCaption: string;
  onDone: (u: UserUpload, caption?: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [caption, setCaption] = useState(currentCaption);

  const handleDone = () => {
    if (!text.trim()) return;
    onDone(
      {
        id: `q-${Date.now()}`,
        type: "quote",
        quoteText: text.trim(),
      },
      caption || text.trim()
    );
  };

  return (
    <Sheet onClose={onClose} title="Write a Quote">
      {/* Preview Card exactly like user image: rounded white square border */}
      <div
        style={{
          width: 170,
          minHeight: 110,
          borderRadius: 18,
          border: "2.5px solid #FFFFFF",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 14,
          boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
        }}
      >
        <p
          style={{
            margin: 0,
            textAlign: "center",
            color: text ? "#FFFFFF" : "rgba(255,255,255,0.3)",
            fontSize: 12,
            lineHeight: 1.45,
            fontWeight: 600,
            wordBreak: "break-word",
          }}
        >
          {text || "Your text here…"}
        </p>
      </div>

      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={160}
        placeholder="Write quote or heading (e.g. njnkdvhbbdv dbchsdcnsjd)..."
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          color: "#fff",
          padding: "12px 14px",
          fontSize: 13,
          lineHeight: 1.5,
          resize: "none",
          outline: "none",
          fontFamily: "inherit",
          caretColor: PINK,
        }}
        rows={3}
      />

      <div style={{ width: "100%" }}>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value.slice(0, 60))}
          placeholder="Caption for wheel (optional, max 60 chars)…"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 12,
            color: "#fff",
            padding: "8px 12px",
            fontSize: 12,
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      </div>

      <button
        onClick={handleDone}
        disabled={!text.trim()}
        style={sheetBtnStyle(text.trim() ? "primary" : "disabled")}
      >
        Add Quote Card →
      </button>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MANAGE SHEET
// ─────────────────────────────────────────────────────────────────────────────
function ManageSheet({
  group,
  onRemove,
  onClose,
  onAddNew,
}: {
  group: UploadGroup;
  onRemove: (id: string) => void;
  onClose: () => void;
  onAddNew: () => void;
}) {
  const [confirm, setConfirm] = useState<string | null>(null);
  const isFull = group.uploads.length >= MAX_UPLOADS;

  return (
    <Sheet onClose={onClose} title="Your Uploads">
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {group.uploads.map((u) => (
          <div
            key={u.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              borderRadius: 16,
              background: confirm === u.id ? "rgba(255,50,50,0.12)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${confirm === u.id ? "rgba(255,80,80,0.3)" : "rgba(255,255,255,0.08)"}`,
              transition: "all 0.2s",
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: u.type === "quote" ? 8 : "50%",
                overflow: "hidden",
                background: "#1a1a1a",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {u.type === "photo" && u.photoUrl && (
                u.mediaType === "video" ? (
                  <video src={u.photoUrl} muted autoPlay loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <img src={u.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )
              )}
              {u.type === "graphic" && <span style={{ fontSize: 24 }}>{u.graphicEmoji}</span>}
              {u.type === "quote" && (
                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", padding: 4, textAlign: "center", fontStyle: "italic" }}>
                  "{u.quoteText?.slice(0, 18)}"
                </span>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: 0, textTransform: "capitalize" }}>
                {u.type === "graphic" ? `${u.graphicEmoji} Graphic` : u.mediaType === "video" ? "Video Moment" : u.type}
              </p>
            </div>

            {confirm === u.id ? (
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => {
                    onRemove(u.id);
                    setConfirm(null);
                  }}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "rgba(220,50,50,0.8)",
                    color: "#fff",
                    border: "none",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={() => setConfirm(null)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    border: "none",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirm(u.id)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "none",
                  color: "rgba(255,80,80,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}

        {!isFull && (
          <button
            onClick={onAddNew}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              border: `2px dashed rgba(255,59,167,0.35)`,
              background: "transparent",
              color: PINK,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Plus size={16} />
            Add another ({group.uploads.length}/{MAX_UPLOADS})
          </button>
        )}
      </div>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHEEL CLUSTER: Realistic overlapping layout matching user image 2 & 3
// Photo circle (left) + Graphic raw emoji (center) + Quote square (right)
// ─────────────────────────────────────────────────────────────────────────────
// ─── WHEEL CLUSTER: Half-covered overlapping layout matching image 2 ────────
// Photo square (left) + Quote black card (half covers photo) + Graphic (half covers quote)
export function UploadWheelCluster({ group, onClick }: { group: UploadGroup; onClick: () => void }) {
  const { uploads } = group;
  if (uploads.length === 0) return null;

  // Tight half-covered offsets: each item overlaps the previous one by ~50%
  const offsets = [
    { left: 0, top: "50%", zIndex: 1 },
    { left: 34, top: "50%", zIndex: 2 },
    { left: 66, top: "45%", zIndex: 3 },
  ];

  const totalWidth = uploads.length === 1 ? 64 : uploads.length === 2 ? 96 : 124;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: "relative",
        width: totalWidth,
        height: 64,
        cursor: "pointer",
      }}
    >
      {uploads.map((u, i) => {
        const pos = offsets[i] || { left: i * 30, top: "50%", zIndex: i + 1 };
        return (
          <div
            key={u.id}
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              transform: "translateY(-50%)",
              zIndex: pos.zIndex,
              filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.35))",
            }}
          >
            <WheelShape upload={u} />
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHEEL SHAPE: realistic dimensions matching image 2
// ─────────────────────────────────────────────────────────────────────────────
function WheelShape({ upload }: { upload: UserUpload }) {
  // Photo → square with slight rounded corners matching image 2 (56px)
  if (upload.type === "photo" && upload.photoUrl) {
    return (
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          overflow: "hidden",
          border: "1.5px solid rgba(0,0,0,0.15)",
          flexShrink: 0,
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
          background: "#E5E7EB",
        }}
      >
        {upload.mediaType === "video" ? (
          <video src={upload.photoUrl} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <img src={upload.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>
    );
  }

  // Graphic → raw emoji / sticker with optional motion animation, no bg
  if (upload.type === "graphic" && upload.graphicEmoji) {
    return (
      <span
        style={{
          fontSize: 44,
          lineHeight: 1,
          display: "inline-block",
          filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.25))",
        }}
        className={upload.graphicMotion ? (motionClass[upload.graphicMotion] || "") : ""}
      >
        {upload.graphicEmoji}
      </span>
    );
  }

  // Quote → rounded square with crisp black background and white text matching image 2
  if (upload.type === "quote" && upload.quoteText) {
    return (
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          border: "1.5px solid #000000",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
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
          {upload.quoteText}
        </span>
      </div>
    );
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED MODAL SHEET WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
function Sheet({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          background: "rgba(0,0,0,0.78)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100vw, 420px)",
          background: "#0c0c0c",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "26px 26px 0 0",
          padding: "18px 20px 44px",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 -24px 80px rgba(0,0,0,0.95)",
        }}
      >
        {/* Handle */}
        <div style={{ width: 34, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.18)" }} />

        {/* Header */}
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 700 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={17} />
          </button>
        </div>

        {children}
      </div>
    </>
  );
}

function sheetBtnStyle(variant: "primary" | "secondary" | "disabled"): React.CSSProperties {
  return {
    width: "100%",
    padding: "13px",
    borderRadius: 14,
    fontSize: 13,
    fontWeight: 700,
    border: "none",
    cursor: variant === "disabled" ? "not-allowed" : "pointer",
    transition: "all 0.15s ease",
    background:
      variant === "primary" ? "#fff" : variant === "secondary" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
    color: variant === "primary" ? "#000" : "rgba(255,255,255,0.7)",
    opacity: variant === "disabled" ? 0.35 : 1,
  };
}
