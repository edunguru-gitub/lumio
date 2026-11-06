# Spec: tactile system + warm Light theme (Designer, 6 Nov). Docs only; David builds from this.
Refs checked: design/mockups/matte-laptop-flat.png (dark galaxy, aurora glow, hairline nav). NOT in repo: v4/v5 style-2/3/6/8 PNGs, reference/ has only a pdf and mp4 (they live in the design board artifact PAmxQuV6BkSMq36tYbFREo). Language below follows brief-design-v5 (quiet luxury + aurora, neumorphism as control depth only).
Diagnosis of Light galaxy: flat #F6F0E6 with no depth; core ellipse is dark (inverted from dark theme); text weight 400 and ink too thin on pale; nav is bare text + underline, no container, no affordance.

## 1 Warm Light theme (tiramisu light, layered)
- Layers (low to high): canvas #EFE6D6, surface #F6F0E6, raised #FFFBF4, inset #E8DDCA. Never a flat single cream: canvas carries aurora.
- Ink #2B2018, muted #5E5242 (AA 6.5:1 on surface), line #D3C5AE, tan accent #8C6838 (hover #74552C). Body weight 500, labels 600, headings Caladea 600.
- Aurora (canvas only, behind galaxy): radial 60% 40% rgba(217,195,160,.55) fading to 0 at 65%; radial 20% 85% rgba(140,104,56,.14) at 55%; radial 85% 15% rgba(127,176,192,.16) at 50%. Soft, no orange, no purple.
- Galaxy core = warm glow, never a solid shape: radial-gradient rgba(255,236,200,.95) 0, rgba(217,160,90,.45) 35%, rgba(217,160,90,0) 70%; blur 6px; size ~1.6x the old ellipse. Dust dots in subject colour at 70% opacity on light (no white dots).
- Subject colours on light (text/ring, AA >=4.5 on #FFFBF4, verify with checker before merge): Physics #2F6B7D, Math #4A7A4C, Spanish #A04F57, Life skills #8C6838. Dark keeps #7FB0C0/#9DBF9E/#C98B8B/#D9C3A0. Fills/glows may use the dark values at 35% alpha.
- Planets on light: filled = subject colour + 1px darker edge + soft shadow 0 2px 6px rgba(43,32,24,.25); current = ring 2px; locked = outline #B5A78F (>=3:1).

## 2 Tactile system (one light source, top-left, same in both themes)
Edge rule: every raised or inset control has a 1px edge (contrast >=3:1 vs its surface). Shadows never replace the edge.
Raised (button, key, knob): 
- Light: bg linear-gradient(#FFFFFF,#F3EADB); border 1px #CDBEA4; box-shadow 0 1px 0 rgba(255,255,255,.9) inset, 0 -2px 0 rgba(43,32,24,.10) inset, 0 3px 6px rgba(43,32,24,.18), 0 1px 1px rgba(43,32,24,.20).
- Dark: bg linear-gradient(#2A2620,#211E1A); border 1px #3A352D; box-shadow 0 1px 0 rgba(237,227,208,.08) inset, 0 -2px 0 rgba(0,0,0,.35) inset, 0 4px 8px rgba(0,0,0,.45), 0 1px 1px rgba(0,0,0,.5).
Inset (slider track, field, toggle well):
- Light: bg #E8DDCA; border 1px #CDBEA4; box-shadow 0 2px 4px rgba(43,32,24,.22) inset, 0 -1px 0 rgba(255,255,255,.8) inset.
- Dark: bg #171513; border 1px #2E2A24; box-shadow 0 2px 5px rgba(0,0,0,.6) inset, 0 -1px 0 rgba(237,227,208,.06) inset.
Pressed: translateY 2px (small buttons, keys) to 5px (Launch, big keys); raised shadows collapse to 0 1px 1px, inset shadow of raised flips to 0 2px 4px rgba(...) inset; 90 ms ease-out down, 160 ms up; no bounce. Hover (mouse only): lighten 3%, no travel.
Switches (mechanical): inset well 56x28 radius 14; knob 24 raised with a 1px ridge line; travel 28px, 160 ms; ON = tan fill well (#D9C3A0 dark / #8C6838 light) with knob light, label "On" text too; OFF = outline well, transparent, label "Off". Colour never sole signal: knob position + text.
Detent slider: inset track 8px high; thumb 24 raised; ticks 1x8 px at each step in muted, major tick every 5th; thumb snaps to tick with a 40 ms settle and one soft tick sound (if sound on); value in mono above thumb; keyboard arrows = 1 step.
Launch: raised key 64 high, tan label; safety cover = hinged flap over it (inset-rimmed, hatched edge); click lifts cover 160 ms, then the key can be pressed 5px; auto-closes after 4 s idle or after launch. Keyboard: Enter opens, Enter again fires; reduced motion = cover fades.
Focus ring (all): 2px solid accent (tan #8C6838 light / #D9C3A0 dark) + 2px offset gap in canvas colour; never removed.
Reduced motion: no travel animation, state swaps instantly with colour/shadow change only; cover and switch use fade.
Touch: min 44x44; travel 2px; no hover states.

## 3 Nav = segmented control
- Home | Subjects | Ranks in one inset capsule well (36 high, radius 18, inset style) with a raised sliding thumb under the active tab (raised style, tan edge, ink text 600). Inactive text muted 500. Thumb slides 200 ms ease-out; reduced motion = jump.
- Same capsule pattern for Galaxy/Tabs, Light/Dark, RO/EN (each its own small capsule, 2 segments). Phone: bottom tabbar uses the same capsule, full width, 48 high.
- Remove underline-only style everywhere.

## 4 Which component gets what
- Raised: Continue/Back/primary buttons (Continue stays subject-colour outline per taste, now with raised edge, no tan fill), nav thumb, Launch, switch knobs, slider thumbs, zoom +/- keys.
- Inset: slider tracks, answer fields (stay clearly visible), switch wells, nav capsule well, progress bars "4 of 12".
- Flat + hairline (Swiss, no shadow): cards, ratings cards, ranks rows, terminal ticker, text. Aurora + glow only on canvas/galaxy.
- Not allowed: glass, neon, orange except Lumens, purple except Moon, shadows on text.

## 5 Build order and checks
1 tokens (layers, shadows as vars --raise, --inset, --press, --focus, both themes). 2 aurora + galaxy core glow + light subject colours. 3 nav capsules. 4 buttons + switches. 5 sliders + Launch cover. 6 pass over lessons, ranks, terminal.
Test: contrast (text 4.5, edges/rings 3) in both themes; keyboard tab order + visible focus; press travel 2-5px; reduced-motion on; phone 390px; no black core in Light; ă â î ș ț render; Galaxy/Tabs and RO/EN state persists; no layout shift on press; 60 fps zoom on galaxy.
