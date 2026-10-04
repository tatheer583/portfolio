/**
 * Texture Preload List - ALL textures for the entire experience
 * Everything loads during the initial preloader for zero stutter when entering rooms.
 */

import { GALLERY_PROJECTS } from '../portfolioContent';

// Entrance scene textures
export const ENTRANCE_TEXTURES = [
    // Core
    '/reference/textures/paper-texture.webp',
    // Doors
    '/reference/textures/doors/frame_sketch.webp',
    '/reference/textures/doors/door_left_sketch.webp',
    '/reference/textures/doors/door_right_sketch.webp',
    '/reference/textures/doors/handle_left_sketch.webp',
    '/reference/textures/doors/handle_right_sketch.webp',
    '/reference/textures/doors/door_back_left_sketch.webp',
    '/reference/textures/doors/pien.webp',
    // Environment
    '/reference/textures/entrance/wall_bricks_2.webp',
    '/reference/textures/entrance/stone-path.webp',
    '/reference/textures/entrance/floor_paper.webp',
    '/reference/textures/entrance/belka.webp',
    '/reference/textures/entrance/sign.webp',
    // Characters/Objects
    '/reference/textures/entrance/cat_front_body.webp',
    '/reference/textures/entrance/window_sketch.webp',
    '/reference/textures/entrance/avatar_window.webp',
    '/reference/textures/entrance/tree_sketch.webp',
    '/reference/textures/entrance/mouse_hanging.webp',
    '/reference/textures/entrance/pot_with_duck.webp',
    '/reference/textures/entrance/bug_sketch.webp',
    '/reference/textures/entrance/speech_bubble.webp',
    // Images
    '/reference/images/ink-splash.webp',
];

// Corridor scene textures
export const CORRIDOR_TEXTURES = [
    // Walls/Floor/Ceiling
    '/reference/textures/corridor/wall_texture.webp',
    '/reference/textures/corridor/kawalekpodlogi.webp',
    '/reference/textures/corridor/texturadoprogow.webp',
    '/reference/textures/corridor/texturadrewnadonozekbiurka.webp',
    '/reference/textures/corridor/ceiling_texture.webp',
    '/reference/textures/corridor/avatar_sketch.webp',
    // Double doors (end of corridor)
    '/reference/textures/corridor/doors/frame_sketch.webp',
    '/reference/textures/corridor/doors/doorrleft.webp',
    '/reference/textures/corridor/doors/dorright.webp',
    '/reference/textures/corridor/doors/handle_left_sketch.webp',
    '/reference/textures/corridor/doors/handle_right_sketch.webp',
    '/reference/textures/corridor/doors/pien.webp',
    // Single side doors
    '/reference/textures/corridor/doors/ramkasingledoors.webp',
    '/reference/textures/corridor/doors/klamkadodrzwi.webp',
    '/reference/textures/corridor/doors/backsingledoors.webp',
    '/reference/textures/corridor/doors/drzwiprojekty.webp',
    '/reference/portfolio/door-projects.webp',
    '/reference/portfolio/door-tools.webp',
    '/reference/textures/corridor/doors/drzwiabout.webp',
    '/reference/textures/corridor/doors/drzwikontakt.webp',
    '/reference/textures/corridor/doors/drzwiprojekty_painted.webp',
    '/reference/portfolio/door-projects-painted.webp',
    '/reference/portfolio/door-tools-painted.webp',
    '/reference/textures/corridor/doors/drzwiabout_painted.webp',
    '/reference/textures/corridor/doors/drzwikontakt_painted.webp',
    // Signs
    '/reference/textures/corridor/pustatabliczka.webp',
    // Decorations
    '/reference/textures/corridor/decorations/while_true_loop.webp',
    '/reference/textures/corridor/decorations/coffee_debug.webp',
    '/reference/textures/corridor/decorations/idea_process.webp',
    '/reference/textures/corridor/decorations/paper_ball.webp',
    '/reference/textures/corridor/decorations/paper_airplane.webp',
    '/reference/textures/corridor/decorations/pencil.webp',
    '/reference/textures/corridor/decorations/coffee_cup.webp',
    // CorridorDecorations - frames, furniture, lamps
    '/reference/textures/corridor/ramkanazdjecieduza.webp',
    '/reference/textures/corridor/ramkanazdjecieduza_painted.webp',
    '/reference/textures/corridor/ramkanazdjeciemala.webp',
    '/reference/textures/corridor/drzewkowdoniczce.webp',
    '/reference/textures/corridor/kratkawentylacyjna.webp',
    '/reference/textures/corridor/kwiatekwdoniczce.webp',
    '/reference/textures/corridor/kratanalampy.webp',
    '/reference/textures/corridor/bokilampy.webp',
    '/reference/textures/corridor/gorastolika.webp',
    '/reference/textures/corridor/szafkaprzod.webp',
    '/reference/textures/corridor/szafkaprzodgora.webp',
    '/reference/textures/corridor/rysuneknaobraz1.webp',
    '/reference/textures/corridor/rysuneknaobrazek3.webp',
    // DoorSection extras
    '/reference/textures/corridor/strzalka.webp',
    '/reference/textures/corridor/doors/door_back.webp',
    '/reference/textures/corridor/doors/klamkadodrzwi_painted.webp',
];

// Standard HTML Image assets (preloaded via new Image() in App.jsx)
export const IMAGE_ASSETS = [
    '/reference/images/ink-splash.webp',
    '/reference/images/map.webp',
    '/reference/images/map_about_painted.webp',
    '/reference/images/map_contact_painted.webp',
    '/reference/images/map_gallery_painted.webp',
    '/reference/images/map_studio_painted.webp',
    '/reference/images/pin.webp',
    '/reference/images/pin-slot.webp',
];

// Additional textures from App.jsx and avatar animations
export const UI_TEXTURES = [
    '/reference/textures/corridor/avatar_anim/1.webp',
    '/reference/textures/corridor/avatar_anim/2.webp',
    '/reference/textures/corridor/avatar_anim/3.webp',
    '/reference/textures/corridor/avatar_anim/4.webp',
    '/reference/textures/corridor/avatar_anim/5.webp',
    '/reference/textures/corridor/avatar_anim/6.webp',
    '/reference/textures/corridor/avatar_anim/7.webp',
    '/reference/textures/corridor/avatar_anim/8.webp',
    '/reference/textures/corridor/avatar_anim/9.webp',
];

// ============================================
// ROOM TEXTURES - Preloaded for instant room entry
// ============================================

// Gallery Room textures (loaded via useTexture / drei)
// These are organized to handle conditional painted vs standard versions
export const GALLERY_TEXTURES_BASE = [
    '/reference/textures/gallery/floor.webp',
    '/reference/textures/gallery/railing.webp',
    '/reference/textures/gallery/domki.webp',
    '/reference/textures/gallery/miastotlo.webp',
    '/reference/textures/gallery/bird_gray.webp',
    '/reference/textures/gallery/klamerka.webp',
    '/reference/textures/gallery/openliveproject.webp',
];

export const GALLERY_TEXTURES_VERSIONED = [
    // Project cards
    // Card back
    'tylkartki',
    'przyciskdotylukartki',
    // Tech stack logos
    'csslogo',
    'elementorlogo',
    'firebaselogo',
    'htmllogo',
    'jslogo',
    'netlifylogo',
    'phplogo',
    'reactlogo',
    'tailwindlogo',
    'wordpresslogo',
    'pythonlogo',
    'pytorchlogo',
    'tensorflowlogo',
    'fastapilogo',
    'dockerlogo',
    'langchainlogo',
    'n8nlogo',
    'kotlinlogo',
];

export const GALLERY_TEXTURES = [
    ...GALLERY_PROJECTS.flatMap(project => [project.front, project.painted, ...project.techStack]),
    ...GALLERY_TEXTURES_BASE,
    ...GALLERY_TEXTURES_VERSIONED.flatMap(name => [
        `/reference/textures/gallery/${name}.webp`,
        name === 'csslogo' ? `/reference/textures/gallery/css3logo_painted.webp` : `/reference/textures/gallery/${name}_painted.webp`
    ])
];

// The office reuses the corridor's wood texture; no separate seaside assets.
export const CONTACT_TEXTURES = [
    '/reference/textures/corridor/kawalekpodlogi.webp',
];

// About Room textures (loaded via useLoader(TextureLoader))
export const ABOUT_TEXTURES = [
    // Avatar
    '/reference/textures/about/awatarnachmurce.webp',
    // Awards
    '/reference/textures/about/SOTY.webp',
    '/reference/textures/about/SOTY_painted.webp',
    '/reference/textures/about/SOTD.webp',
    '/reference/textures/about/SOTD_painted.webp',
    '/reference/textures/about/SOTM.webp',
    '/reference/textures/about/SOTM_painted.webp',
    '/reference/textures/about/button.webp',
    '/reference/textures/about/button_painted.webp',
    // Journey islands
    '/reference/textures/about/uowyspa.webp',
    '/reference/textures/about/freelancewyspa.webp',
    // Skill balloons - large
    // Skill balloons - medium
    // Skill balloons - small
    // Clouds
    '/reference/textures/clouds/1131c3eb-dfae-423f-924b-ff39d8ccd6dc.webp',
    '/reference/textures/clouds/254b8ec8-d6f7-4275-956f-7bab65b2ce2d.webp',
    '/reference/textures/clouds/2cc88dd1-483c-466d-b07e-f8308c61ccbe.webp',
    '/reference/textures/clouds/5606fcc0-3252-447d-a58a-7bcbac73229a.webp',
    '/reference/textures/clouds/7882dc72-3d01-41fb-ac0e-d07b0184ebc1.webp',
    '/reference/textures/clouds/9b2ca72f-7bd0-473b-ba6e-dd9e0eb79d35.webp',
    '/reference/textures/clouds/c83293c6-d90c-4a32-8d9d-5ac9af7e2296.webp',
    '/reference/textures/clouds/f6e358bc-d27c-41dd-95f4-6787a835c41e.webp',
];

// Studio Room textures (loaded via useLoader(TextureLoader))
export const STUDIO_TEXTURES = [
    // Monitor (blog)
    '/reference/textures/studio/monitor_front.webp',
    '/reference/textures/studio/monitor_front_painted.webp',
    '/reference/textures/studio/monitor_back.webp',
    '/reference/textures/studio/monitor_back_painted.webp',
    '/reference/textures/studio/monitor_top.webp',
    '/reference/textures/studio/monitor_top_painted.webp',
    '/reference/textures/studio/monitor_bottom.webp',
    '/reference/textures/studio/monitor_bottom_painted.webp',
    '/reference/textures/studio/monitor_left.webp',
    '/reference/textures/studio/monitor_left_painted.webp',
    '/reference/textures/studio/monitor_right.webp',
    '/reference/textures/studio/monitor_right_painted.webp',
    // TV (youtube)
    '/reference/textures/studio/tv_front.webp',
    '/reference/textures/studio/tv_front_painted.webp',
    '/reference/textures/studio/tv_back.webp',
    '/reference/textures/studio/tv_back_painted.webp',
    '/reference/textures/studio/tv_top.webp',
    '/reference/textures/studio/tv_top_painted.webp',
    '/reference/textures/studio/tv_bottom.webp',
    '/reference/textures/studio/tv_bottom_painted.webp',
    '/reference/textures/studio/tv_side.webp',
    '/reference/textures/studio/tv_side_painted.webp',
    // Phone (tiktok)
    '/reference/textures/studio/phone_front.webp',
    '/reference/textures/studio/phone_front_painted.webp',
    '/reference/textures/studio/phone_back.webp',
    '/reference/textures/studio/phone_back_painted.webp',
    '/reference/textures/studio/phone_side.webp',
    '/reference/textures/studio/phone_side_painted.webp',
    // Custom content front textures
    '/reference/textures/studio/monitorfront_postnafbdoublewinner.webp',
    '/reference/textures/studio/monitorfront_postnafbdoublewinner_painted.webp',
    '/reference/textures/studio/phonefront_followmeontiktok.webp',
    '/reference/textures/studio/phonefront_followmeontiktok_painted.webp',
    '/reference/textures/studio/tvfront_filmikedytowaniezdjec.webp',
    '/reference/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp',
    '/reference/textures/studio/tvfront_filmikprojektdlamultiego.webp',
    '/reference/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp',
];

// ============================================
// COMBINED EXPORTS
// ============================================

// Textures loaded via useTexture (drei) - entrance, corridor, UI, gallery, contact
export const PRELOAD_ALL = [
    ...ENTRANCE_TEXTURES,
    ...CORRIDOR_TEXTURES,
    ...UI_TEXTURES,
    ...GALLERY_TEXTURES,
    ...CONTACT_TEXTURES,
    ...IMAGE_ASSETS,
];


// Textures loaded via useLoader(TextureLoader) - about, studio
export const PRELOAD_LOADER = [
    ...ABOUT_TEXTURES,
    ...STUDIO_TEXTURES,
];

/**
 * Filters the preload list based on whether the device supports hover (desktop) 
 * or is a touch-only device (mobile/tablet).
 * @param {string[]} list The list of texture paths to filter
 * @param {boolean} usePainted Whether to prioritize _painted versions
 * @returns {string[]} The filtered list
 */
export const filterTexturesByDevice = (list, usePainted) => {
    // 1. Identify all paths that have a _painted version available
    const paintedVersions = new Set(list.filter(p => p.includes('_painted.webp')));
    
    // Also include the special css3logo case
    const hasCss3Painted = list.some(p => p.includes('css3logo_painted.webp'));
    
    return list.filter(path => {
        const isPainted = path.includes('_painted.webp');
        const isCss3 = path.includes('css3logo_painted.webp');
        
        // Find the "standard" version for this path if it's a painted one
        let standardVersion = null;
        if (isPainted) {
            standardVersion = path.replace('_painted.webp', '.webp');
        } else if (isCss3) {
            standardVersion = path.replace('css3logo_painted.webp', 'csslogo.webp');
        } else {
            // Check if this standard path HAS a painted version in the list
            const pVersion = path.replace('.webp', '_painted.webp');
            const css3Version = path.replace('csslogo.webp', 'css3logo_painted.webp');
            if (list.includes(pVersion) || (path.includes('csslogo.webp') && hasCss3Painted)) {
                // Return true to keep the standard version! Both desktop and mobile need it.
                return true; 
            }
            // If it doesn't have a painted version, it's a static texture (always keep)
            return true;
        }

        // It's a painted version
        return usePainted;
    });
};
