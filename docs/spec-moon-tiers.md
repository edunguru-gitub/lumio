# Spec: Moon tiers (PROPOSAL, Designer, 26 Nov)

STATUS: PROPOSAL. Nothing here is approved. Eduard's rule was "do not invent ranking names", so Manager must get his OK before David builds (this is item B6 / Question 2 in spec-port-wave2.md). Docs only, no code.

Design read: a tier label next to the Moon number, so a number like 1,043 means something. Dials: variance low, motion low, density low. One accent per screen, Moon violet only on Moon, no emojis, no slogans, never colour alone.

## 1. What comes from Eduard's deck, and what is ours

Source: Lumio - Presentation.pdf (stage I), slide 4 ("a monthly Moon rating with ranks from New Moon to Blue Moon") and slide 13 (same sentence). v1 and the repo have no names or thresholds.

From the deck (3 facts, the only ones):
1. The first rank is called "New Moon" (slides 4 and 13).
2. The last rank is called "Blue Moon" (slides 4 and 13).
3. Moon is a monthly rating and it has ranks (slides 4 and 13). The deck gives no count, no middle names, no thresholds.

Invented by us (needs Eduard's OK): the number of tiers (6), the four middle names (Crescent, First Quarter, Gibbous, Full Moon), all Elo thresholds, all Romanian names, the tier icons, the reset wording, every copy string below.

Honest note for pitch: until Eduard approves and David builds, the app shows no names, so the deck sentence is ahead of the product.

## 2. Tiers and thresholds

Facts used from v2/js/moon.js: start 1000, K 32 for the first 10 games then 20, win 1 / draw .5 / loss 0, monthly soft reset to 1000 + (r - 1000) / 2, Sample players about 940 to 1260. One win against a 1000 opponent gives +16; against a 1100 opponent about +23.

| # | EN | RO | Moon points from | Meaning |
|---|---|---|---|---|
| 1 | New Moon | Luna Nouă | 0 (everything under 1015, also the start) | everyone starts here |
| 2 | Crescent | Semiluna | 1015 | usually 1 or 2 wins |
| 3 | First Quarter | Primul pătrar | 1050 | about 3 net wins |
| 4 | Gibbous | Luna gibboasă | 1100 | steady winner |
| 5 | Full Moon | Luna Plină | 1160 | strong month |
| 6 | Blue Moon | Luna Albastră | 1250 | rare, near the top of the Sample range |

Why: a new player reaches tier 2 in one or two wins (a win vs a 940 Sample gives only +13, so not always one). Blue Moon needs +250 inside one month, and the reset halves leftovers, so it must be re-earned. Rule: there is no tier below New Moon, so a bad run never shows a worse name. Waning phases are not used because "waning" reads as decline.

Do not recolour Blue Moon blue: no new colour. It is told apart by a ring on its icon and by its name.

## 3. Icons (SVG, same family as the v1 phase icon)

16 x 16 viewBox, 1.2 stroke circle radius 6, lit part filled with currentColor, the same construction as v1 moonPhase. Lit share: tier 1 outline only (0), tier 2 about 25 percent, tier 3 50 percent, tier 4 about 75 percent, tier 5 100 percent, tier 6 100 percent plus a thin outer ring radius 7.5. Violet only on the Moon tile and Moon values; on Ranks rows the icon follows the row's Moon text token. aria-hidden, the tier name always sits next to it.

PARITY CONFLICT (needs Eduard): v1 and v2 already show a moon icon that means the day of the month, not a tier. Two moon icons with two meanings confuse a teen. Proposal: the tier icon replaces the day-of-month icon on the Moon tile and Ranks rows. This changes v1 behaviour, so it needs his explicit OK. If he says no, tier names show text only, no icon.

## 4. Where tier names appear

1. Home, Moon tile: number, then tier name with icon under it, then one muted line "{n} points to {next}" (top tier: "Top rank"). New player (no game yet): "Win a Challenge to reach Crescent." The existing sub line (#a of b, Sample, days left) stays.
2. Moon explainer (tile click): one line on tiers, plus "Best this month: {name}" and "Last month: {name}".
3. Ranks page: each row shows icon + tier name in muted 11 px under or beside the Moon number (at 390 on line 2, next to Lumens). Sample rows keep the Sample tag; their tier is computed from their Moon points.
4. Challenge result (toast via L.toast and the end card): "Moon +14" as today; if a tier is crossed upward add one line "New rank: Crescent". Crossing down shows only "Moon -9", with no tier message.

## 5. Monthly soft reset (never punishment)

Engine unchanged (half way back to 1000). Display rules:
- Reset is framed as a new month, not a loss. First open of the month shows one quiet line on the Moon tile for the session: "New month. Last month: {name}." The name is last month's best tier, kept in Last month.
- A player above 1000 moves down at most by half, so Blue Moon (1250) becomes 1125 (Gibbous), still a high rank. A player below 1000 moves UP (970 becomes 985), a small free lift.
- Tier of the month is shown as "Best this month" in the explainer, so a single bad game does not erase what the teen reached.
- No red, no down arrow, no words "demoted", "dropped", "lost rank". Rose (miss) colour is not used for tiers.
- Leaderboard: tier name is the headline of a row, position number is secondary. A teen at 8 of 10 reads "Crescent", not "8th".

## 6. Copy strings (EN / RO)

| key | EN | RO |
|---|---|---|
| tier_1 | New Moon | Luna Nouă |
| tier_2 | Crescent | Semiluna |
| tier_3 | First Quarter | Primul pătrar |
| tier_4 | Gibbous | Luna gibboasă |
| tier_5 | Full Moon | Luna Plină |
| tier_6 | Blue Moon | Luna Albastră |
| tier_to | {n} points to {name} | {n} puncte până la {name} |
| tier_top | Top rank | Rang maxim |
| tier_new | Win a Challenge to reach Crescent. | Câștigă o provocare ca să ajungi la Semilună. |
| tier_up | New rank: {name} | Rang nou: {name} |
| tier_best | Best this month: {name} | Cel mai bun din această lună: {name} |
| tier_last | Last month: {name} | Luna trecută: {name} |
| tier_ex | Moon ranks go from New Moon to Blue Moon. They follow your Moon rating. | Rangurile Lunii merg de la Luna Nouă la Luna Albastră. Urmează ratingul tău de Lună. |
| reset_note | New month. Last month: {name}. | Lună nouă de joc. Luna trecută: {name}. |
| reset_ex | Each month your Moon moves half way back to 1,000. Last month's best stays saved. | În fiecare lună, Luna ta revine la jumătatea drumului spre 1.000. Cea mai bună din luna trecută rămâne salvată. |

Romanian to check with Eduard (native speaker): "Luna gibboasă" and "Primul pătrar" are the astronomical terms; plain alternative for gibbous is "Aproape plină". Keep the existing RO sentence style ("Luna", "provocări").

## 7. Psychologist check (5 lines)

1. First 30 seconds: starting at New Moon with a named next step ("Win a Challenge to reach Crescent") gives a goal, not a bare 1000.
2. Generous start: tier 2 within 1 or 2 wins; no tier below the first, so no discouraging label ever.
3. Reset: framed as a new month, below-1000 players get lifted, last month's best tier is kept, no loss words.
4. Rank 8 of 10: the row headline is the tier name, the place is secondary, and Sample players are tagged so the board is not read as real peers.
5. Rarity honest: Blue Moon is hard but not hidden; colour is never the only signal (name + icon shape), and no slogans.

## 8. Open questions for Eduard (via Manager)

1. OK for 6 tiers with the names above (middle four are ours)?
2. OK to replace the day-of-month moon icon with the tier icon (parity)?
3. OK for the thresholds 1015 / 1050 / 1100 / 1160 / 1250, or does he want different numbers?
4. Romanian wording for tiers 3 and 4.
Until answered: no tier names are shown (as in spec-port-wave2.md B6).
