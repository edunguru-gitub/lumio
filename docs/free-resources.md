# Free resources for Lumio v2 (checked 6 Nov 2026)

Rule: free for commercial use only. Pin exact versions. For file:// and QR mode, download the file into the repo (no CDN at runtime).
Sizes marked ~ come from memory or secondary pages, not the official repo; re-check at download.

## Animation and physics libraries (8)

| Lib | License (source) | Size (min) | No build step | Fit for Lumio | Verdict |
|---|---|---|---|---|---|
| Matter.js | MIT ([code mirror README](https://code.fosterhangdaan.com/foster/liabru-matter-js/raw/commit/60d08391aa6e5f4f0717ad8bdcac9f10055b6b68/README.md)) | ~80 KB | Yes, one `matter.min.js` | 2D rigid bodies, springs via Constraint (stiffness, damping), restitution. Ball, piston, particles | USE (physics) |
| planck.js | MIT ([README](https://unpkg.com/planck-js@0.3.31/README.md)) | ~200 KB | Yes, `planck.min.js` global | Box2D port, more accurate joints and fixed steps; heavier | SKIP unless Matter is not accurate enough |
| Motion (vanilla) | MIT ([page](https://learnwithhasan.com/js-libraries/motion/), repo motiondivision/motion) | mini 2.6 KB, full 18 KB | Yes, jsDelivr script, global `Motion` | Spring option (stiffness, damping) for UI with damping at 1.0 (no bounce); WAAPI keeps it light | USE (UI motion) |
| anime.js v4 | MIT ([licenses.dev](https://licenses.dev/npm/animejs/4.5.0)) | ~25 KB | Yes, UMD | Timelines, SVG, stagger; overlaps with Motion | SKIP (one UI lib is enough) |
| GSAP | Free "Standard No Charge" license, commercial allowed; bans use in tools competing with Webflow ([license](https://gsap.com/community/standard-license/)) | ~70 KB core | Yes | Powerful, but custom license, can change terms | SKIP (not OSI-open; Motion covers the need) |
| Lenis | MIT ([README](https://cdn.jsdelivr.net/npm/lenis@1.3.23/README.md)) | ~4 KB | Yes, unpkg script + css | Smooth scroll. Galaxy zoom is wheel-based, not scroll; adds a layer on phone | SKIP |
| Lottie (lottie-web) | MIT ([repo](https://github.com/airbnb/lottie-web)) | light build ~150 KB | Yes, cdnjs | Needs After Effects files; no content to play | SKIP |
| Three.js | MIT ([Wikipedia](https://en.wikipedia.org/wiki/Three.js), r184) | ~700 KB (module) | Yes via import map, but modules fail on file:// | 3D galaxy; against "plain CSS or canvas" rule and weak laptops | SKIP (revisit only if Eduard wants real 3D) |

Not fetched (blocked by the tool): official GitHub pages of Three.js, Matter.js, anime.js. Their MIT status comes from the secondary sources above. Verify the LICENSE file on download.

## Recommended stack
1. Matter.js: all lesson physics (spring constant, damping, restitution from the lesson). Fixed time step.
2. Motion mini or full: UI transitions only, no overshoot.
3. Own canvas or CSS for galaxy dust (no library).

## Design references (ideas only, nothing copied)

| Reference | License / terms | Idea we take | Fit |
|---|---|---|---|
| Swiss / International Typographic Style (public design history) | Ideas are not copyrightable; no assets used | Strict grid, one spacing scale, one focal point | Matches Swiss grid |
| Apple Human Interface Guidelines, Motion and Materials | Free to read; Apple text and images not reusable | Interruptible motion, continuity, restraint | Matches calm, professional |
| Radix Colors (radix-ui.com/colors) | MIT (not re-verified this session) | How to build a dark 12-step scale with enough contrast | Check our tokens, do not import |
| Inter (rsms.me/inter) and Caladea (Google Fonts) | SIL OFL / Apache 2.0 (not re-verified this session) | Already our fonts; confirm they are bundled locally for file:// | In use |
| Awwwards / Godly galleries | View only, work belongs to authors | Mood only: quiet dark editorial sites. Never copy layout or assets | Inspiration, label as such |

Rejected: any asset pack, template or Lottie file without an explicit commercial license; Dribbble and Behance shots (all rights reserved).
