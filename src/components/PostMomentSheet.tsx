import React, { useState, useRef } from "react";
import { X, Camera, Type, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";

// ─── Graphic options (big SVG icons the user picks from) ─────────────────────
const GRAPHICS = [
  { id: "guitar",   label: "Guitar",   emoji: "🎸", svg: "🎸" },
  { id: "cocktail", label: "Cocktail", emoji: "🍹", svg: "🍹" },
  { id: "tree",     label: "Tree",     emoji: "🌲", svg: "🌲" },
  { id: "moon",     label: "Moon",     emoji: "🌙", svg: "🌙" },
  { id: "flame",    label: "Flame",    emoji: "🔥", svg: "🔥" },
  { id: "wave",     label: "Wave",     emoji: "🌊", svg: "🌊" },
  { id: "star",     label: "Star",     emoji: "⭐", svg: "⭐" },
  { id: "diamond",  label: "Diamond",  emoji: "💎", svg: "💎" },
  { id: "camera",   label: "Lens",     emoji: "📷", svg: "📷" },
  { id: "butterfly",label: "Butterfly",emoji: "🦋", svg: "🦋" },
  { id: "crown",    label: "Crown",    emoji: "👑", svg: "👑" },
  { id: "flower",   label: "Flower",   emoji: "🌸", svg: "🌸" },
];

export interface PostedMomentBlock {
  id: string;
  photoUrl: string | null;    // base64 data URL from camera/gallery
  graphic: typeof GRAPHICS[0] | null;
  quote: string | null;
  createdAt: string;
}

interface PostMomentSheetProps {
  onClose: () => void;
  onPost: (block: PostedMomentBlock) => void;
}

type Step = "choose" | "photo" | "graphic" | "quote" | "review";

export function PostMomentSheet({ onClose, onPost }: PostMomentSheetProps) {
  const [step, setStep] = useState<Step>("choose");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedGraphic, setSelectedGraphic] = useState<typeof GRAPHICS[0] | null>(null);
  const [quote, setQuote] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // How many of the 3 slots are filled
  const filled = [photoUrl !== null, selectedGraphic !== null, quote.trim() !== ""].filter(Boolean).length;
  const allFilled = filled === 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result as string);
      setStep("choose");
    };
    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    const block: PostedMomentBlock = {
      id: `moment-${Date.now()}`,
      photoUrl,
      graphic: selectedGraphic,
      quote: quote.trim() || null,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    onPost(block);
    onClose();
  };

  // ── Step: Photo ─────────────────────────────────────────────────────────────
  if (step === "photo") {
    return (
      <SheetWrapper onClose={onClose} title="Capture a moment">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        {photoUrl ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={photoUrl}
              alt="Preview"
              className="w-full max-w-[280px] h-[280px] object-cover rounded-[24px] shadow-lg border border-white/10"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setPhotoUrl(null); fileInputRef.current?.click(); }}
                className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium hover:bg-white/15 transition-all cursor-pointer"
              >
                Retake
              </button>
              <button
                onClick={() => setStep("choose")}
                className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all cursor-pointer"
              >
                Use Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <div className="w-48 h-48 rounded-[28px] border-2 border-dashed border-white/20 flex items-center justify-center">
              <Camera className="w-12 h-12 text-white/30" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.accept = "image/*";
                    fileInputRef.current.removeAttribute("capture");
                    fileInputRef.current.click();
                  }
                }}
                className="w-52 px-5 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Open Camera
              </button>
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.accept = "image/*";
                    fileInputRef.current.removeAttribute("capture");
                    fileInputRef.current.click();
                  }
                }}
                className="w-52 px-5 py-3 rounded-full bg-white/10 text-white/80 text-sm font-medium hover:bg-white/15 transition-all cursor-pointer"
              >
                Choose from Gallery
              </button>
            </div>
          </div>
        )}
      </SheetWrapper>
    );
  }

  // ── Step: Graphic ────────────────────────────────────────────────────────────
  if (step === "graphic") {
    return (
      <SheetWrapper onClose={onClose} title="Pick a graphic">
        <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
          {GRAPHICS.map((g) => (
            <button
              key={g.id}
              onClick={() => { setSelectedGraphic(g); setStep("choose"); }}
              className={`aspect-square rounded-[18px] flex items-center justify-center text-4xl transition-all cursor-pointer border-2 hover:scale-105 active:scale-95 ${
                selectedGraphic?.id === g.id
                  ? "border-white bg-white/15 scale-105 shadow-lg"
                  : "border-transparent bg-white/8 hover:bg-white/12 hover:border-white/30"
              }`}
              title={g.label}
            >
              {g.emoji}
            </button>
          ))}
        </div>
        {selectedGraphic && (
          <button
            onClick={() => setStep("choose")}
            className="mt-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all cursor-pointer"
          >
            Use {selectedGraphic.label}
          </button>
        )}
      </SheetWrapper>
    );
  }

  // ── Step: Quote ──────────────────────────────────────────────────────────────
  if (step === "quote") {
    return (
      <SheetWrapper onClose={onClose} title="Write something">
        <div className="w-full max-w-[300px] flex flex-col gap-4">
          {/* Blank page preview */}
          <div className="w-full aspect-[3/4] rounded-[24px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/8 flex items-center justify-center p-6 shadow-xl">
            {quote.trim() ? (
              <p className="text-white text-center font-serif text-lg italic leading-relaxed">
                "{quote}"
              </p>
            ) : (
              <p className="text-white/25 text-center text-sm">
                Your words appear here…
              </p>
            )}
          </div>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            maxLength={140}
            placeholder="Write a quote, thought, or caption…"
            className="w-full bg-white/8 text-white placeholder:text-white/35 rounded-[16px] p-4 text-sm font-medium leading-relaxed resize-none border border-white/10 focus:outline-none focus:border-white/30 transition-colors"
            rows={3}
            autoFocus
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">{quote.length}/140</span>
            <button
              disabled={!quote.trim()}
              onClick={() => setStep("choose")}
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </SheetWrapper>
    );
  }

  // ── Main "choose" hub ────────────────────────────────────────────────────────
  return (
    <SheetWrapper onClose={onClose} title="New Moment">
      <div className="w-full max-w-sm flex flex-col gap-3">
        
        {/* Option 1: Photo */}
        <UploadOption
          icon={<Camera className="w-6 h-6" />}
          label="Photo"
          sublabel={photoUrl ? "✓ Photo added" : "Camera or gallery"}
          done={!!photoUrl}
          preview={photoUrl ? (
            <img src={photoUrl} alt="preview" className="w-10 h-10 rounded-xl object-cover" />
          ) : undefined}
          onClick={() => setStep("photo")}
        />

        {/* Option 2: Graphic */}
        <UploadOption
          icon={<Sparkles className="w-6 h-6" />}
          label="Graphic"
          sublabel={selectedGraphic ? `✓ ${selectedGraphic.label} selected` : "Pick an icon or symbol"}
          done={!!selectedGraphic}
          preview={selectedGraphic ? (
            <span className="text-3xl">{selectedGraphic.emoji}</span>
          ) : undefined}
          onClick={() => setStep("graphic")}
        />

        {/* Option 3: Quote */}
        <UploadOption
          icon={<Type className="w-6 h-6" />}
          label="Quote"
          sublabel={quote.trim() ? `✓ "${quote.slice(0, 28)}${quote.length > 28 ? "…" : ""}"` : "Words on a blank page"}
          done={!!quote.trim()}
          onClick={() => setStep("quote")}
        />

        {/* Progress indicator */}
        <div className="flex items-center gap-2 pt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                i < filled ? "bg-white" : "bg-white/15"
              }`}
            />
          ))}
        </div>
        <p className="text-white/45 text-xs text-center">
          {filled === 0 && "Add all 3 to post your moment block"}
          {filled === 1 && "2 more to go"}
          {filled === 2 && "One more — almost there!"}
          {filled === 3 && "Ready to post!"}
        </p>

        {/* Post Button */}
        <button
          disabled={!allFilled}
          onClick={handlePost}
          className={`w-full mt-1 py-4 rounded-[20px] text-sm font-bold tracking-wide transition-all duration-300 ${
            allFilled
              ? "bg-white text-black hover:bg-white/90 active:scale-[0.98] shadow-lg shadow-white/10 cursor-pointer"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {allFilled ? "Post Moment Block →" : `${filled} / 3 complete`}
        </button>
      </div>
    </SheetWrapper>
  );
}

// ─── Reusable row option ────────────────────────────────────────────────────
function UploadOption({
  icon, label, sublabel, done, preview, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  done: boolean;
  preview?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-4 rounded-[20px] border transition-all cursor-pointer text-left active:scale-[0.98] ${
        done
          ? "bg-white/10 border-white/25 hover:bg-white/12"
          : "bg-white/6 border-white/8 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 ${
        done ? "bg-white/15" : "bg-white/8"
      }`}>
        {preview || <span className={done ? "text-white" : "text-white/60"}>{icon}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${done ? "text-white" : "text-white/90"}`}>{label}</p>
        <p className={`text-xs mt-0.5 truncate ${done ? "text-emerald-400" : "text-white/45"}`}>{sublabel}</p>
      </div>
      {done ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      ) : (
        <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0" />
      )}
    </button>
  );
}

// ─── Generic Sheet Wrapper ────────────────────────────────────────────────────
function SheetWrapper({
  onClose, title, children,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Sheet panel */}
      <div className="relative w-full max-w-[420px] bg-[#111] border-t border-white/10 rounded-t-[32px] p-6 pb-10 flex flex-col items-center gap-5 animate-in slide-in-from-bottom duration-300 shadow-2xl shadow-black">
        {/* Handle bar */}
        <div className="w-10 h-1 rounded-full bg-white/20 mb-1" />

        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white font-bold text-xl tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/18 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
