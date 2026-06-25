# Shayan's AI-Powered Premium Stacking Portfolio

> [!TIP]
> **Main Intro Generation (Gemini Omni)**:
> To generate the immersive introduction copy and matching visual assets:
> 1. Take a high-resolution headshot photo of yourself and convert it into a stylized 3D digital avatar (using an AI image generator or avatar creator).
> 2. Upload your stylized avatar to **Gemini Omni** along with your full professional resume details.
> 3. Prompt the model to synthesize a cohesive, futuristic bio, customized timeline details, and technical skill readouts matching your developer profile.

Welcome to the comprehensive blueprint and guide for building Shayan's premium portfolio. This document details the end-to-end journey—from initial asset creation and cinematography to the exact prompt recipes used to guide AI agents in coding this immersive, high-performance, stacking-deck portfolio.

---

### Recipe 1: The Stacking Project Deck (FeaturedProjects)
**The Prompt:**
```text
Create a FeaturedProjects section in React using GSAP ScrollTrigger.
1. The section should take up 100vh per card and stack them vertically like a physical deck of cards on scroll.
2. As a card is scrolled over by the next card, it should scale down to 0.94 and dim/blur (filter: brightness(0.5) blur(6px)) to create a depth stack.
3. Each card is split into two panels:
   - Left Panel (44%): "Magazine cover" style containing a custom project mockup. Use a radial/linear gradient background based on the project's accent color.
   - Right Panel (56%): A clean, dark-themed (#141416) card detailing Project Index, Title, Client, Year, Role, Stack Tags, and a CTA button.
4. Support the following custom mockup wrappers conditionally:
   - BrowserFrame: A tilted mockup mimicking a browser window with Chrome control buttons.
   - ContainCover: An object-fit: contain image layout with padding for composed phone graphics.
   - SaasBrowserFrame: A long landing page screenshot inside a browser window with a bottom gradient fade overlay blending into the background.
5. Focus Animation: When card 5 becomes the top/active card in the deck, gently scale its contain cover image from 1.0 to 1.04 and translate it upwards (translateY(-6px)) using an ease-out curve linked to the same scroll trigger.
6. Provide graceful error fallbacks (onError) for all images to degrade silently to plain accent backgrounds if files fail to load.
```

### Recipe 2: The Interactive 3D Keyboard Matrix (AboutSection)
**The Prompt:**
```text
Build a Technical Skills component shaped like a 3D isometric mechanical keyboard.
1. Render a 4x4 grid of keycaps representing tech stacks (Product, AI, Frontend, Backend).
2. Each Keycap should be a 3D block created in CSS:
   - Needs a Footprint footprint (shadow on Z=0), a projection line, a raised keycap body (translateZ(12px)), and 3D faces (top, front, back, left, right).
   - On hover, the keycap body should lift up (translateZ(28px)) with a spring ease-out.
3. Web Audio Haptics: When a keycap is hovered, synthesize a crisp mechanical keycap click sound using the browser's native AudioContext. Add a mute/unmute haptic switch.
4. OLED Telemetry Display: Position a dark terminal screen console above the keyboard. When a keycap is hovered, read its details and show:
   - Category name in brackets (e.g., [ AI & Automation ])
   - Platform name in a bold font-syne title
   - A short description of skills
   - If not hovered, show a default flashing telemetry console system prompt.
```

### Recipe 3: The Split Collaboration Form (ContactSection)
**The Prompt:**
```text
Build a ContactSection structured as a single visual card split into two panels:
1. Left Panel (4%): A vibrant lime-green background containing the developer's circular avatar, contact email (shayanhanif50@gmail.com), and social links.
2. Right Panel: A dark panel (#0c0c14) with a contact form.
   - Include interactive selectable service tags ("UI/UX Design", "Website", "Brand Identity", etc.). Clicking a tag highlights it in lime-green.
   - Use clean, minimal underline input fields (Your Name, E-mail, Phone, Message) that highlight when focused.
3. AJAX Backend Integration: Submit the form data asynchronously via a POST request to 'https://formsubmit.co/ajax/shayanhanif50@gmail.com'. 
4. Auto-Reset Form Flow: On a successful submission, show a motion-animated "Message Transmitted!" card. Wait 5 seconds, clear all form fields, and reset the view back to the form by fading and sliding it up.
```

---

## 🚀 Phase 4: Performance & Optimization Checklists

To maintain sub-second load times and flawless scroll performance, implement these practices:

1. **Preloading Critical Assets**: Add `<link rel="preload" href="/hero-bg.mp4" as="video">` and preload the cover image of the first project card so the initial fold feels instant.
2. **Lazy Loading Content**: Configure all project mockups and avatars with `loading="lazy"` and `decoding="async"`.
3. **Hardware Acceleration**: Set `will-change: transform` or `will-change: opacity` on elements updated by GSAP or Framer Motion to leverage GPU rendering.
4. **GSAP Cleanups**: Always wrap GSAP ScrollTrigger creation inside a `gsap.context()` inside React's `useEffect`/`useLayoutEffect` hooks to clean up triggers and avoid memory leaks.

---

## 🤖 The Master Creative Developer Prompt

Below is the complete creative brief and master prompt representing the entire design and engineering requirements of this portfolio. You can feed this directly to an AI agent (like Antigravity) to bootstrap or recreate the full system:

```text
Act as an expert creative front-end developer and designer. Build a complete, production-ready React + Vite + Tailwind CSS portfolio application with smooth Lenis scrolling, organic spring transitions (using Framer Motion), and premium interactive features.

### 🎨 Visual & Theme Design Systems
- Backgrounds: Deep Studio Dark (#09090F). 
- Highlights & Accents: Vibrant Lime Green (#C5FF3C) and Sleek Gold (#C9A84C).
- Typography: Google Fonts loaded via HTML - Syne for bold headers, Space Grotesk for monospace UI controls and metadata pills, and DM Sans for paragraph copy.
- Scrollbar: Webkit custom track in #09090F and a rounded pill thumb colored in a vertical gradient from Lime Green to Gold.
- Aesthetic Overlays: Background canvas details with rotated squares, dashed grid matrices, and subtle blurred radial glows.

---

### 🧱 Component Layout & Interaction Logic

1. Glass Nav Capsule (navbar.jsx)
- Centered floating capsule (rounded-full px-6 py-2.5 bg-[#09090F]/65 border border-white/8 backdrop-blur-xl).
- Menu links must have a vertical sliding container structure: on hover, the normal text slides up, and a bold Lime Green copy slides up from the bottom.
- Wrap the main "Let's Talk" button in a spring-physics magnetic wrapper that pulls towards the cursor.

2. Hero Presentation Section (HeroSection.jsx)
- Left Column: Hi-res headers, tags, and magnetic CTA buttons ("View Work", "Let's Talk").
- Right Column: A vertical stack of social badges. Once the intro video finishes, run a 1.6s interval that automatically highlights each social capsule in rotation (setting a Lime Green border, scale increase, text transition, and shadow glow, matching its manual mouse hover state).
- Overlapping Client Avatars: A stack of overlapping avatar circles. Highlight the text "10+ happy clients" in Lime Green.
- Autoplay Video Player: Plays a centered portrait video file. Autoplays muted. You must attach capture-phase event listeners (click, touchstart, etc.) to the page window, so that the moment the user clicks or taps anywhere on the page, the video instantly unmutes, bypassing any event propagation locks. Place a floating speaker icon button in the bottom corner to manually toggle mute status.
- Stats Bar: Mount at the bottom containing numbers counting up dynamically on load, separating items with thin vertical lines. Display rating count "5★" in Lime Green.

3. Typographic Projects Accordion (WorkSection.jsx)
- Row List Layout: Projects mapped vertically. Each row contains index number, category, giant project title, and action toggle.
- Row Hover States: Hovering a title scales and changes it to Lime Green (text-[#C5FF3C]), while dimming all other rows to 15% opacity (text-white/10).
- Collapsible Drawer Accordion: Hovering a row (desktop) or clicking a row (mobile) slides down a height-transitioned drawer displaying description details, technical tags, and magnetic actions ("View Project", "View Source").
- Cursor-Follow Preview Capsule: A floating preview card box (w-360px h-220px) that follows the mouse with spring physics (damping 24, stiffness 180).
- Cross-Fading Image Preloader: Render all project mockup images stacked absolutely inside the capsule. When the hovered index changes, fade the target mockup to opacity 1 instantly, avoiding any download/rendering flashes.
- Mobile Fallback: Disable cursor-following and render mockup images inline inside the expandable accordion cards.

4. Flanking Service Tags & SVG Process Rope (ServicesSection.jsx)
- Flanking Columns: Left and right sidebars display service tags tilted at different angles, swaying continuously with CSS keyframe float animations.
- Drop Entrance: Tags slide and drop into view using a spring transition, settling fully before CSS sway keyframes trigger.
- Chained SVG Bezier Rope: Cards are connected corner-to-corner using an SVG bezier curve path (M x1,y1 C cx1,cy1 cx2,cy2 x2,y2 paths with stroke #C5FF3C).
- Hanging Cards: 4 process steps hung along the rope coordinates. On hover, cards scale up, disable their sways, shift upwards, and turn fully Lime Green with a glowing shadow.

5. Sticky About Panel & 3D Isometric Keyboard Matrix (AboutSection.jsx)
- Sticky Column: Left column with avatar image and active location remains sticky; right column contains timelines and skills pad.
- 3D Keycaps Grid: A 4x4 key cap layout rotated in 3D perspective (rotateX(45deg) rotateZ(-30deg)).
- OLED Telemetry console: Displays digital readout panels. Hovering a keycap updates the console with corresponding category, status, and telemetry texts.
- Keycap 3D Elevate: Each keycap has 3D folding side faces. Hovering elevates it along the Z-axis (translate-z-[28px]), glows its border walls in Lime Green, and projects a dash guidance shadow on the floor. Use memoized keys and hover timeout debounces to keep render cycles lag-free.
- Synthesized Audio Click Haptics: Use the browser's native Web Audio API to programmatically generate mechanical click sounds on hover (oscillator sine wave around 1800Hz-2400Hz, high-pass filter, and fast exponential decay envelope). Add a "[ Haptics: ON/OFF ]" toggle inside the OLED console header, using a useRef to track haptic status to prevent keycap component re-renders.

6. Split Dashboard Contact Form (ContactSection.jsx)
- Layout: Split card (60% Left / 40% Right) on desktop.
- Left Panel: Lime Green gradient background displaying avatar image, email action pill, and social links.
- Right Panel: Collaboration form. Interest pills toggle style between solid Lime Green and thin outline borders on selection click. Inputs use minimalist bottom borders that expand highlight color on focus.

7. Draw-on-Scroll SVG Signature Footer (Footer.jsx)
- Centered SVG signature canvas. On scroll entrance, trigger Framer Motion's useInView to animate SVG path lengths:
  - The name "SHAYAN" cursive path writes itself over 1.8s with easeInOut.
  - The underline strike flourish writes itself immediately after (0.8s duration, delayed by 1.6s).
- Include a bottom links row with copyright metadata and smooth scroll-to-top buttons.
```

