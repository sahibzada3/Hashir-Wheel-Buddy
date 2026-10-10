import walkingDetail from "@/assets/walking-detail.jpg";
import portraitProfile from "@/assets/portrait-profile.jpg";
import redSunglasses from "@/assets/red-sunglasses.jpg";
import avatar0 from "@/assets/avatars/avatar0.jpg";
import avatar1 from "@/assets/avatars/avatar1.jpg";
import avatar2 from "@/assets/avatars/avatar2.jpg";
import avatar3 from "@/assets/avatars/avatar3.jpg";
import avatar4 from "@/assets/avatars/avatar4.jpg";
import avatar5 from "@/assets/avatars/avatar5.jpg";
import avatar6 from "@/assets/avatars/avatar6.jpg";
import avatar7 from "@/assets/avatars/avatar7.jpg";
import avatar8 from "@/assets/avatars/avatar8.jpg";
import avatar9 from "@/assets/avatars/avatar9.jpg";
import avatar10 from "@/assets/avatars/avatar10.jpg";
import avatar11 from "@/assets/avatars/avatar11.jpg";
import { type UserMoments } from "@/components/MomentViewer";

export const usersList = [
  { name: "AYESHA", img: avatar0 },
  { name: "BILAL", img: avatar1 },
  { name: "ZARA", img: avatar2 },
  { name: "HAMZA", img: avatar3 },
  { name: "SARA", img: avatar4 },
  { name: "OMAR", img: avatar5 },
  { name: "FATIMA", img: avatar6 },
  { name: "ALI", img: avatar7 },
  { name: "HINA", img: avatar8 },
  { name: "DANISH", img: avatar9 },
  { name: "NOOR", img: avatar10 },
  { name: "ADEEL", img: avatar11 },
];

export const userMomentsData: Record<number, UserMoments> = {
  0: {
    userIndex: 0,
    name: "Ayesha",
    avatar: avatar0,
    handle: "@ayesha",
    moments: [
      {
        id: "ayesha-1",
        title: "Morning coffee & sketches",
        description: "Drafting concepts at the corner cafe. Loving this quiet start to the day.",
        time: "9:15 AM",
        location: "Roastery",
        gradient: "bg-gradient-to-br from-[#2c1d11] via-[#432c1c] to-[#1a110a]",
        likes: 34,
      },
      {
        id: "ayesha-2",
        title: "Golden hour downtown",
        description: "Catching the sunset light across the rooftops before heading home.",
        time: "6:45 PM",
        location: "Skyline Overlook",
        gradient: "bg-gradient-to-br from-[#3b1d28] via-[#52293b] to-[#1c1218]",
        likes: 58,
      },
      {
        id: "ayesha-3",
        title: "Weekend botanical walk",
        description: "Fresh air and quiet trails outside the city.",
        time: "Yesterday",
        location: "Conservatory",
        gradient: "bg-gradient-to-br from-[#122822] via-[#1c3a32] to-[#0c1815]",
        likes: 42,
      },
    ],
  },
  1: {
    userIndex: 1,
    name: "Bilal",
    avatar: avatar1,
    handle: "@bilal",
    moments: [
      {
        id: "bilal-1",
        title: "Waterfront cycling route",
        description: "Pushed for 20km along the coast trail today. Clear skies the entire way.",
        time: "5:20 PM",
        location: "Coastline Trail",
        gradient: "bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a]",
        likes: 89,
      },
      {
        id: "bilal-2",
        title: "Night street photography",
        description: "Chasing ambient street lights and quiet alleyways in the historic district.",
        time: "8:30 PM",
        location: "Old Quarter",
        gradient: "bg-gradient-to-br from-[#1a1c24] via-[#242838] to-[#10121a]",
        likes: 67,
      },
    ],
  },
  2: {
    userIndex: 2,
    name: "Zara",
    avatar: avatar2,
    handle: "@zara",
    moments: [
      {
        id: "zara-1",
        title: "Ceramic studio showcase",
        description: "Finished shaping this new handmade cup collection. Ready for the kiln firing.",
        time: "3:40 PM",
        location: "Clay Studio",
        gradient: "bg-gradient-to-br from-[#381a20] via-[#522530] to-[#1c0d10]",
        likes: 112,
      },
      {
        id: "zara-2",
        title: "Rainy evening acoustic records",
        description: "Nothing beats warm vinyl sounds while rain taps against the window.",
        time: "7:15 PM",
        location: "Living Room",
        gradient: "bg-gradient-to-br from-[#241f1c] via-[#3d332e] to-[#14110f]",
        likes: 76,
      },
      {
        id: "zara-3",
        title: "Matcha break between calls",
        description: "Midday reset with iced oat matcha before the next design review.",
        time: "1:10 PM",
        location: "Green Cafe",
        gradient: "bg-gradient-to-br from-[#13261a] via-[#1f3d2a] to-[#0b1710]",
        likes: 95,
      },
    ],
  },
  3: {
    userIndex: 3,
    name: "Hamza",
    avatar: avatar3,
    handle: "@hamza",
    moments: [
      {
        id: "hamza-1",
        title: "Urban motion in the city",
        description: "Testing out running strides across the bridge. Fast-paced city rhythm.",
        time: "4:15 PM",
        location: "Harbor Bridge",
        gradient: "bg-gradient-to-br from-[#262626] via-[#404040] to-[#171717]",
        image: walkingDetail,
        likes: 140,
      },
      {
        id: "hamza-2",
        title: "Editorial lighting test",
        description: "Dialing in the soft diffusion and portrait backlights for tomorrow's shoot.",
        time: "11:30 AM",
        location: "Studio B",
        gradient: "bg-gradient-to-br from-[#192231] via-[#24334a] to-[#0f141d]",
        image: portraitProfile,
        likes: 85,
      },
    ],
  },
  4: {
    userIndex: 4,
    name: "Sara",
    avatar: avatar4,
    handle: "@sara",
    moments: [
      {
        id: "sara-1",
        title: "Brand identity preview",
        description: "Wave forms and modern typographic systems for our upcoming collection.",
        time: "2:45 PM",
        location: "Design Studio",
        gradient: "bg-gradient-to-br from-[#3b1517] via-[#572023] to-[#1f0b0c]",
        likes: 93,
      },
      {
        id: "sara-2",
        title: "Weekend sourdough bake",
        description: "24-hour slow fermentation with an airy crumb and blistered golden crust.",
        time: "10:15 AM",
        location: "Home",
        gradient: "bg-gradient-to-br from-[#362512] via-[#4f361a] to-[#1c1309]",
        likes: 124,
      },
    ],
  },
  5: {
    userIndex: 5,
    name: "Omar",
    avatar: avatar5,
    handle: "@omar",
    moments: [
      {
        id: "omar-1",
        title: "Project documentation",
        description: "Organizing client assets and style guides for the quarterly product rollout.",
        time: "1:20 PM",
        location: "Office",
        gradient: "bg-gradient-to-br from-[#12283b] via-[#1d3c59] to-[#0c1824]",
        likes: 64,
      },
      {
        id: "omar-2",
        title: "Midnight drive across the bay",
        description: "Empty highway lanes, open windows, and ambient electronic music.",
        time: "11:45 PM",
        location: "Coastal Highway",
        gradient: "bg-gradient-to-br from-[#1c142c] via-[#2d2047] to-[#100b1a]",
        likes: 110,
      },
    ],
  },
  6: {
    userIndex: 6,
    name: "Fatima",
    avatar: avatar6,
    handle: "@fatima",
    moments: [
      {
        id: "fatima-1",
        title: "Morning tea & reflection",
        description: "Quiet morning with jasmine tea and fresh sunlight in the patio garden.",
        time: "8:10 AM",
        location: "Garden Patio",
        gradient: "bg-gradient-to-br from-[#1e2229] via-[#303642] to-[#121418]",
        likes: 72,
      },
      {
        id: "fatima-2",
        title: "Weekend market haul",
        description: "Wildflowers, fresh rosemary, and local seasonal fruit.",
        time: "12:00 PM",
        location: "Farmers Market",
        gradient: "bg-gradient-to-br from-[#1b2b20] via-[#283f30] to-[#0f1712]",
        likes: 88,
      },
    ],
  },
  7: {
    userIndex: 7,
    name: "Ali",
    avatar: avatar7,
    handle: "@ali",
    moments: [
      {
        id: "ali-1",
        title: "Summer sunset along the pier",
        description: "Warm gradient across the ocean horizon as the tide comes in.",
        time: "7:00 PM",
        location: "Pier Walk",
        gradient: "bg-gradient-to-br from-[#3b2314] via-[#57341e] to-[#1f120a]",
        likes: 135,
      },
    ],
  },
  8: {
    userIndex: 8,
    name: "Hina",
    avatar: avatar8,
    handle: "@hina",
    moments: [
      {
        id: "hina-1",
        title: "Evening gym session",
        description: "High energy workout followed by a quick walk under the city lights.",
        time: "6:10 PM",
        location: "Fitness Center",
        gradient: "bg-gradient-to-br from-[#2a1738] via-[#3f2354] to-[#160c1e]",
        likes: 91,
      },
    ],
  },
  9: {
    userIndex: 9,
    name: "Danish",
    avatar: avatar9,
    handle: "@danish",
    moments: [
      {
        id: "danish-1",
        title: "Spontaneous valley road trip",
        description: "Unplanned weekend escape into the hills with good friends.",
        time: "4:50 PM",
        location: "Mountain Route",
        gradient: "bg-gradient-to-br from-[#3b171c] via-[#572229] to-[#1f0c0f]",
        likes: 156,
      },
    ],
  },
  10: {
    userIndex: 10,
    name: "Noor",
    avatar: avatar10,
    handle: "@noor",
    moments: [
      {
        id: "noor-1",
        title: "Fashion district editorial",
        description: "Clean monochrome styling and afternoon shadows on concrete.",
        time: "3:30 PM",
        location: "Arts District",
        gradient: "bg-gradient-to-br from-[#1f1f22] via-[#333338] to-[#121214]",
        image: redSunglasses,
        likes: 178,
      },
    ],
  },
  11: {
    userIndex: 11,
    name: "Adeel",
    avatar: avatar11,
    handle: "@adeel",
    moments: [
      {
        id: "adeel-1",
        title: "Typography & print experiments",
        description: "Modular font layouts and minimal grid compositions on uncoated paper.",
        time: "2:00 PM",
        location: "Print Lab",
        gradient: "bg-gradient-to-br from-[#242426] via-[#38383c] to-[#141416]",
        likes: 82,
      },
    ],
  },
};
