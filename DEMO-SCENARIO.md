# Demo Scenario - AI Ideas Ranking Tool

This document provides a step-by-step walkthrough to demonstrate all key features of the application.

## Prerequisites

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scenario 1: Quick Test with Manual Entry (5 minutes)

**Goal:** Test the complete workflow with a single manually entered idea.

### Step 1: Set Constraints
- Budget: **$50,000**
- Team Size: **3**

### Step 2: Add Idea Manually
Click on **"Manual Entry"** tab and fill in:

- **Title**: `AI Chatbot for Customer Support`
- **Description**: `Deploy an intelligent chatbot to handle common customer inquiries, reduce support ticket volume by 40%, and provide 24/7 availability`
- **Impact**: `7` (High business value)
- **Effort**: `5` (Medium development effort)
- **Risk**: `3` (Low technical risk)
- **Data Readiness**: `8` (Good data availability)

### Step 3: Rank Ideas
Click **"Rank Ideas"** button.

**Expected Result:**
- Score: ~**66.7** (normalized)
- Rank: **#1**
- Quadrant: **"Quick Wins"** (High impact, Low-Medium effort)

### Step 4: Generate Plan
Click **"Generate 30-60-90 Plans"**.

**Expected Output:**
- **30 days**: Environment setup, data validation, MVP chatbot
- **60 days**: Feature development, integration, testing
- **90 days**: Production deployment, documentation, Go/No-Go decision
- **Resources**: ~2-3 people, ~$18,000-25,000

### Step 5: Generate Experiment Card
Click **"Generate Experiment Card"**.

**Expected Sections:**
- **Problem Statement**: Context and business impact
- **Hypothesis**: Expected improvements with confidence level
- **Dataset**: Assessment of data readiness (in this case: "High-quality datasets available")
- **Success Metrics**: Technical and business KPIs
- **Go/No-Go Criteria**: Specific checkpoints at Day 30, 60, 90 with decision thresholds
- **Best Practices**: Cited tips from Playbook with `💡` icon and category references

### Step 6: Print/Export
Click **"🖨️ Print"** button to export the Experiment Card.

---

## Scenario 2: Bulk Upload with Sample Data (10 minutes)

**Goal:** Demonstrate ranking of multiple ideas and selection of top picks.

### Step 1: Set Constraints
- Budget: **$75,000**
- Team Size: **4**

### Step 2: Upload Sample Ideas

**Quick Method (Recommended):**
1. Click on **"JSON Upload"** tab
2. Click **"📋 Load Sample Data (12 ideas)"** button
3. Ideas loaded automatically!

**Manual Method:**
1. Click on **"JSON Upload"** tab
2. Open file: `public/sample-ideas.json`
3. Copy entire content (12 AI/ML ideas)
4. Paste into textarea
5. Click **"Import JSON"**

### Step 3: Review Imported Ideas
You should see 12 ideas loaded, including:
- AI-Powered Customer Segmentation
- Intelligent Document Processing
- Predictive Maintenance System
- Chatbot for Customer Support
- Fraud Detection System
- And 7 more...

### Step 4: Rank Ideas
Click **"Rank Ideas"**.

**Expected Results:**
- **Top Pick #1**: Likely "Intelligent Document Processing" or "Chatbot for Customer Support" (high impact, medium effort, low risk)
- **Top Pick #2-3**: Other high-scoring ideas
- **Total Ideas**: 12 ranked
- **Top Picks**: 3 ideas (top 20%)

**Observe the Ranking Table:**
- Ideas sorted by score (highest first)
- Top picks highlighted with blue background
- Quadrant classification for each idea
- All metrics visible (Impact, Effort, Risk, Data Readiness)

### Step 5: Generate Plans for Top Ideas
Click **"Generate 30-60-90 Plans"**.

**Expected Output:**
- Plans generated for all 3 top picks
- Each plan tailored to the idea's characteristics:
  - **High-risk ideas**: Include risk mitigation steps in first 30 days
  - **Low data readiness**: More time allocated to data preparation
  - **High-effort ideas**: Phased approach with milestones
- Resource estimates adjusted to budget and team size

### Step 6: Generate Experiment Card
Click **"Generate Experiment Card"**.

**Key Feature to Verify:**
The card is generated **only for the #1 ranked idea**, not all top picks.

**Examine Best Practices Section:**
Practices should be **cited from specific Playbook sections**:
- `💡 Playbook (Risk Management): ...`
- `💡 Playbook (Data Readiness): ...`
- `💡 Playbook (Impact Optimization): ...`
- `⚠️ Playbook (Common Pitfalls): ...`

**Examine Go/No-Go Criteria:**
Should include **specific timelines**:
- "Day 30: Core functionality demonstrated..."
- "Day 60: No critical blockers..."
- "Day 90: Positive ROI projection..."

---

## Scenario 3: Edge Cases (5 minutes)

**Goal:** Test how the tool handles challenging scenarios.

### Test Case A: High-Risk, Low Data Readiness Idea

Manually create:
- **Title**: `Advanced Fraud Detection with Deep Learning`
- **Impact**: `9`
- **Effort**: `8`
- **Risk**: `8`
- **Data Readiness**: `3`

**Expected Behavior:**
- Ranked highly due to impact, but...
- **Plan (30 days)** should emphasize:
  - Data collection strategy
  - Risk mitigation
  - Proof-of-concept for highest-risk components
- **Experiment Card** should include:
  - Playbook tips for "High Risk Ideas"
  - Playbook tips for "Low Data Readiness"
  - Go/No-Go with stricter criteria (Day 30 data pipeline checkpoint)

### Test Case B: Low-Impact, Low-Effort Idea

- **Title**: `Simple Email Template Optimizer`
- **Impact**: `4`
- **Effort**: `2`
- **Risk**: `2`
- **Data Readiness**: `9`

**Expected Behavior:**
- Classified as **"Fill-Ins"** quadrant
- Lower ranking despite easy implementation
- Plan focused on quick delivery
- Go/No-Go criteria with lower success threshold (60% instead of 80%)

---

## Key Features to Highlight

### 1. Intelligent Ranking Algorithm
- Weighted formula: `(Impact × 0.4) - (Effort × 0.3) - (Risk × 0.2) + (DataReadiness × 0.1)`
- Normalized to 0-100 scale
- Balanced approach prioritizing business value

### 2. Adaptive Planning
Plans automatically adjust based on:
- **High Risk** → Includes feasibility study and proof-of-concept phases
- **Low Data Readiness** → Allocates 40-50% time to data preparation
- **High Effort** → Breaks down into smaller milestones with checkpoints

### 3. Contextual Best Practices
Playbook integration is **smart**, not generic:
- Tips are filtered based on idea characteristics
- Explicit citations show which section each tip comes from
- Combines category-specific and general advice

### 4. Actionable Go/No-Go Criteria
Not just theory, but **specific checkpoints**:
- Timeline-based (Day 30/60/90)
- Metric-based (percentage thresholds)
- Decision-based (GO/PIVOT/NO-GO with clear conditions)

### 5. Print-Ready Output
Experiment Card designed for stakeholder presentations:
- Clean layout
- All critical information on one page
- Print button removes UI chrome

---

## Validation Checklist

Use this checklist to verify all requirements from the technical specification:

- [ ] Upload list of PoC ideas (both manual and JSON)
- [ ] Set simple constraints (budget, team)
- [ ] Score and rank ideas (impact vs effort/risk/data readiness)
- [ ] Produce top picks with resource/cost estimates
- [ ] Generate clean 30-60-90 day plan
- [ ] Generate ONE Experiment Card for top idea
- [ ] Best-practice tips cited directly from playbook
- [ ] Rapid-prototyping approach (simple, functional, no over-engineering)

---

## Common Questions

**Q: Why only one Experiment Card?**  
A: Per the specification: *"plus one 'Experiment Card'"* — the tool focuses on the #1 ranked idea to maintain clarity and actionability.

**Q: Can I modify ranking weights?**  
A: Yes, edit `src/lib/ranking-engine.ts` — weights are configurable constants.

**Q: Where do best practices come from?**  
A: From `src/data/playbook.md` — you can customize this file for your organization.

**Q: Does the tool use AI/LLM?**  
A: No. It uses rule-based logic for predictability and speed. The architecture supports LLM integration as a future enhancement (see README).

---

## Troubleshooting

**Issue:** App doesn't start  
**Solution:** Run `npm install` and ensure Node.js v18+ is installed

**Issue:** JSON import fails  
**Solution:** Verify JSON format matches the schema (see `public/sample-ideas.json` as reference)

**Issue:** Plans look identical  
**Solution:** Check that ideas have varied metrics (Impact, Effort, Risk, Data Readiness) — the generator adapts based on these values

---

## Next Steps After Demo

1. **Customize Playbook**: Edit `src/data/playbook.md` with organization-specific practices
2. **Adjust Weights**: Modify `src/lib/ranking-engine.ts` to emphasize different factors
3. **Extend Plans**: Edit templates in `src/lib/plan-generator.ts` for domain-specific tasks
4. **Deploy**: Ready for Vercel/Netlify deployment with zero configuration

---

## Feedback Welcome

This is a rapid prototype designed to demonstrate the core concept. Feedback on ranking logic, plan structure, or UI/UX is appreciated.

