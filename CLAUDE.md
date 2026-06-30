# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FitPlan is a personal fitness tracking PWA — a single self-contained HTML file (`index.html`) with no build system, no dependencies, and no package manager. The app is in Thai (ภาษาไทย).

`FitPlan-webapp.html` is a duplicate of `index.html` (identical files).

## Running the App

Open directly in a browser, or serve via any HTTP server to enable YouTube embeds (blocked on `file://`):

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

There are no build, lint, or test commands — this is a static vanilla JS/CSS/HTML file.

## Architecture

Everything lives inside `index.html` in three sections:

**CSS (lines 9–323)** — CSS custom properties (`--bg`, `--green`, `--card`, etc.) drive the dark theme. All component styles are here.

**HTML (lines 328–561)** — Six static `<div class="page">` panels rendered by JS. Bottom `<nav>` with 6 buttons controls which page is `.active`.

**JavaScript (lines 563–1115)** — No framework. Key data structures:

| Object | Purpose |
|--------|---------|
| `DAYS` | Exercise data per workout day (mon/wed/thu/core) — sets, reps, work/rest seconds, YouTube IDs, cue text |
| `YT` / `YT_SEARCH` | YouTube video IDs and fallback search queries per exercise key |
| `MEALS` | Daily nutrition plan array |
| `MONTHS` | 3-month training plan (adaptation → progressive → peak) |
| `BF_SCALE` / `ROADMAP` | Body fat % visualization data |
| `WEEK` | Weekly schedule for the overview card |

**State management** uses `localStorage`:
- `fitplan_weights` — weekly weight log (keys: `w1`–`w12`)
- `fitplan_goals` — monthly goal checklist (keys: `m1`, `m2`, `m3`)

## Key Behaviors

**Timer** (`startTimer`, `step`, `tickUI`) — tracks work/rest phases per set using `setInterval`. Uses Web Audio API (`beep()`) for audio cues. Timer state is in the module-level `T` object.

**YouTube thumbnails** — load `i.ytimg.com` thumbnail images and replace with inline `<iframe>` on click. Fallback button opens YouTube search for dead links.

**Page navigation** — `nav(btn)` toggles `.active` on `.page` divs and `.nav-btn` buttons. No router.

**`jumpDay(k)`** — called from the weekly overview card to switch the workout tab and scroll to it.

## Adding/Modifying Exercises

Add an entry to `DAYS[day].ex` array with keys: `k` (unique string), `n` (English name), `th` (Thai name), `sets`, `reps`, `work` (seconds), `rest` (seconds), `dur`, `w` (weight), `cue`. Then add the YouTube ID to `YT[k]` and a search string to `YT_SEARCH[k]`.

## Hardcoded User Data

The app is personalised: male, 177 cm, 90 kg start weight, goal 84 kg, 3-month plan July–September 2026. Weight tracking starts from `2026-07-07` (first Monday). These values are hardcoded in `updateOverall()` (`start=90`, `target=84`) and `renderWeightRows()` (`startDate`).
