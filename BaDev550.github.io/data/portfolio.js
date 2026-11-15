/*
  ============================================================
  EDIT THIS FILE to update the whole site.
  - Leave a link's url as "" and the button is hidden automatically.
  - kind: "engine" | "game" | "web"
  ============================================================
*/
window.PORTFOLIO = {
  handle: "BaDev",
  studio: "Too Type Games",
  location: "Istanbul, Turkey",
  github: "https://github.com/BaDev550",
  // Add these when you want them to show up in the contact section:
  steam: "",
  itch: "",
  email: "",

  projects: [
    {
      id: "tourqe",
      title: "Tourqe Engine",
      kind: "engine",
      status: "In development",
      year: "2026",
      featured: true,
      blurb:
        "A custom C++ game engine with a UE-style world context, but no full editor. Only a level editor; everything else lives in the IDE.",
      points: [
        "Cache-friendly ECS with generational entity handles",
        "Python reflection generator (TCLASS / TPROP)",
        "Render graph built from TCLASS render passes",
      ],
      tags: ["C++", "ECS", "Reflection", "Render graph", "RHI"],
      links: [{ label: "Source", url: "" }],
    },
    {
      id: "corpducking",
      title: "CorpDucking",
      kind: "game",
      status: "In development",
      year: "2026",
      blurb:
        "Multiplayer project in Unreal Engine 5.7 for Too Type Games. Steam Sockets networking, CommonUI input routing and persistent developer settings.",
      points: [
        "Steam Sockets listen-server networking",
        "CommonUI multi-stack input routing",
        "Config layering through DefaultGame.ini",
      ],
      tags: ["UE 5.7", "C++", "Steam Sockets", "CommonUI"],
      links: [{ label: "Steam", url: "" }, { label: "itch.io", url: "" }],
    },
    {
      id: "coop-sim",
      title: "Co-op Business Sim",
      kind: "game",
      status: "Design",
      year: "2026",
      blurb:
        "A co-op sandbox simulation about turning dirty money into a legitimate business. Non-round-based, built in Unreal Engine 5.",
      points: [
        "Core loop: dirty money to a legitimate business",
        "Sandbox structure with no rounds",
        "Chosen from 30 concepts",
      ],
      tags: ["UE5", "Co-op", "Simulation", "Game design"],
      links: [],
    },
    {
      id: "boomer-shooter",
      title: "PS1-style Boomer Shooter",
      kind: "game",
      status: "Concept",
      year: "",
      blurb:
        "A low-poly roguelike boomer shooter with ULTRAKILL-inspired movement and combat, built around limb swapping.",
      points: [
        "PS1-era low-poly look",
        "Roguelike runs, fast shooter pacing",
        "Limb-swapping mechanic",
      ],
      tags: ["Roguelike", "FPS", "Low-poly", "Game design"],
      links: [],
    },
    {
      id: "vulkan",
      title: "Vulkan Renderer",
      kind: "engine",
      status: "Experiments",
      year: "",
      blurb:
        "A low-level Vulkan renderer in C++ with multiple frames in flight, synchronised with timeline semaphores.",
      points: [
        "Multi-frame-in-flight frame slots",
        "Timeline semaphore signal/wait values",
        "Debugged viewport depth-range and sync issues",
      ],
      tags: ["Vulkan", "C++", "Graphics"],
      links: [{ label: "Source", url: "" }],
    },
    {
      id: "toottype-web",
      title: "Too Type Games Platform",
      kind: "web",
      status: "In development",
      year: "2026",
      blurb:
        "The studio's companion web platform, built on Next.js and Payload CMS 3.0.",
      points: [
        "Payload CMS 3.0 with Tailwind v4",
        "Cloudflare R2 storage and Turnstile",
        "Nodemailer for email",
      ],
      tags: ["Next.js", "Payload CMS", "Tailwind", "Cloudflare"],
      links: [],
    },
  ],

  skills: [
    { group: "Engine & graphics", items: ["C++", "Vulkan", "RHI design", "Render graphs", "ECS", "Reflection codegen"] },
    { group: "Unreal Engine", items: ["UE5 C++", "Blueprints", "Replication", "CommonUI", "Steam Sockets", "Physics handles"] },
    { group: "Tools & web", items: ["CMake", "vcpkg", "Python", "Neovim + clangd", "Next.js", "Payload CMS"] },
  ],
};
