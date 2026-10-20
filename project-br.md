# Scam Drill — Business Requirements & Build Plan

| | |
|---|---|
| **Version** | 1.0 (Draft) |
| **Date** | 2026-10-20 |
| **Project type** | Solo pet project, zero-cost, open-source |
| **Stack** | Next.js 16 (App Router) + TypeScript, static export |
| **Target cost** | $0/month (optional domain only) |

---

## 1. Executive Summary

**Scam Drill** is a free web app that lets families run a "fire drill" for scams. An adult child sends a link to a parent or grandparent. The older person plays through a realistic but harmless scam scenario (a panicked phone call from a "grandchild", a "bank fraud department" call, a romance chat that turns into an investment pitch) and practises the right response in a safe place. A debrief explains the red flags and teaches three habits: **Pause · Verify · Tell**.

There is no account, no install, no AI cost and no personal data stored. All content is authored scenarios that run entirely in the browser.

**One-line positioning:** *"The 5-minute scam fire drill for your family — no install, no sign-up."*

---

## 2. Problem Statement & Evidence

Older adults are the most financially damaged group in online fraud, and the losses are accelerating [S1]:

- US adults aged 60+ filed **201,266** complaints with the FBI IC3 in 2025, with reported losses of about **$7.75 billion**, up **59%** from 2024.
- AI-related scams (e.g. voice cloning for "family in distress" calls) caused about **$893 million** in losses across all ages; older adults accounted for about **$352 million** of that.
- The FTC reported record overall fraud losses of **$15.9 billion** in 2025.
- Reported losses undercount reality, because many victims never report.

**Why current advice fails:** Tips like "be careful" and "never share your password" are read but not rehearsed. Scams work through urgency and fear, and people under pressure fall back on instinct, not on a leaflet. Rehearsal under mild simulated pressure is the missing step.

---

## 3. Market & Competitor Analysis

| Product | Type | Strength | Gap for our wedge |
|---|---|---|---|
| SATA (TSS Foundation) | Simulation platform | Realistic scenarios, institutional | Aimed at banks/institutions, not families [S2] |
| DART / Deepcover | Native game + e-learning | Research-backed, free app | App-store install, puzzle format, subscription model for libraries [S2] |
| Mailbox (RIT) | HTML5 game | Free, accessible themes | Email scams only [S2] |
| Scamnopoly | Board game | Intergenerational | Physical, not shareable remotely [S2] |
| IFEC Hong Kong toolkit | Digital toolkit | Public, localised | Region-specific [S2] |
| Trust Onion / FRAUTH | Rotating family codewords | Prevention tool | Different approach: protection, not rehearsal [S3] |
| SDOC (research prototype) | Web app | Evidence-based | Reported usability challenges for older users [S2] |

**Our wedge (differentiators):**
1. **Family-initiated:** the *adult child* sends the drill, which is how the older person is actually reached.
2. **Phone-call and chat scenarios** with optional spoken audio, the formats where the biggest losses occur.
3. **Zero friction:** a link in WhatsApp or SMS, no install, no account.
4. **Privacy by design:** nothing is collected or stored server-side.
5. **Community region packs:** open-source scenarios that anyone can localise to their country.

**Honest risk:** Competitors have more research behind them. We win on convenience and family fit, not on pedagogy depth.

---

## 4. Vision, Goals & Non-Goals

### 4.1 Goals
- G1: A learner can finish a drill in **under 8 minutes** without help.
- G2: Learners demonstrate at least one of the **Pause / Verify / Tell** habits by the end.
- G3: A family organiser can send a drill and get a result summary in **under 2 minutes**.
- G4: The app is accessible to older users (WCAG 2.2 AA, large text, high contrast).
- G5: **Operating cost is $0.**

### 4.2 Non-Goals (explicit)
- No user accounts, logins or server-side user data.
- **Never send simulated scam calls or messages to real phone numbers or emails.** The drill runs only inside the app.
- No live AI-generated scam content (cost, safety and accuracy risk).
- Not a scam detector, call blocker or reporting service.
- Not financial or legal advice.
- No ads. No tracking cookies.

### 4.3 Success Metrics (realistic for a pet project)

| Metric | Target (first 3 months) |
|---|---|
| Drill completion rate | ≥ 60% of started drills |
| Median drill length | ≤ 8 min |
| Usability test (5 older adults) | ≥ 4 of 5 finish unaided |
| Lighthouse accessibility | ≥ 95 |
| Largest Contentful Paint (4G, mid phone) | < 2.5 s |
| Monthly cost | $0 |
| Drills started (stretch) | 1,000 |

---

## 5. Users & Personas

**Primary learner — "Margaret", 72.** Uses WhatsApp and a smartphone, is wary of technology and dislikes feeling tested. She needs large text, one action per screen, and a tone that never shames her.

**Primary organiser — "Sam", 41.** Worried about a parent, short on time, and shares links on family chat. He needs a quick way to send a drill and a simple summary with conversation prompts.

**Secondary — "Priya", library/senior-centre volunteer.** Wants a screen she can project and run for a group (v1.1 Presenter Mode).

---

## 6. Key User Journeys

**J1: Organiser sends a drill**
1. Sam opens Scam Drill, picks a scenario ("Grandchild in trouble") and the region.
2. Optionally types his and his parent's first names (kept only in the link, not sent to a server).
3. Gets a share link and a ready-made message ("Mum, try this 5-minute thing I found").

**J2: Learner plays**
1. Margaret opens the link, sees a calm intro ("This is practice. Nothing is real.").
2. Plays a step-by-step scenario with choices, an optional spoken call, and a pressure indicator.
3. Gets friendly feedback after each choice.
4. Sees a debrief: red flags, the three habits, what to do if it happens for real.
5. Taps "Share my result with Sam".

**J3: Organiser reviews**
1. Sam opens the result link and sees which habits his mum used, where she was tempted, and 3 conversation prompts.

---

## 7. Scope (MoSCoW)

### MVP (v1.0)
- **Must:** scenario player, 6 scenarios (US/English), debrief, result sharing via link, family drill link, large-text/high-contrast settings, printable "Pause · Verify · Tell" card, privacy and about pages, report-a-scam resource page.
- **Should:** spoken audio for call scenarios (browser text-to-speech), "spot the red flag" tap interaction, installable PWA/offline.
- **Could:** simple cookie-less visit counts.

### v1.1
- Presenter mode for groups, UK and one more region pack, additional languages, community scenario contributions.

### Later
- Scenario difficulty levels, seasonal/trending scam packs, embeddable widget for libraries and banks.

---

## 8. Functional Requirements

| ID | Priority | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-01 | Must | **Scenario player:** presents a scenario as a sequence of steps, each with a channel (call, SMS, chat, email, pop-up), messages and 2–4 choices | Given a scenario, when the learner picks a choice, then the next step shows with feedback within 300 ms; the scenario always ends in a safe or unsafe outcome |
| FR-02 | Must | **Feedback after every choice** (non-shaming): what a scammer wants, what to do instead | Every choice has feedback text; wording passes the tone checklist in 10.3 |
| FR-03 | Must | **Debrief screen:** red flags found/missed, habits demonstrated, "if this happens for real" steps | Debrief shows after END; lists every flag defined for the scenario |
| FR-04 | Must | **Pause·Verify·Tell habit tracking:** each choice can award a habit | Result shows P/V/T status as demonstrated or not yet |
| FR-05 | Must | **Family drill link:** `/drill/<scenarioId>#from=<name>&to=<name>&region=<code>` | Link loads the scenario with a personalised intro; names appear only in the URL hash (never sent to a server) |
| FR-06 | Must | **Result link:** encodes score, habits and flags tapped into a compact URL hash | Organiser opens the link and sees the summary with no backend and no login |
| FR-07 | Must | **Share buttons:** native Web Share API with copy-link fallback; prefilled friendly message | Works on iOS Safari, Android Chrome and desktop |
| FR-08 | Must | **Settings:** text size (3 levels), high-contrast mode, reduced motion, audio on/off, stored in localStorage | Settings persist across sessions and apply instantly |
| FR-09 | Must | **Printable card:** one-page "Pause · Verify · Tell" fridge card via print CSS | Prints on one A4/Letter page, black-and-white friendly |
| FR-10 | Must | **Report-a-scam page:** per-region links and phone numbers to official reporting channels | Links reviewed and dated; shown at the end of every drill |
| FR-11 | Must | **Static pages:** About, Privacy, Contribute, Accessibility statement | Linked from the footer on every page |
| FR-12 | Should | **Spoken call audio:** browser speech synthesis reads the scammer's lines; transcript always visible | If no voice is available, text-only mode works without error |
| FR-13 | Should | **"Spot the red flag":** tap suspicious phrases in a message before continuing | Tapped flags are recorded for the debrief |
| FR-14 | Should | **Pressure indicator:** visual meter showing escalating urgency; no real countdown timer by default | Meter shown; reduced-motion respected; optional timer off by default |
| FR-15 | Should | **Offline/PWA:** installable, scenarios cached after first visit | Scenario completes with network disabled |
| FR-16 | Should | **Region packs:** scenarios, reporting links and currency/format per region | Switching region swaps the library; unavailable regions fall back to English/US |
| FR-17 | Could | **Cookie-less visit counter** | No cookies; documented in Privacy page |
| FR-18 | v1.1 | **Presenter mode:** large-screen view, audience picks the choice, facilitator advances | Works from one laptop, no accounts |
| FR-19 | v1.1 | **Contribution workflow:** scenario template, JSON schema validation, PR checklist | CI rejects invalid scenario files |

---

## 9. Content Requirements

Content is the product. The engine is small; the scenarios are what people remember.

### 9.1 MVP scenario library (6)
Chosen to match the categories causing the most harm to older adults [S1].

| # | Scenario | Channel | Core lesson |
|---|---|---|---|
| 1 | "Grandchild in trouble" (arrest/accident, plea for secrecy and money; includes a voice-clone variant) | Phone call | Hang up, call them back on a known number; use a family code word |
| 2 | "Bank fraud department" (asks you to move money to a "safe account") | Phone call | Banks never ask you to move money; call the number on your card |
| 3 | Government/authority impersonation (tax, benefits or police demanding payment) | Phone call/SMS | Agencies do not demand gift cards, crypto or wire transfers |
| 4 | Tech-support pop-up ("your computer is infected, call now") | Browser pop-up + call | Close it; no real warning shows a phone number |
| 5 | Wrong-number friendly chat that becomes an investment pitch | Chat | Slow-built trust is a tactic; "guaranteed" returns are a red flag |
| 6 | Parcel/delivery fee text or email with a link | SMS | Don't click links; go to the official site directly |

**Backlog:** crypto ATM instruction, fake refund/overpayment, romance with video "proof", utilities disconnection threat, charity appeal.

### 9.2 Scenario authoring rules
1. Written from the victim's point of view with realistic, **non-gory** scammer language; no instructions that would help someone run a scam.
2. **Fictional organisations only** (e.g. "Northfield Bank"); no real brands, phone numbers, URLs or people.
3. Every scenario must teach at least one of Pause, Verify or Tell.
4. 4–7 steps, 2–4 choices per step, completion in 3–8 minutes.
5. Every choice has feedback; wrong choices never say "wrong", they say "A scammer would love this reply. Here's why."
6. Reading level around age 12 (aim for short sentences, no jargon).
7. Each scenario lists its **red flags** and a **real-world "what to do" box**.
8. Each scenario carries `lastReviewed` and sources. Review every 6 months, since scams evolve.

### 9.3 Content tone checklist
- Calm, warm, never condescending. No "stupid", "gullible", "elderly victim".
- Celebrate good instincts, not just correct answers.
- Reassure that scam victims are intelligent people, and that scams are professional operations.

### 9.4 Scenario data model (TypeScript)

```ts
type Channel = 'call' | 'sms' | 'chat' | 'email' | 'popup' | 'web';
type Habit = 'pause' | 'verify' | 'tell';

interface Scenario {
  id: string;
  version: number;
  region: string;            // e.g. 'us', 'uk'
  locale: string;            // e.g. 'en-US'
  title: string;
  summary: string;
  category: 'family-distress' | 'bank-impersonation' | 'authority' |
            'tech-support' | 'romance-investment' | 'delivery-phishing';
  durationMin: number;
  startNodeId: string;
  nodes: Record<string, ScenarioNode>;
  redFlags: RedFlag[];
  debrief: { summary: string; whatToDoIfReal: string[]; reportingKey: string };
  lastReviewed: string;      // ISO date
  sources: string[];
}

interface ScenarioNode {
  id: string;
  channel: Channel;
  sender: { displayName: string; handle?: string };
  messages: { text: string; flagIds?: string[]; spokenText?: string }[];
  pressure: 0 | 1 | 2 | 3;
  choices: Choice[];
}

interface Choice {
  id: string;
  label: string;
  next: string | 'END_SAFE' | 'END_UNSAFE';
  habit?: Habit;
  feedback: string;
  points: number;
}

interface RedFlag { id: string; label: string; explanation: string; }
```

### 9.5 Scoring and outcomes
- **Outcome:** `END_SAFE` (reached a safe action) or `END_UNSAFE` (would have lost money or data).
- **Habits:** each of Pause, Verify and Tell is marked demonstrated if any chosen option carried it.
- **Result:** "habits shown (0–3)", "red flags spotted (n of m)", and a gentle one-line takeaway. No numeric grade, no fail screen.
- An unsafe ending always offers "Try again" and shows the safe path as a replay.

---

## 10. Non-Functional Requirements

### 10.1 Accessibility (WCAG 2.2 AA minimum)
- Base text ≥ 20 px by default, with an option to scale up to ~28 px.
- Contrast ≥ 7:1 (AAA) for body text in high-contrast mode.
- Touch targets ≥ 48 × 48 px; one primary action per screen.
- Fully keyboard- and screen-reader operable; meaningful ARIA labels.
- Respect `prefers-reduced-motion`; no flashing; audio always has a transcript.
- No time limits that cannot be disabled.
- Plain language and a progress indicator on every step.

### 10.2 Performance
- Static pages and client-side logic only; JS ≤ ~150 KB gzipped on the scenario route.
- LCP < 2.5 s on a mid-range phone over 4G.
- Works on browsers from the last ~3 years (Safari iOS, Chrome Android/desktop, Edge, Firefox).

### 10.3 Privacy and security
- No accounts, no server-side user data, no third-party trackers, no ads.
- Names in family links live only in the URL **hash** (fragment), which browsers don't send to servers.
- Result links contain no personal data other than optional first names.
- Settings stored in localStorage only.
- Content-Security-Policy and security headers on the host.
- Speech synthesis may use network voices on some browsers; the UI notes this and defaults to local voices when available.
- Privacy page describes exactly what is and isn't stored.

### 10.4 Reliability and maintainability
- Fully static output: no servers to fail or patch.
- Scenarios are validated at build time against a schema; invalid content fails CI.
- Dependencies updated monthly (automated PRs).

### 10.5 Localisation
- Routing by `[locale]`, with strings in dictionaries and region packs in `/content/<region>/`.
- Date, currency and phone-number formats by region.

---

## 11. Legal, Ethical & Safety Requirements

- **Disclaimer:** educational only; not legal or financial advice.
- **Fictional entities only** to avoid trademark/impersonation issues.
- **Content safety:** scenarios show tactics from the victim's perspective and never provide scripts optimised for committing fraud.
- **Respectful design:** no shaming, no fear-mongering, no dark patterns.
- **Emotional safety:** the intro states it is practice; the end offers support and reporting steps for anyone who has actually been scammed.
- **Regional accuracy:** reporting links must be verified for each region before release.
- **Licensing (proposal):** code under MIT; scenario content under CC BY 4.0 so others can translate and adapt.
- **Children:** not directed at children; no data collected from anyone.
- **Name check:** verify "Scam Drill" for domain and trademark conflicts before launch.

---

## 12. Technical Architecture

### 12.1 Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, current Active LTS) | Required; static export supported |
| Language | TypeScript (strict) | Type-safe scenario model |
| Rendering | `output: 'export'` (fully static) | $0 hosting anywhere, no server costs |
| Styling | Tailwind CSS + CSS variables for themes | Fast, consistent; easy high-contrast themes |
| Scenario engine | Pure reducer / small state machine | Easy to test, no heavy deps |
| Content | JSON/MDX files in repo, validated with Zod at build | No database |
| Audio | Web Speech API (`speechSynthesis`) | Free, built in |
| i18n | `[locale]` segment + dictionaries (evaluate `next-intl`; confirm static-export compatibility first) | Region packs |
| Persistence | `localStorage` + URL hash | No backend |
| PWA | Service worker (e.g. Serwist or a minimal custom worker) | Offline after first load |
| Testing | Vitest (engine), Playwright (flows), axe-core (a11y), Lighthouse CI | Automated quality gates |
| CI/CD | GitHub Actions | Free |

### 12.2 Hosting (all free options)
Because the site is static, any of these work: **GitHub Pages**, **Cloudflare Pages** (unlimited bandwidth, 500 builds/month on the free tier), **Netlify**, or **Vercel Hobby** [S4]. Note that Vercel's free Hobby plan is intended for personal, non-commercial use, so verify the current terms if you ever monetise. A static site avoids the usage-based surprise bills and cold starts that affect free server tiers [S4].

### 12.3 Suggested repository layout

```
scam-drill/
├─ app/
│  ├─ [locale]/
│  │  ├─ page.tsx                 # landing + scenario picker
│  │  ├─ organise/page.tsx        # create family drill link
│  │  ├─ drill/[id]/page.tsx      # player (static params)
│  │  ├─ result/page.tsx          # decode result from hash
│  │  ├─ report/page.tsx          # report-a-scam resources
│  │  ├─ card/page.tsx            # printable P·V·T card
│  │  └─ about | privacy | contribute | accessibility
├─ components/                    # Player, ChoiceButton, PressureMeter, FlagTap, Settings...
├─ lib/
│  ├─ engine.ts                   # reducer: (state, choice) => state
│  ├─ scoring.ts
│  ├─ share.ts                    # encode/decode hash payloads
│  ├─ speech.ts                   # TTS wrapper with fallback
│  └─ schema.ts                   # Zod schemas
├─ content/
│  └─ us/ scenarios/*.json, reporting.json
├─ messages/                      # en.json, ...
├─ tests/ (unit, e2e, a11y)
└─ .github/workflows/ci.yml
```

### 12.4 Link and result encoding
- **Drill link:** `/en/drill/grandchild-call#from=Sam&to=Mum&region=us`
- **Result link:** `/en/result#d=<base64url of {s: scenarioId, o: 'safe'|'unsafe', h: ['pause','verify'], f: [flagIds], n: 'Mum'}>`
- Everything after `#` stays in the browser. No server receives it.
- Payload is versioned (`v:1`) so future changes don't break old links.

### 12.5 Cost summary

| Item | Cost |
|---|---|
| Hosting (static) | $0 |
| CI | $0 |
| Text-to-speech | $0 (browser) |
| Analytics (optional, cookie-less; verify terms) | $0 |
| Fonts/icons | $0 (system fonts, open-licence icons) |
| Domain (optional) | ~$10–15/year (or use a free subdomain) |

---
# Scam Drill — Design System & UI Guide

Replaces section 13 of SCAMDRILL_PLAN.md. Version 1.0.

---

## 1. Design brief

- **Subject:** a rehearsal for scam calls and messages, run by families.
- **Primary audience:** adults 65+ on a phone, often with reduced vision, some anxiety about technology, and a strong dislike of being tested.
- **Secondary audience:** adult children who send the drill and read the result.
- **Primary job of the interface:** keep a nervous person calm and oriented for five minutes while a realistic scam plays out, then leave them more capable than they arrived.
- **Tone:** calm, plain, respectful. Never alarming, never childish, never promotional.

---

## 2. Design review: defaults I rejected

A first-pass direction was checked against what generic generated UI tends to look like, and these choices were changed.

| First instinct | Why it was rejected | Replacement |
|---|---|---|
| Soft teal or "trustworthy blue" with rounded white cards | Reads as generic fintech or wellness; not specific to this subject | Colour and shape semantics taken from public safety signage |
| Friendly illustrations of smiling seniors | Patronising; stock-image feel | No photography or character art; the simulated device screens are the imagery |
| One border radius and one soft shadow on everything | Flat hierarchy, template look | Radius by role, no shadows, structure through fill and rule |
| Gamified points, streaks, confetti | Trivialises financial loss and shames people | Quiet confirmation and plain results |
| Eyebrow labels, step numbers on everything, arrows on buttons | Decorative chrome | Numbers only where content is truly a sequence |

---

## 3. Concept: signage for a rehearsal

Safety signs communicate under stress using three redundant channels: shape, colour and words. This product does the same.

The single memorable element is the **sign system** (section 7). Everything surrounding it is deliberately plain: white ground, dark ink, generous space, large type.

A persistent **practice band** across the top of every drill states "Practice. Nothing here is real." with an always-visible Stop practice button, the way a drill is announced before it starts.

---

## 4. Principles

1. **One action per screen.** The learner always knows the one thing to do next.
2. **Never rely on colour alone.** Shape plus colour plus text, always.
3. **Big, quiet, left-aligned.** No centred paragraphs, no dense columns.
4. **The scam looks real; the app does not.** Simulated device screens look like ordinary phone UI. The surrounding app looks like a calm information sign. The two must never be confused.
5. **Failure is information, not judgement.** No red screens that say you failed.
6. **Motion only answers an action.** Nothing animates on its own, apart from the incoming call screen.
7. **Spend boldness in one place.** The sign system. Everything else is restrained.

---

## 5. Colour

### 5.1 Core palette

| Token | Hex | Role | Approx. contrast on white |
|---|---|---|---|
| `--ink` | `#12263A` | Body text, headings, outlines | 15:1 |
| `--ink-muted` | `#435566` | Secondary text | 7.7:1 |
| `--paper` | `#FFFFFF` | Page background | n/a |
| `--panel` | `#EAF0F5` | Grouped areas, device surround | ink on panel 13:1 |
| `--rule` | `#C5D0DA` | Decorative dividers only | not for essential UI |
| `--control-edge` | `#5F7385` | Borders of inputs and buttons | 4.9:1 (needs 3:1) |
| `--signal-blue` | `#0A4F8A` | Primary action, habits, practice band | 8.4:1 |
| `--safe-green` | `#1B6B3A` | Safe outcome | 6.5:1 |
| `--warn-amber` | `#F2B705` | Red flag fill (always with ink text or glyph) | ink on amber 8.6:1 |
| `--stop-red` | `#B3261E` | Unsafe outcome | 6.5:1 |

Contrast values are my own estimates; verify every pair with a contrast checker and axe before release.

### 5.2 Rules
- Body text: `--ink` on `--paper` or `--panel` only.
- Colour is a semantic signal, not decoration: blue = do this, amber = notice this, green = safe, red = would have lost.
- No gradients, no tints of brand colours as decoration, no translucent glass effects.
- Large coloured areas are limited to the practice band and sign shapes.

### 5.3 High-contrast theme (`data-contrast="high"`)
- Ink becomes `#000000`, signal blue `#003B73`, borders become 2px solid ink, panels become white with a 2px ink border.
- Same layout, same shapes; only values change.

### 5.4 Device namespace
Simulated phone screens use a separate token set (`--device-*`) so they look like generic phone UI, not like our brand. These tokens are never used outside the device frame component.

---

## 6. Typography

- **Family:** Atkinson Hyperlegible Next (OFL licence), variable weight, self-hosted at build time through `next/font`, so no request to a font server happens at runtime. Confirm the exact export name in the Next.js font docs; if unavailable, self-host the OFL font files from the Google Fonts repository.
- **Fallback:** `ui-sans-serif, system-ui, sans-serif`.
- **Inside device frames:** the system font stack, to look like real phone UI.

### 6.1 Scale (base 20 px; user can raise to 24 or 28)

| Role | Size | Weight | Line height |
|---|---|---|---|
| Caption (minimum anywhere) | 16 px | 400 | 1.5 |
| Body | 20 px | 400 | 1.55 |
| Lead / choice text | 25 px | 500 | 1.4 |
| Heading 3 | 25 px | 700 | 1.25 |
| Heading 2 | 31 px | 700 | 1.2 |
| Heading 1 | 39 px (31 on small phones) | 700 | 1.15 |
| Landing display | 49 px (landing hero only) | 700 | 1.1 |

### 6.2 Rules
- Maximum measure 62 characters; always left-aligned, ragged right.
- Heading weight never above 700. Letter-spacing -0.01em on headings only.
- Buttons and labels use weight 600, sentence case.
- No all-caps labels, no tracked-out text, no italics for emphasis (use weight).
- Do not accent a single word in a headline with a different colour or style.
- Numerals use default proportional figures in prose and tabular figures in results.

---

## 7. The sign system

### 7.1 Shapes and meaning

| Meaning | Shape | Colour | Label (always visible) |
|---|---|---|---|
| Habit to practise (Pause, Verify, Tell) | Circle | Signal blue, white pictogram | Pause / Verify / Tell |
| Red flag in a message | Triangle | Amber fill, ink pictogram | "Red flag" |
| Safe outcome | Square | Safe green, white check | "Safe" |
| Unsafe outcome | Circle with horizontal bar | Stop red, white bar | "A scammer would win" |

The conventions are inspired by public safety signage. Draw original pictograms; do not copy official ISO 7010 artwork.

### 7.2 Habit pictograms (original, geometric)
- **Pause:** two vertical bars.
- **Verify:** a phone outline with a return arrow.
- **Tell:** two overlapping speech bubbles.
- Drawn on a 48 px grid with consistent corner treatment; exported as inline SVG components. Used at 24, 32 and 48 px.

### 7.3 Usage rules
- A sign always appears with its text label; the shape is reinforcement, not the message.
- Never use sign shapes decoratively.
- Habit state in the result uses words: "Shown" or "Not yet", plus filled or outlined circle.

---

## 8. Shape, spacing and elevation

- **Spacing unit:** 4 px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Radius by role:** 0 for bands and rules, 6 px for buttons and inputs, 12 px for feedback panels, 32 px for the device frame outer edge. No other radii.
- **No box shadows.** Hierarchy comes from fill, 2 px borders and spacing.
- **Borders:** interactive controls use 2 px `--control-edge`. Decorative dividers use 1 px `--rule`.
- **Focus:** 3 px `--signal-blue` outline with 2 px offset; on blue backgrounds, a white outline with an ink inner ring. Never removed.

---

## 9. Layout

### 9.1 Grid
- Single reading column, max width 40rem, left-aligned on the page, with 24 px side padding on phones.
- Landing page switches to two columns at 1024 px: text left, device frame right.
- Breakpoints: 320, 480, 768, 1024. Design phone-first at 320 px width and 200% text.

### 9.2 Landing page

```
+--------------------------------------------------------------+
| Scam Drill                           Text size    Contrast    |
+--------------------------------------------------------------+
|                                                              |
|  Practice the call                  +---------------------+  |
|  before it comes.                   |  Incoming call      |  |
|                                     |                     |  |
|  A five-minute rehearsal for        |  Northfield Bank    |  |
|  the scams that target              |  Fraud Department   |  |
|  families. No sign-up.              |                     |  |
|  Nothing is recorded.               |  [ Answer ] [ Decline ]|
|                                     +---------------------+  |
|  [ Start a practice call ]                                   |
|  [ Send a drill to a relative ]                              |
|                                                              |
+--------------------------------------------------------------+
| About   Privacy   Contribute   Accessibility                 |
+--------------------------------------------------------------+
```

The hero is the most characteristic thing in this product's world: a call that should not be answered. Tapping Answer on the device starts the first scenario, so the hero is also the demo.

### 9.3 Player

```
+--------------------------------------------------------------+
| Practice. Nothing here is real.              [ Stop practice ]|   practice band, sticky
+--------------------------------------------------------------+
| Step 3 of 6   o---o---(o)---o---o---o                         |   route line
| Pressure: rising   [====][====][    ][    ]                   |
|                                                              |
|   +--------------------------------------+                   |
|   |  Northfield Bank - Fraud Department  |                   |   device frame
|   |  "Your account has been frozen.      |                   |
|   |   I need the code we just sent."     |                   |
|   +--------------------------------------+                   |
|                                                              |
|  What do you do?                                             |
|  [ Read out the code                                       ] |
|  [ Hang up and call the number on my card                  ] |
|  [ Ask them to prove who they are                          ] |
+--------------------------------------------------------------+
```

- Step numbering is used here because the scenario genuinely is a sequence.
- Pressure uses four segments plus a text label ("calm, rising, high, peak"). It never flashes and never counts down.

### 9.4 Feedback panel (after a choice)

```
+--------------------------------------------------------------+
| [triangle] Red flag                                          |
| A real bank does not ask for a code it just sent you.        |
|                                                              |
| What to do instead: hang up and call the number on the      |
| back of your card.                                           |
|                                                              |
| [ Continue ]                                                 |
+--------------------------------------------------------------+
```

Left edge is a 6 px rule in the semantic colour. The sign shape and word carry the meaning.

### 9.5 Debrief and result

```
+--------------------------------------------------------------+
| You hung up and called back.                                 |
| [circle] Pause: Shown   [circle] Verify: Shown   [circle] Tell: Not yet |
|                                                              |
| Red flags in this call                                       |
| [triangle] The caller created urgency.                       |
| [triangle] They asked for a code sent to you.                |
|                                                              |
| If this happens for real                                     |
| 1. Hang up.                                                  |
| 2. Call the number on the back of your card.                 |
| 3. Tell someone you trust.                                   |
|                                                              |
| [ Share my result ]   [ Practice another call ]              |
+--------------------------------------------------------------+
```

The numbered list is a true sequence, so numbering is appropriate here.

### 9.6 Organiser page
Radio list of scenarios (full-width rows with title and one-line summary), two optional name fields, a region select, then a generated link with Copy and Share buttons and a preview of the message that will be sent.

---

## 10. Components

| Component | Specification |
|---|---|
| **Button, primary** | Signal-blue fill, white text, weight 600, min height 56 px, radius 6 px, full width on phones |
| **Button, secondary** | White fill, 2 px signal-blue border, signal-blue text |
| **Button, quiet** | Text-only with underline on hover and focus; used for low-priority actions |
| **Choice button** | Full width, left-aligned text, min height 64 px, 2 px control-edge border, 12 px gap between choices; selected state shows a filled left rule and the chosen text, never colour alone |
| **Feedback panel** | See 9.4; appears below the choices and moves focus to its heading |
| **Practice band** | Sticky, 56 px, signal blue, white text, contains Stop practice |
| **Route line** | Horizontal line with stops; current step ringed; text "Step n of N" always present |
| **Pressure meter** | Four segments plus text label; reduced-motion safe |
| **Habit badge** | Blue circle with pictogram, word beneath, "Shown" or "Not yet" |
| **Flag marker** | Amber triangle inline with the highlighted phrase, text label on tap |
| **Settings sheet** | Text size (three options), contrast (two options), audio (on/off); radio controls, minimum 48 px |
| **Share card** | Preview of the message text, Copy and Share buttons, confirmation in text ("Link copied") |
| **Device frame** | See section 11 |

States for every interactive component: default, hover, focus-visible, active, disabled. Disabled states are avoided where possible; prefer a hidden or absent control with an explanation.

---

## 11. Simulated device screens

- Frame: 32 px outer radius, 2 px ink outline, no shadow, sits on `--panel`.
- Variants: call (incoming, in-call), SMS, chat, email, browser pop-up.
- Visual style: ordinary generic phone UI using system fonts and neutral colours from the `--device-*` tokens. Not branded after any real operating system or messaging app.
- Names, numbers, logos and URLs are fictional.
- The frame always includes a visible caption beneath it, for example "Phone call from Northfield Bank", so screen reader and low-vision users get the same context.
- Pop-up and email variants never use working links.

---

## 12. Motion

- No entrance animations, no scroll effects, no hover lifts.
- Allowed, all in response to a user action: feedback panel expands (150 ms), step content swaps with a short opacity change (120 ms), copy confirmation appears.
- **One deliberate exception:** the incoming-call screen has a gentle ring pulse so the scenario feels real. It is static under `prefers-reduced-motion` and when the user turns animation off in settings.
- No flashing at any speed. No auto-advancing screens. No countdown timers by default.

---

## 13. Voice and copy

- Plain verbs, sentence case, active voice, no exclamation marks, no emoji.
- A button names exactly what it does, and the same action keeps the same name everywhere.
- Never use "wrong", "failed", "oops", "gullible", "elderly victim", "simulation", "game" or "quiz". Use "practice".
- Errors say what happened and how to fix it. Empty states offer the next action.

| Instead of | Write |
|---|---|
| Oops! Wrong answer! | A scammer would like this reply. Here is why. |
| Let's get started! | Start practice |
| Submit | Share my result |
| You failed this scenario | The scam would have worked this time. Try again or see the debrief. |
| Congratulations, you are a scam expert! | You hung up and called back. That is the right move. |
| Something went wrong | This link is incomplete. Ask the person who sent it to share it again. |

---

## 14. Imagery and iconography

- No photography, no stock images, no AI-generated imagery, no mascots, no emoji anywhere (UI, content, README, commit messages).
- The only illustration is the device frames and the sign pictograms.
- Icons are original inline SVG with one stroke weight and corner style. Do not mix icon sets.
- Open Graph image: a static template with the device frame and headline, generated at build time.

---

## 15. Accessibility (design-level requirements)

- Body text 7:1 contrast where possible, 4.5:1 absolute minimum; non-text UI 3:1.
- Primary buttons at least 56 px high; every target at least 48 px; at least 12 px between adjacent targets.
- Text resizes to 200% with no loss of content or function.
- Visible focus on every control; logical tab order; skip link.
- Screen readers: the device frame has a text caption; sign shapes have text labels, and decorative SVG is hidden from assistive technology.
- Audio is optional; a full transcript is always on screen.
- Instructions never depend on colour, shape or position alone.
- Respect `prefers-reduced-motion` and `prefers-contrast`.

---

## 16. Implementation

### 16.1 Tokens (`styles/tokens.css`)

```css
:root {
  --ink: #12263A;
  --ink-muted: #435566;
  --paper: #FFFFFF;
  --panel: #EAF0F5;
  --rule: #C5D0DA;
  --control-edge: #5F7385;
  --signal-blue: #0A4F8A;
  --safe-green: #1B6B3A;
  --warn-amber: #F2B705;
  --stop-red: #B3261E;

  --base-size: 20px;               /* 24px and 28px for larger text settings */
  --measure: 62ch;

  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;

  --radius-control: 6px;
  --radius-panel: 12px;
  --radius-device: 32px;
}

[data-contrast="high"] {
  --ink: #000000;
  --ink-muted: #1A1A1A;
  --signal-blue: #003B73;
  --control-edge: #000000;
  --panel: #FFFFFF;
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

### 16.2 Fonts (`app/layout.tsx`)

```ts
import { Atkinson_Hyperlegible_Next } from 'next/font/google';

export const sans = Atkinson_Hyperlegible_Next({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
```

Map tokens into the Tailwind theme so classes reference tokens, not raw hex values.

### 16.3 Component library
- `components/sign/` holds `HabitBadge`, `FlagMarker`, `OutcomeSign` and the three pictograms.
- `components/device/` holds `DeviceFrame` and its five variants.
- An internal `/styleguide` route (excluded from the sitemap and search indexing) renders every component in every state at all three text sizes and both contrast themes. This replaces Storybook at zero cost and doubles as the screenshot target for visual tests.

---

## 17. Design QA

### 17.1 Rejection checklist (a design fails review if it contains any of these)
- Emoji or emoji-like decoration anywhere
- Gradients, glass blur, decorative blobs or glows
- Stock photos or generated illustrations of people
- A grid of identical cards with identical shadows
- Hover lift, fade-up on scroll, or any unprompted motion other than the call ring
- All-caps eyebrow labels, middle-dot meta strings, arrows appended to button text
- Centred body paragraphs
- Points, streaks, badges, confetti or leaderboards
- Colour used as the only signal
- Any text under 16 px

### 17.2 Automated checks in CI
- **Emoji lint:** fail the build if source, content or docs match `/\p{Extended_Pictographic}/u` (allow a short list such as the copyright sign).
- **Token lint:** stylelint rule that rejects raw hex colours and non-scale spacing outside `styles/tokens.css`.
- **Accessibility:** axe on every route, in both contrast themes.
- **Visual regression:** Playwright screenshots of `/styleguide` and each key screen at 320, 390, 768 and 1280 px, at 100% and 200% text.
- **Lighthouse CI:** accessibility 95 or higher.

### 17.3 Manual checks before launch
- Run every scenario with VoiceOver on iOS and TalkBack on Android.
- Run the full drill using only a keyboard.
- Test at 200% browser zoom on a 320 px wide screen.
- Test with five older adults; for each screen ask "What do you think this button does?" before they press it.

---

## 18. Changes to apply to SCAMDRILL_PLAN.md

1. Replace section 13 (UX Requirements) with a pointer to this guide.
2. Add to section 10.1 (Accessibility): the 56 px primary target, 12 px target spacing and high-contrast theme requirements above.
3. Add to the repository layout: `styles/tokens.css`, `components/sign/`, `components/device/`, `app/[locale]/styleguide/`.
4. Add to section 15 (Testing): emoji lint, token lint and visual regression from 17.2.
5. Add to Phase 1: design tokens, sign components and a static DeviceFrame before building scenario logic.
6. Add to non-goals: no emoji, no gamification, no stock or generated imagery.
---

## 14. Delivery Plan (solo, ~8–10 hours/week)

| Phase | Weeks | Deliverables | Exit criteria |
|---|---|---|---|
| **0. Validate** | 0–1 | Talk to 5 people (3 older adults, 2 adult children); pick launch region; draft scenario 1 on paper | Learners understand the concept; region and name decided |
| **1. Engine + 1 scenario** | 1–3 | Next.js project, schema, reducer, player UI, scenario #1, debrief | Playable end-to-end on mobile; unit tests for engine |
| **2. Family loop** | 3–4 | Organise page, drill links, result links, share buttons, settings, card | Sam→Margaret→Sam loop works with no backend |
| **3. Content** | 4–6 | Scenarios #2–6, red-flag taps, reporting page, spoken audio | All 6 scenarios reviewed against the authoring rules |
| **4. Quality** | 6–7 | Accessibility pass, PWA/offline, performance, usability test with 5 older adults | Success metrics in 4.3 met; blocking issues fixed |
| **5. Launch** | 7–8 | Domain, privacy/about pages, README, share plan | Public and indexed |
| **6. Growth** | 8+ | Presenter mode, UK pack, translations, community PRs | Driven by feedback |

### Definition of Done (per feature)
Types pass, unit/e2e tests pass, axe shows no serious issues, works at large text size, works on a small phone, content reviewed against the tone checklist.

### Backlog by epic
1. **Engine:** schema, reducer, scoring, tests
2. **Player UI:** channels, choices, feedback, pressure meter
3. **Family loop:** link builder, hash encoding, result summary, share
4. **Content:** 6 scenarios, red flags, debriefs, reporting data
5. **Accessibility and settings**
6. **Audio:** speech wrapper, voice fallback
7. **PWA/offline**
8. **Static pages and print card**
9. **CI, testing, release**

---

## 15. Testing & Quality Plan

- **Unit:** engine transitions, scoring, hash encode/decode, schema validation (invalid scenarios fail the build).
- **E2E (Playwright):** complete each scenario via the safe path and the unsafe path; family link and result link round trip; settings persistence.
- **Accessibility:** axe on every route in CI; manual screen reader pass (VoiceOver, TalkBack) before launch.
- **Usability test:** 5 older adults on their own phones. Observe silently, then ask: "What would you do if this happened for real?" Fix the top 3 friction points before launch.
- **Content review:** a second person checks each scenario for tone, accuracy and realism.

---

## 16. Launch & Growth (free channels)

1. **Seed:** you plus 10 friends/family run a real drill with their parents; collect feedback.
2. **Share where families are:** WhatsApp/Facebook family groups, local community groups, neighbourhood forums.
3. **Institutions:** libraries, senior centres and community colleges (offer the print card and presenter mode when ready).
4. **Communities:** scam-awareness and cybersecurity subreddits, Hacker News "Show HN", Product Hunt.
5. **Content hook:** publish a short post, "I built a scam fire drill for my family", using the FBI numbers as context.
6. **Seasonal hooks:** holiday shopping scams, tax season, travel season.
7. **Open source:** call for translators and region packs, which is also the growth engine for new countries.

---

## 17. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Competitors are better funded | High | Medium | Stay focused on the family-initiated, zero-friction, privacy-first wedge |
| Scenarios become outdated as scams evolve | High | Medium | `lastReviewed` dates; 6-month review; community PRs |
| Older users find the UI hard | Medium | High | Large-text defaults; usability test with real users before launch |
| Content teaches tactics to bad actors | Low | High | Victim-perspective writing; no operational scripts; second-reader review |
| Wrong reporting information for a region | Medium | High | Verify links; show "last checked" date; link to official sites only |
| Browser voices are poor or missing | Medium | Low | Text transcript always available; audio optional |
| Hosting terms change | Low | Medium | Static export is portable across hosts |
| Learner feels embarrassed | Medium | Medium | Practice framing, no scores or failure screens, warm feedback |
| Solo-developer burnout / stalled project | Medium | Medium | Ship MVP at 3 scenarios first; weekly small releases |

---

## 18. Assumptions & Open Questions

**Assumptions**
- The first release targets one region (suggested: US or your home country) and English.
- Learners have a smartphone or tablet with a modern browser.
- Families are willing to run a 5-minute drill when the organiser sends it.

**Open questions**
1. Which country/region should the first scenario pack target?
2. Final product name and domain (check for conflicts).
3. Is a spoken-audio call experience in the MVP, or after launch?
4. Open-source from day one, or after the MVP?
5. Is cookie-less analytics acceptable, or none at all?

---

## 19. Glossary

- **Drill:** a single guided scenario played in the app.
- **Organiser:** person who creates and sends a drill link.
- **Learner:** person who plays the drill.
- **Habit (P·V·T):** Pause, Verify (independently), Tell (someone you trust).
- **Red flag:** a warning sign inside a scenario message.
- **Region pack:** scenarios and reporting resources for one country.

---

## 20. Sources

- **[S1]** AARP, "FBI/FTC 2025 report": https://www.aarp.org/money/scams-fraud/fbi-ftc-report-2025-losses ; HousingWire, "FBI seniors cybercrime 2025": https://www.housingwire.com/articles/fbi-seniors-cybercrime-2025/
- **[S2]** Competitors: SATA (TSS Foundation): https://www.gofundme.com/f/support-tss-foundations-lifechanging-work ; DART/Deepcover: https://www.senylrc.org/event/dart-workshop ; Mailbox: https://scameducation.itch.io/mailbox ; Scamnopoly: https://doorsopen.wp.st-andrews.ac.uk/?p=1172 ; IFEC: https://www.ifec.org.hk/web/en/other-resources/programmes/anti-scam-programme-for-seniors.page ; SDOC paper: https://www.nortonlifelock.com/content/dam/nortonlifelock/pdfs/research-papers/2020-research-papers/Training%20Older%20Adults%20to%20Resist%20Scams%20with%20Fraud%20Bingo%20and%20Scam%20Detection%20Challenges.pdf
- **[S3]** Trust Onion: https://cybermagazine.com/globenewswire/3356048 ; FRAUTH: https://hunted.space/dashboard/frauth/launches/frauth
- **[S4]** Free hosting: https://appwrite.io/blog/post/best-free-hosting-platforms-you-probably-havent-tried-in-2026 ; https://pandastack.io/blog/best-side-project-hosting-2026
- **[S5]** Next.js support policy: https://endoflife.ai/article-nextjs-15-eol ; https://versionlog.com/nextjs/