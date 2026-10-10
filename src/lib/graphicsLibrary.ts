// ── Sticker Library ───────────────────────────────────────────────────────────
// 50+ high-quality stickers with categories, names and optional motion animations.
// Motion types: "spin" | "pulse" | "float" | "bounce" | "shake"

export interface Sticker {
  id: string;
  emoji: string;
  name: string;
  category: string;
  motion?: "spin" | "pulse" | "float" | "bounce" | "shake";
}

export const STICKER_CATEGORIES = [
  "All",
  "Music",
  "Nature",
  "Sports",
  "Food",
  "Fashion",
  "Tech",
  "Symbols",
  "Travel",
  "Art",
];

export const ALL_STICKERS: Sticker[] = [
  // ── Music ──
  { id: "guitar",      emoji: "🎸",  name: "Guitar",          category: "Music" },
  { id: "violin",      emoji: "🎻",  name: "Violin",          category: "Music", motion: "float" },
  { id: "headphones",  emoji: "🎧",  name: "Headphones",      category: "Music", motion: "pulse" },
  { id: "mic",         emoji: "🎤",  name: "Microphone",      category: "Music" },
  { id: "trumpet",     emoji: "🎺",  name: "Trumpet",         category: "Music" },
  { id: "piano",       emoji: "🎹",  name: "Piano",           category: "Music" },
  { id: "drum",        emoji: "🥁",  name: "Drums",           category: "Music", motion: "shake" },
  { id: "notes",       emoji: "🎵",  name: "Music Note",      category: "Music", motion: "float" },
  { id: "saxophone",   emoji: "🎷",  name: "Saxophone",       category: "Music" },
  { id: "vinyl",       emoji: "💿",  name: "Vinyl",           category: "Music", motion: "spin" },

  // ── Nature ──
  { id: "sun",         emoji: "☀️",  name: "Sun",             category: "Nature", motion: "spin" },
  { id: "moon",        emoji: "🌙",  name: "Moon",            category: "Nature", motion: "float" },
  { id: "star",        emoji: "⭐",  name: "Star",            category: "Nature", motion: "pulse" },
  { id: "fire",        emoji: "🔥",  name: "Fire",            category: "Nature", motion: "shake" },
  { id: "wave",        emoji: "🌊",  name: "Wave",            category: "Nature" },
  { id: "lightning",   emoji: "⚡",  name: "Lightning",       category: "Nature" },
  { id: "snowflake",   emoji: "❄️",  name: "Snowflake",       category: "Nature", motion: "spin" },
  { id: "rainbow",     emoji: "🌈",  name: "Rainbow",         category: "Nature" },
  { id: "leaf",        emoji: "🍃",  name: "Leaf",            category: "Nature", motion: "float" },
  { id: "flower",      emoji: "🌸",  name: "Cherry Blossom",  category: "Nature", motion: "float" },
  { id: "rose",        emoji: "🌹",  name: "Rose",            category: "Nature" },
  { id: "butterfly",   emoji: "🦋",  name: "Butterfly",       category: "Nature", motion: "float" },
  { id: "mushroom",    emoji: "🍄",  name: "Mushroom",        category: "Nature" },

  // ── Sports ──
  { id: "basketball",  emoji: "🏀",  name: "Basketball",      category: "Sports", motion: "bounce" },
  { id: "soccer",      emoji: "⚽",  name: "Soccer Ball",     category: "Sports", motion: "spin" },
  { id: "trophy",      emoji: "🏆",  name: "Trophy",          category: "Sports", motion: "pulse" },
  { id: "medal",       emoji: "🥇",  name: "Gold Medal",      category: "Sports" },
  { id: "target",      emoji: "🎯",  name: "Target",          category: "Sports" },
  { id: "boxing",      emoji: "🥊",  name: "Boxing Glove",    category: "Sports" },
  { id: "skateboard",  emoji: "🛹",  name: "Skateboard",      category: "Sports" },
  { id: "skiing",      emoji: "⛷️",  name: "Skiing",          category: "Sports" },

  // ── Food & Drink ──
  { id: "cocktail",    emoji: "🍹",  name: "Cocktail",        category: "Food" },
  { id: "coffee",      emoji: "☕",  name: "Coffee",          category: "Food", motion: "float" },
  { id: "pizza",       emoji: "🍕",  name: "Pizza",           category: "Food" },
  { id: "wine",        emoji: "🍷",  name: "Wine Glass",      category: "Food" },
  { id: "cake",        emoji: "🎂",  name: "Birthday Cake",   category: "Food", motion: "pulse" },
  { id: "icecream",    emoji: "🍦",  name: "Ice Cream",       category: "Food", motion: "float" },
  { id: "burger",      emoji: "🍔",  name: "Burger",          category: "Food" },
  { id: "ramen",       emoji: "🍜",  name: "Ramen",           category: "Food" },

  // ── Fashion ──
  { id: "crown",       emoji: "👑",  name: "Crown",           category: "Fashion", motion: "pulse" },
  { id: "diamond",     emoji: "💎",  name: "Diamond",         category: "Fashion", motion: "float" },
  { id: "sunglasses",  emoji: "🕶️",  name: "Sunglasses",      category: "Fashion" },
  { id: "lipstick",    emoji: "💄",  name: "Lipstick",        category: "Fashion" },
  { id: "ring",        emoji: "💍",  name: "Ring",            category: "Fashion", motion: "pulse" },
  { id: "handbag",     emoji: "👜",  name: "Handbag",         category: "Fashion" },
  { id: "sneaker",     emoji: "👟",  name: "Sneaker",         category: "Fashion" },
  { id: "cap",         emoji: "🧢",  name: "Cap",             category: "Fashion" },

  // ── Tech & Gadgets ──
  { id: "rocket",      emoji: "🚀",  name: "Rocket",          category: "Tech", motion: "float" },
  { id: "camera",      emoji: "📷",  name: "Camera",          category: "Tech" },
  { id: "gaming",      emoji: "🎮",  name: "Gaming",          category: "Tech" },
  { id: "phone",       emoji: "📱",  name: "Smartphone",      category: "Tech" },
  { id: "laptop",      emoji: "💻",  name: "Laptop",          category: "Tech" },
  { id: "robot",       emoji: "🤖",  name: "Robot",           category: "Tech", motion: "shake" },
  { id: "ufo",         emoji: "🛸",  name: "UFO",             category: "Tech", motion: "float" },

  // ── Travel ──
  { id: "plane",       emoji: "✈️",  name: "Airplane",        category: "Travel", motion: "float" },
  { id: "car",         emoji: "🚗",  name: "Sports Car",      category: "Travel" },
  { id: "globe",       emoji: "🌍",  name: "Globe",           category: "Travel", motion: "spin" },
  { id: "mountain",    emoji: "⛰️",  name: "Mountain",        category: "Travel" },
  { id: "beach",       emoji: "🏖️",  name: "Beach",           category: "Travel" },
  { id: "tent",        emoji: "⛺",  name: "Camping",         category: "Travel" },
  { id: "yacht",       emoji: "⛵",  name: "Sailing",         category: "Travel", motion: "float" },

  // ── Symbols & Art ──
  { id: "heart",       emoji: "❤️",  name: "Heart",           category: "Symbols", motion: "pulse" },
  { id: "peace",       emoji: "✌️",  name: "Peace",           category: "Symbols" },
  { id: "infinity",    emoji: "♾️",  name: "Infinity",        category: "Symbols", motion: "spin" },
  { id: "yin-yang",    emoji: "☯️",  name: "Yin Yang",        category: "Symbols", motion: "spin" },
  { id: "art",         emoji: "🎨",  name: "Art Palette",     category: "Art" },
  { id: "magic",       emoji: "✨",  name: "Sparkles",        category: "Symbols", motion: "pulse" },
  { id: "dice",        emoji: "🎲",  name: "Dice",            category: "Symbols", motion: "bounce" },
  { id: "clover",      emoji: "🍀",  name: "Lucky Clover",    category: "Symbols" },
  { id: "unicorn",     emoji: "🦄",  name: "Unicorn",         category: "Art" },
  { id: "dragon",      emoji: "🐉",  name: "Dragon",          category: "Art" },
];

// ── Animation CSS class map ───────────────────────────────────────────────────
export const motionClass: Record<string, string> = {
  spin:   "sticker-spin",
  pulse:  "sticker-pulse",
  float:  "sticker-float",
  bounce: "sticker-bounce",
  shake:  "sticker-shake",
};

export function searchStickers(query: string, category: string): Sticker[] {
  const q = query.toLowerCase();
  return ALL_STICKERS.filter((s) => {
    const matchCat = category === "All" || s.category === category;
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
}
