---
name: humanize
description: ---
  Rewrites AI-generated or overly formal academic/technical text into a more natural, human-sounding style — while keeping all technical meaning exact. Use this skill whenever the user asks to "humanize", "make it sound more natural", "reduce AI tone", "make it sound like a real person wrote this", "vary sentence structure", or "add reasoning behind decisions" in any piece of writing. Applies especially to academic reports, project documentation, technical essays, research writeups, and B.Tech/M.Tech project reports. Also triggers when the user says the writing "sounds too polished", "feels like ChatGPT wrote it", or asks to "inject trade-offs and reasoning". Always use this skill proactively when you detect overly uniform sentence lengths, excessive nominalization, or absence of authorial reasoning in a block of text the user shares.
---
 
# Humanize Skill
 
Transforms AI-generated or overly formal writing into text that reads like a real person — a knowledgeable engineer or researcher who is being clear and direct, not performatively academic.
 
---
 
## Core Philosophy
 
The goal is NOT to make text informal or casual. Academic register is preserved. The goal is to make it sound like an actual human being with opinions, constraints, and experience wrote it — not a language model optimizing for maximum formality and completeness.
 
Key signals of over-polished AI writing (what to fix):
- Every sentence is roughly the same length
- No sentence ever starts with "But", "So", "This meant that", "In practice"
- Zero mention of WHY a decision was made
- Zero acknowledgment of trade-offs, alternatives, or limitations
- Every verb is passive voice
- Paragraph transitions are always smooth and formulaic ("Furthermore...", "In addition...")
- No paragraph ever admits uncertainty or makes a judgment call visible
---
 
## Transformation Rules
 
Apply ALL of the following in every rewrite pass.
 
### 1. Sentence Length Variation
- Vary sentence length deliberately. Short sentences (5–10 words) for key claims. Longer ones (25–40 words) for explanation and reasoning.
- Break one long sentence into two when the second half is a consequence or contrast.
- Combine two short staccato sentences when they belong to the same thought.
### 2. Inject Authorial Reasoning
For every 2–3 paragraphs, add at least one sentence that explains WHY a decision was made. Use starters like:
- "This approach was chosen because…"
- "The reason for this was…"
- "This was preferred over [alternative] because…"
- "In retrospect, this decision…"
### 3. Add Constraint and Trade-off Language
Acknowledge real-world limitations. Use starters like:
- "One limitation here is…"
- "This worked well, though it meant that…"
- "In practice, this caused…"
- "A side effect of this was…"
- "This isn't perfect — …"
### 4. Reduce Nominalization
Convert noun-heavy constructions back to verb-centric ones.
- "The implementation of authentication was carried out via…" → "Authentication was implemented using…"
- "The utilization of JSONB data types enables…" → "JSONB is used because it lets…"
### 5. Vary Paragraph Openings
Break the pattern of every paragraph starting with a topic sentence that introduces what follows. Sometimes:
- Start with a consequence: "The result of this is…"
- Start with an observation: "What this means in practice is…"
- Start mid-thought after a short setup: "Consider the Edge Function. It runs on Deno — not Node — which matters because…"
### 6. Selective Bullet Conversion
When a paragraph is listing properties or steps, convert to brief bullets ONLY if there are 3 or more distinct items. Do not overuse bullets — maximum one bullet list per 4 paragraphs.
 
Format bullets as terse fragments (not full sentences):
- Preferred: `- validates the JWT and rejects unauthenticated requests`
- Avoid: `- The system validates the JWT token and rejects any unauthenticated request with a 401 response`
### 7. Strategic Paragraph Splitting
Split a paragraph only if:
- It covers two genuinely distinct sub-topics, OR
- It exceeds ~120 words and the second half can stand independently
Do NOT split just to hit a word count or paragraph count. Resist the instinct to always split into exactly 2–3. Sometimes 1 good paragraph beats 3 thin ones.
 
### 8. Reduce Formula Transitions
Replace robotic connectors:
- "Furthermore" → "Beyond this", "And", start a new sentence
- "In addition" → "Also worth noting is…", or just drop it and let logic carry
- "Moreover" → cut it; restructure if needed
- "It is important to note that" → delete entirely; if it's important, state it plainly
### 9. Allow Occasional First-Person (if context is a team report)
If the source text uses "we" or "our", maintain it and allow light first-person reasoning:
- "We chose Zustand over Context API here — mainly because…"
- "This is where we ran into a practical issue."
If the source is third-person only, stay third-person.
 
### 10. Preserve Technical Precision
- Do NOT change any: model names, version numbers, API endpoint paths, table names, field names, metric values, or technical terminology.
- Do NOT introduce any technical claim that wasn't in the original.
- Do NOT remove any technical detail the original contained.
- When simplifying language, verify the simplified version says the same thing.
---
 
## Process — Step by Step
 
When given text to humanize:
 
**Step 1 — Scan**
Read the full input. Note: sentence length distribution, passive voice density, presence/absence of reasoning sentences, paragraph opening variety, and nominalization count.
 
**Step 2 — Plan**
Mentally mark:
- Which paragraphs need splitting (only if genuinely required)
- Where to inject reasoning sentences (at least one per 2–3 paragraphs)
- Where to inject trade-off/constraint acknowledgment (at least one per section)
- Which transitions to replace
- Which nominalizations to convert
**Step 3 — Rewrite**
Apply all transformation rules. Aim for a 20–30% reduction in average sentence length variance from the original (meaning: if all sentences were 30–35 words, the rewrite should have a mix of 8-word and 38-word sentences, not uniform 22-word ones).
 
**Step 4 — Verify**
Before outputting, check:
- [ ] Every technical term, number, and claim preserved
- [ ] At least one reasoning sentence added per 2–3 paragraphs
- [ ] At least one trade-off/constraint phrase present per section
- [ ] No two consecutive paragraphs open the same way
- [ ] No "Furthermore", "Moreover", "It is important to note" remaining
- [ ] Sentence lengths visibly vary
**Step 5 — Output**
Return ONLY the rewritten text. No preamble like "Here is the rewritten version". No commentary after. If the user passed a section heading, preserve it above the rewritten content.
 
---
 
## Tone Calibration
 
The target voice is: **a senior engineering student writing a genuine project report** — someone who knows what they're talking about, made real decisions with real constraints, and is explaining it clearly without hiding behind passive constructions or inflated vocabulary.
 
NOT: a corporate press release  
NOT: a medical disclaimer  
NOT: a Wikipedia article written by committee  
YES: a thoughtful person explaining what they built and why
 
---
 
## Example Transformation
 
### Input (AI-generated academic):
> The authentication module was implemented utilizing Google OAuth 2.0 as the identity provider, leveraging the Supabase Auth service for session management. The decision to implement OAuth-based authentication eliminates the necessity for managing password hashing, salt generation, and credential storage, which are security-sensitive operations that introduce significant risk when handled at the application layer.
 
### Output (humanized):
> Authentication runs through Google OAuth 2.0, with Supabase Auth handling session management. This approach was chosen deliberately — implementing password-based auth from scratch means managing hashing, salts, and credential storage, all of which are easy to get wrong and carry real security risk. Offloading that to a proven provider made more sense given the project's scope. One practical consequence is that the platform is limited to users with Google accounts, which is a trade-off worth acknowledging.
 
---
 
## Scope
 
This skill applies to:
- Academic project reports (B.Tech, M.Tech, MBA)
- Technical documentation
- Research paper sections
- System design documents
- README files that need a human voice
- Any text the user describes as "too AI-sounding"
It does NOT:
- Change the technical claims or data
- Convert academic writing to casual/colloquial writing
- Add humor, metaphors, or creative flourishes (unless specifically asked)
- Shorten content dramatically — length should stay within ~15% of original
---

<!-- Tip: Use /create-skill in chat to generate content with agent assistance -->

Define the functionality provided by this skill, including detailed instructions and examples