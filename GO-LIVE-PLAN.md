# Known Number — Go-Live Audit & Plan

Audit date: 2026-10-20. Scope: voice (TTS), translation/i18n, player UI, SEO.
Status legend: 🔴 blocker for launch · 🟠 should fix · 🟢 nice to have · ✅ done in this pass

---

## 0. Progress (updated)

Done: U1–U3, U4, U6, U7 (tracker, Answer button, language-switch reset, shortcuts, aria), V1/V3/V7/V8 (pre-generated MP3s via `npm run audio`, single-advance queue, digit-by-digit numbers, listen button on every channel), T1–T3/T5 (scope cut to en + bn, runtime translation removed), T4 (about/privacy/accessibility bilingual, aria strings), T7 (links carry `lang`, result page follows scenario language), T8, T9, V2 (privacy wording), SEO (section 2).
Still open: per-language URLs + hreflang (T6), U5 (decline-call synthetic choice), V4/V5 (browser-voice fallback and autoplay policy), native-speaker review of Bangla, verify every hotline number on `/report` and `/card`, real domain for `NEXT_PUBLIC_SITE_URL`, Playwright smoke tests.

## 1. Findings

### 1.1 Voice (src/lib/speech.ts, src/app/api/tts/route.ts)

| # | Sev | Issue |
|---|-----|-------|
| V1 | 🔴 | `/api/tts` proxies the **unofficial** `translate.google.com/translate_tts` endpoint. It violates Google's ToS, has no SLA, and is rate-limited or blocked per server IP (a cloud host like Vercel or Coolify is far likelier to be blocked than your laptop). It works in dev and will likely fail in production. |
| V2 | 🔴 | Privacy page promises "nothing leaves your device", but every scenario line is sent to Google for TTS and translation. Either change the claim or remove the dependency. |
| V3 | 🔴 | `playNextChunk` can run twice for one chunk: `audio.onerror` and the `play()` rejection both call the speechSynthesis fallback, and both call `playNextChunk` when done. Result: skipped or overlapping sentences. |
| V4 | 🟠 | Fallback `speechSynthesis` rarely has a `bn` voice on Windows, iOS or many Android devices. It then speaks Bangla with an English voice or stays silent, and the 8s safety timer makes the queue stall. |
| V5 | 🟠 | Browsers block autoplay until a user gesture. The first autoplay after navigation silently fails, then falls to V4. |
| V6 | 🟠 | Every chunk is fetched from Google each time (no server or CDN cache of our own). Slow on 3G in Bangladesh, and there is a gap between chunks. |
| V7 | 🟠 | Numbers and OTPs ("16247", "999", "৬ ডিজিটের কোড") are read as whole numbers, not digit by digit. Dangerous for a scam-safety app. |
| V8 | 🟠 | The listen button exists only for `channel === 'call'`. SMS, chat and email nodes, feedback text and the debrief cannot be read aloud. These are the screens low-literacy elders most need read to them. |
| V9 | 🟢 | One voice for every speaker. Gender, pace and pressure cannot be varied. `spokenText` exists in the model but no scenario uses it. |

### 1.2 Translation / i18n

| # | Sev | Issue |
|---|-----|-------|
| T1 | 🔴 | Only `en` and `bn` have written scenarios. `hi`, `es` and `ar` get **runtime machine translation** (`translator.ts` → unofficial `translate.googleapis.com` gtx). Safety-critical advice and hotline numbers can be mistranslated, and the call fails offline or when blocked. Either ship curated scenarios for those languages or remove the languages. |
| T2 | 🔴 | Machine translation also translates **sender names, handles, brand names and numbers** ("Northfield Bank", `16247`). These must be protected or skipped. |
| T3 | 🔴 | hi/es/ar users get **US scenarios** (FTC, US banks) machine-translated. The content is wrong for those regions. |
| T4 | 🔴 | Many strings are hard-coded as `language === 'bn' ? … : 'English'`. hi/es/ar users see English in `report`, `result`, `card`, `organise` (partly), `SettingsModal`, `Header` aria-labels, the "Skip to main content" link and `aria-label="Available choices"`. `about`, `privacy` and `accessibility` are **English only**, even for bn. |
| T5 | 🟠 | Translations are cached forever in `localStorage` (`kn_tr_*`), keyed by text only. There is no version, no expiry and no quota handling. A bad translation sticks until the user clears storage. |
| T6 | 🟠 | Language lives in client state only. The server always renders `<html lang="en">` and English, then flips after hydration, so Bangla users see a flash of English. Crawlers see only English, and there are no per-language URLs, so hreflang is impossible (see SEO). |
| T7 | 🟠 | `result` page: the scenario title is not translated, and the recipient sees the page in *their* stored language, not the sender's. Share links carry no `lang`. |
| T8 | 🟠 | The homepage hard-codes demo sender and routes per language. The category map (`CATEGORY_NAMES`) is keyed by names that do not match the real `scenario.category` values (`family-distress` vs `grandchild-emergency`), so the category label falls back to a raw slug. |
| T9 | 🟠 | No Bangla web font is set. Rendering depends on the device's system font, and conjuncts look broken on older Android. Load Noto Sans Bengali (via `next/font`) and size line-height for it. |
| T10 | 🟢 | Settings label shows "20px" etc. Locale-specific numerals (০-৯) are not used consistently. |

### 1.3 Player / UI

| # | Sev | Issue |
|---|-----|-------|
| U1 | 🔴 | **Multi-step tracker is wrong.** `totalSteps = Object.keys(nodes).length`. It counts every node, including branches the user never visits. In `grandchild-call` (6 nodes) a safe user sees "Step 2 of 6", then jumps to the debrief. The tracker never reaches the end and the dots mislead. |
| U2 | 🔴 | The **Answer button on the incoming-call screen does nothing** (`onAnswer={() => {}}`). The call screen only changes when a choice is made, so "Answer" looks broken. It should advance the call or reveal the first message. |
| U3 | 🔴 | `SET_SCENARIO` resets the whole engine. It fires on mount and again whenever the translated scenario arrives, so a **language switch mid-drill wipes progress** and the user returns to step 1. |
| U4 | 🟠 | Numeric shortcut badges (1, 2, 3) are drawn on choices but **no key handler exists**. They promise a keyboard shortcut that does not work. |
| U5 | 🟠 | Decline-call builds a synthetic choice with a hard-coded `habit: 'pause'` and `feedback: t.safeOutcomeTitle`, so it bypasses scenario content, red flags and tracking. |
| U6 | 🟠 | `RouteLine`'s `progressbar` exposes `aria-valuenow` but not `aria-valuetext`. Screen readers read the same wrong "of N". The current dot uses `border-3`, which is not a default Tailwind class (check `tailwind.config.ts`), so the ring may not render. |
| U7 | 🟠 | The translating banner uses emoji `🔄` in `animate-spin`. It is not announced (`aria-live` is missing) and the player stays interactive with stale text. |
| U8 | 🟢 | `Header` settings badge shows "Large / XL / 20px / Hi-Con" in English only. |

### 1.4 SEO (before this pass)

Only a basic title, description and keywords existed. No `robots`, `sitemap`, canonical, Open Graph, Twitter card, structured data, icons or manifest. Every drill page shared the homepage title. Most pages are client components and so could not export `metadata`.

---

## 2. SEO — done in this pass ✅

Build passes (`next build`, 26 pages).

- `src/lib/seo.ts` — `SITE_URL` (set `NEXT_PUBLIC_SITE_URL` in prod; defaults to `https://knownnumber.vercel.app`, a placeholder you must replace), shared copy.
- `src/app/layout.tsx` — `metadataBase`, title template, OG/Twitter, robots, theme colour, keywords (incl. Bangla), JSON-LD `WebSite` + `WebApplication`.
- `src/app/robots.ts`, `sitemap.ts` (all pages plus each drill), `manifest.ts`.
- `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx` — generated brand images (replace with designed assets later).
- Per-page metadata: `about`, `privacy`, `accessibility` (page exports); `organise`, `report`, `card` (route `layout.tsx`, as the pages are client components); `result` and `styleguide` set to `noindex`.
- `drill/[id]` — `generateMetadata` per scenario (title, description, canonical, OG, `bn_BD` locale) plus `LearningResource` JSON-LD.

**SEO still to do (needs decisions or content):**
1. **Per-language URLs** (`/en/...`, `/bn/...`) with `hreflang`, a server-rendered `<html lang>` and no English flash (fixes T6). This is the biggest SEO win for Bangladesh search. Use Next `[locale]` segment plus middleware.
2. Real domain, then Search Console and Bing Webmaster, submit the sitemap.
3. Designed OG image and a favicon set; alt text on all images.
4. Content pages that rank: "How to spot a bKash OTP scam", "What to do if you shared your OTP", "Fake courier SMS". Use Bangla and English articles with FAQ schema.
5. Core Web Vitals check (Lighthouse), after adding the Bangla font with `next/font` (`display: swap`).
6. Canonicals for `/drill/*#from=..&to=..` are fine (hash is ignored).

---

## 3. Plan

### Phase 0 — Launch blockers (≈2–3 days)
1. **Replace Google-scraped TTS (V1, V2, V3).**
   - Best: **pre-generate audio at build time** for all curated scenario lines (6 scenarios × ~20 lines) using a licensed TTS (Azure `bn-BD-NabanitaNeural` / `PradeepNeural`, or Google Cloud TTS `bn-IN`). Ship the MP3s as static files on a CDN. No runtime dependency, no per-user cost, no ToS risk, instant playback, works offline once cached.
   - Fix the double-advance bug with a single `advance()` guard per chunk.
2. **Decide the language scope (T1–T3).** Recommended: launch with **en + bn only**, hide hi/es/ar until real scenarios exist. Remove runtime Google translation (`/api/translate`, `translator.ts`).
3. **Fix the tracker (U1):** compute `totalSteps` as the longest path (or show a "Step N" with unknown length, or a 3-stage Pause → Verify → Tell tracker). Fix U2 and U3 in the same change: Answer advances the call; `SET_SCENARIO` only when the scenario id changes, never mid-drill.
4. **Finish i18n (T4):** move every string into `translations.ts` (and `about`/`privacy`/`accessibility` copy), no more inline ternaries.
5. Correct the privacy claims, and have `NEXT_PUBLIC_SITE_URL` set.

### Phase 1 — Quality (≈1 week)
- Locale routing + server-rendered `lang` + hreflang (T6, SEO #1).
- Digit-by-digit reading of numbers (V7); read-aloud for SMS/chat, feedback and debrief (V8).
- Bangla font via `next/font` (T9); fix `CATEGORY_NAMES` (T8); keyboard shortcuts (U4); `aria-valuetext` and live regions (U6, U7).
- Native-speaker review of every Bangla line (spelling, tone, bKash/Nagad/Rocket terms).
- Share links carry `lang`; result page shows the scenario in that language (T7).
- Playwright smoke tests: each drill's safe and unsafe path, language switch mid-drill, audio fallback.

### Phase 2 — Growth (≈2–4 weeks)
- SEO content pages and FAQ schema; Search Console monitoring.
- More Bangladesh scenarios (Nagad/Rocket, fake job/visa, fake prize/lottery, "sir, I'm from BTRC/police", Facebook marketplace advance payment, fake loan apps).
- PWA/offline: cache the audio and pages; many users are on weak connections.

---

## 4. Suggestions that would make it really helpful

1. **Voice-first, low-literacy mode.** Many targets of bKash/OTP fraud in Bangladesh are older or have limited reading. Make the whole drill listenable, with big "answer" buttons. This is the most valuable feature.
2. **Branching with consequences.** Show what the scammer does next on a wrong pick (e.g. balance drains), not just text feedback. People remember consequences.
3. **Live "trusted numbers" card.** Verified hotlines per country (bKash 16247, 999, BTRC, bank numbers), with a "last verified" date; the print card already exists, so wire it to one data file.
4. **Spaced reminders.** An optional share link / WhatsApp message "retry in 2 weeks" and a family scoreboard (no accounts, hash-based).
5. **Scam of the month.** A small, editable content feed so new local scams (new SMS wording) reach families quickly.
6. **Family code word.** A guided step to agree a secret family phrase for "your grandchild is in trouble" calls.
7. **"Check this message" tool.** Paste a suspicious SMS and get red-flag highlights (rule-based, offline). Helpful beyond the drills and a strong SEO magnet.
8. **Measure what works,** privacy-safely: cookieless, aggregate counters (completions, safe vs unsafe rate per scenario) to find which scams people fail.
9. **Partner with** bKash/banks/consumer-rights groups for credibility and distribution.
10. **Content safety:** show "last reviewed" and sources on each scenario (the data model already has `lastReviewed` and `sources`).
