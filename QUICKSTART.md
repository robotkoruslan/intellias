# Quick Start Guide

## 1. Start the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 2. Test with Sample Data

### Option A: Use Sample JSON File

1. Click on "JSON Upload" tab
2. Copy content from `public/sample-ideas.json`
3. Paste into the textarea
4. Click "Import JSON"
5. Click "Rank Ideas"

### Option B: Manual Entry (Quick Test)

Try this simple idea:

- **Title**: AI Chatbot for Support
- **Description**: 24/7 customer support automation
- **Impact**: 7
- **Effort**: 5
- **Risk**: 3
- **Data Readiness**: 8

## 3. Explore Features

### Step 1: Set Constraints

- Budget: $50,000
- Team Size: 3

### Step 2: Rank Ideas

After submitting ideas, you'll see:

- Overall statistics
- Top picks highlighted
- Full ranking table
- Impact/Effort quadrants

### Step 3: Generate Plans

Click "Generate 30-60-90 Plans" to see:

- Detailed task breakdowns by phase
- Resource allocation
- Key milestones
- Cost estimates

### Step 4: Create Experiment Card

Click "Generate Experiment Card" to see:

- Problem statement for top-ranked idea
- Hypothesis
- Dataset requirements
- Success metrics
- Go/No-Go criteria
- Best practices from playbook

## Sample Workflow

1. Start with constraints: Budget $75k, Team of 4
2. Upload sample-ideas.json (12 diverse AI/ML ideas)
3. Review rankings - see which ideas score highest
4. Generate plans for top 3 ideas
5. Create experiment card for the top-ranked idea
6. Use print function to export experiment card

## Expected Results

With the sample data, you should see:

- **Top Pick**: Intelligent Document Processing or Predictive Maintenance
- **Quick Wins**: Chatbot, Email Optimizer, Sentiment Analysis
- **Major Projects**: Fraud Detection, Predictive Maintenance
- **Avoid**: Ideas with high effort but low impact

## Tips

- Try different constraint values to see how plans adapt
- Compare how risk and data readiness affect recommendations
- Use experiment card for stakeholder presentations (print-friendly!)
- Modify playbook.md to customize best practices for your organization

## Next Steps

1. Customize ranking weights in `src/lib/ranking-engine.ts`
2. Add organization-specific best practices to `src/data/playbook.md`
3. Adjust plan templates in `src/lib/plan-generator.ts`
4. Deploy to Vercel or your preferred hosting platform
