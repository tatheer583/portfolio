# Muhammad Tatheer — portfolio

A virtual studio tour built with Next.js, React Three Fiber, and Three.js. Choose an automatic or manual tour, enter through a short 3–2–1 countdown, and explore the storefront, connected corridor, and four named rooms. The project studio has a first-person seated office viewpoint, project artwork, clickable screens, a paired live-code relay with counter-scrolling terminals, drifting studio motes, and animated concept models. Walls and room interiors use pale yellow; doors use light gray, with oval plaques and pencil details.

The existing biography, 11 projects, 57 skills, experience, education, achievements, contact details, and résumé remain sourced from the original portfolio.

## Run locally

Use this Next.js project folder, rather than opening the legacy root `index.html`.

```powershell
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```powershell
npm run build
npm run start
```

## Checks

```powershell
npm run lint
npm run type-check
npm run build
```

## Editing the portfolio

- `components/corridor/CorridorScene.tsx`: the 3D corridor, doors, furniture, and camera transitions.
- `components/corridor/PortfolioExperience.tsx`: countdown, automatic tour timeline, playback and mode controls, room navigation, fullscreen, and dialog behavior.
- `components/corridor/ManualCameraControls.tsx`: free camera movement, mouse/touch controls, and collision checks.
- `components/corridor/StudioNavigationMap.tsx`: direct destination points and room labels.
- `components/corridor/RoomExhibits.tsx`: animated project artwork, skill constellation, timeline sculptures, and contact station.
- `components/corridor/NewProjectModel.tsx`: concept models inspired by the actual projects; these illustrate each project rather than claiming to be original CAD assets.
- `components/corridor/ProjectDetails.tsx`: in-studio project information and original case study, GitHub, and demo links.
- `components/corridor/HandTrackingControls.tsx` and `lib/hand-navigation.ts`: optional webcam controls and gesture interpretation.
- `components/corridor/RoomContent.tsx`: project gallery, biography and skills, journey, and contact form.
- `app/globals.css`, `app/tour.css`, `app/studio.css`, and `app/studio-navigation.css`: warm palette, typography, responsive tour controls, exhibit labels, and accessibility states.
- `data/`: existing projects, skills, experience, education, and achievements.
- `lib/constants.ts`: existing personal details, social links, profile image, and résumé route.
- `app/projects/`: existing standalone project pages and case studies.

AUTO TOUR starts on the sidewalk in front of the studio, approaches the entrance in a smooth straight line, opens the entrance door near the visitor, and walks inside. It then opens each room door on approach, visits the rooms in sequence, closes doors after departure, and showcases all 11 existing projects automatically. Pause/resume, skip a stop, change speed (0.5×–2×), replay, switch modes, or return to the entrance at any time. Opening a detail panel suspends the camera and tour timer until it closes.

MANUAL TOUR supports cursor hover or click-and-drag/touch camera rotation, W/S or up/down for movement, A/D for strafing, Q/E for turning, left/right for smooth 90° facing, and wheel zoom. Move the cursor up/down to tilt the view; horizontal drag rotation allows full 360° turns across repeated gestures, while vertical tilt stops short of flipping the view. Returning to Entrance restores the original camera view. Click a door to open it, then walk through. The on-screen direction pad works on touch devices; its side arrows smoothly face left or right for room entry, while named room shortcuts provide an accessible alternative. After a movement button is clicked, keyboard focus returns to the scene so W/A/S/D works immediately. In the project studio, use Take a seat, cycle exhibits, click the project screen, or open the complete collection. Escape closes an open map or detail panel; otherwise it returns to the entrance.

Studio map offers six destination points for direct arrival without a walkthrough. Glowing floor points provide the same shortcut to nearby rooms. Mouse movement turns the view; holding the cursor near the left or right edge keeps turning. Auto walk moves forward in the direction you are looking and stops at obstacles or when manual controls take over. The entrance stays open until you have cleared its threshold and reopens when walking back out from inside. These controls also work with scene motion paused.

Countdown sound is optional and off by default. Peaceful music is also opt-in: the visitor can start or stop the quiet locally generated ambient layer from the entry panel or footer controls. Scene motion can be disabled independently of tour playback. Device reduced-motion preferences use immediate camera transitions while retaining all content and controls.

Hand controls are optional and available in manual mode. Clicking Hand controls opens instructions; only Start camera requests permission. A hand steers the view and a held thumb/index pinch moves forward. Releasing the pinch, losing the hand, closing the panel, opening details, changing modes, or hiding the tab stops movement. Closing/hiding also stops the webcam. Video frames are processed locally and never uploaded. MediaPipe code and local model/WASM assets load only after explicit camera startup; the first startup downloads approximately 20 MB. Physical webcam tracking depends on your device and browser and has not been verified with a real webcam in this development session.

Room links use `/#projects`, `/#about`, `/#journey`, and `/#contact`. Older section hashes also open their corresponding room. Devices without WebGL can use the same room navigation with a drawn SVG corridor. Irssa PSL and mechanical/CAD project records were not present in the supplied codebase; add genuine records/assets in `data/projects.ts` to include them in the tour. Existing decorative mechanical models are labeled as concepts.

## Contact delivery and deployment settings

Copy `.env.example` to `.env.local` and supply `RESEND_API_KEY` and `CONTACT_EMAIL` for contact-form email delivery. The current sender is `Portfolio <onboarding@resend.dev>`; configure a verified sender in `lib/resend.ts` when required by your Resend account. Without a configured provider, the form explains that delivery failed and offers the existing direct email link.

Set `NEXT_PUBLIC_SITE_URL` to the final public domain before deploying, so canonical links and the generated sitemap use the correct address. The downloadable résumé remains at `/resume`, which redirects to the existing PDF.

Pushing to `main` also runs `.github/workflows/deploy-pages.yml`. It creates a static GitHub Pages artifact at `https://tatheer583.github.io/portfolio/`, prefixes the project-site asset paths, and keeps the server-only API routes out of that artifact. For full contact-form email delivery and live GitHub statistics, deploy the unchanged server build to a Next.js host such as Vercel; the Pages build keeps the direct WhatsApp and email links available.

