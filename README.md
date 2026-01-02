# AI Ideas Ranking Tool

A rapid-prototyping tool for R&D teams to rank AI/ML PoC ideas and automatically generate actionable 30-60-90 day implementation plans.

## Features

- **Idea Ranking**: Score and rank PoC ideas based on Impact, Effort, Risk, and Data Readiness
- **Constraint Management**: Set budget and team size constraints
- **Automated Planning**: Generate detailed 30-60-90 day plans for top ideas
- **Experiment Card**: Create one structured experiment card for the top-ranked idea with problem statement, hypothesis, dataset, success metrics, and Go/No-Go criteria
- **Best Practices Integration**: Automatically cite relevant best practices from the built-in playbook
- **Multiple Input Methods**: Manual entry or JSON upload for bulk idea submission
- **Export Ready**: Print-friendly experiment cards for stakeholder presentations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **API**: Next.js API Routes
- **Node**: v18+ recommended

## Project Structure

```
intellias/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── ranking/       # Idea ranking
│   │   │   ├── plan/          # Plan generation
│   │   │   └── experiment-card/ # Experiment card generation
│   │   ├── page.tsx           # Main dashboard
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── constraints-form.tsx
│   │   ├── idea-upload.tsx
│   │   ├── ranking-results.tsx
│   │   ├── plan-viewer.tsx
│   │   └── experiment-card-viewer.tsx
│   ├── lib/                   # Business logic
│   │   ├── ranking-engine.ts
│   │   ├── plan-generator.ts
│   │   ├── experiment-card-generator.ts
│   │   └── playbook-parser.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── data/                  # Static data
│       └── playbook.md        # Best practices playbook
├── public/                    # Static assets
├── package.json
└── README.md
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Walkthrough

For a complete step-by-step demonstration of all features, see **[DEMO-SCENARIO.md](DEMO-SCENARIO.md)**.

This guide includes:

- Quick test scenarios (5-10 minutes)
- Sample data workflows
- Edge case testing
- Feature validation checklist

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Usage Guide

### 1. Set Constraints

Configure your project parameters:

- **Budget**: Total budget in USD
- **Team Size**: Number of available team members

### 2. Add PoC Ideas

Two methods available:

#### Manual Entry

- Fill in idea details one by one
- Set metrics using sliders (1-10 scale):
  - **Impact**: Business impact potential
  - **Effort**: Development effort required
  - **Risk**: Technical and business risk
  - **Data Readiness**: Data availability and quality

#### JSON Upload

Upload ideas in JSON format or load sample data:

**Option 1: Load Sample Data (Quick Start)**

- Click "📋 Load Sample Data" button to instantly load 12 example AI/ML ideas

**Option 2: Paste JSON**

```json
[
  {
    "title": "AI-powered Customer Segmentation",
    "description": "Use ML to automatically segment customers based on behavior patterns",
    "impact": 8,
    "effort": 6,
    "risk": 4,
    "dataReadiness": 7
  }
]
```

### 3. View Rankings

The system automatically:

- Calculates scores using weighted formula
- Ranks all ideas from highest to lowest score
- Identifies top picks (top 20% or minimum 3 ideas)
- Shows Impact/Effort quadrant for each idea

**Ranking Formula:**

```
Score = (Impact × 0.4) - (Effort × 0.3) - (Risk × 0.2) + (DataReadiness × 0.1)
```

### 4. Generate Plans

For top-ranked ideas, generate:

- **30-Day Plan**: Setup, data validation, MVP development
- **60-Day Plan**: Feature development, testing, integration
- **90-Day Plan**: Finalization, documentation, Go/No-Go decision
- **Resource Estimates**: Team size and budget allocation
- **Key Milestones**: Critical checkpoints at days 10, 30, 60, 90

### 5. Create Experiment Card

Generate a comprehensive experiment card for the top-ranked idea including:

- Problem statement and context
- Testable hypothesis
- Dataset requirements and readiness
- Success metrics (technical and business)
- Go/No-Go decision criteria with thresholds
- Relevant best practices from playbook

## Ranking Methodology

### Scoring Algorithm

Ideas are scored using a weighted formula that balances:

- **High Impact**: Prioritizes business value (40% weight)
- **Low Effort**: Favors quick wins (30% weight, negative)
- **Low Risk**: Reduces uncertainty (20% weight, negative)
- **High Data Readiness**: Values data availability (10% weight)

### Impact/Effort Matrix Quadrants

- **Quick Wins**: High impact, low effort (highest priority)
- **Major Projects**: High impact, high effort (strategic investments)
- **Fill-Ins**: Low impact, low effort (easy additions)
- **Time Sinks**: Low impact, high effort (avoid)

## Playbook Integration

The tool includes a comprehensive playbook (`src/data/playbook.md`) covering:

- Risk management strategies
- Data readiness assessment
- Impact optimization techniques
- Effort management approaches
- Team size recommendations
- Budget allocation best practices
- Timeline planning guidelines
- Common pitfalls to avoid

Best practices are automatically cited based on idea characteristics.

## API Reference

### POST /api/ranking

Rank a list of ideas.

**Request:**

```json
{
  "ideas": [
    {
      "title": "string",
      "description": "string",
      "impact": 1-10,
      "effort": 1-10,
      "risk": 1-10,
      "dataReadiness": 1-10
    }
  ]
}
```

**Response:**

```json
{
  "ideas": [...],
  "topPicks": [...],
  "timestamp": "ISO date"
}
```

### POST /api/plan

Generate 30-60-90 day plans.

**Request:**

```json
{
  "ideas": [...],
  "constraints": {
    "budget": number,
    "teamSize": number,
    "timeline": number
  }
}
```

**Response:**

```json
{
  "plans": [
    {
      "ideaId": "string",
      "ideaTitle": "string",
      "days30": [...],
      "days60": [...],
      "days90": [...],
      "resources": {...},
      "milestones": [...]
    }
  ]
}
```

### POST /api/experiment-card

Generate experiment card for a single idea (typically the top-ranked one).

**Request:**

```json
{
  "idea": {
    "id": "string",
    "title": "string",
    "description": "string",
    "impact": 1-10,
    "effort": 1-10,
    "risk": 1-10,
    "dataReadiness": 1-10
  }
}
```

**Response:**

```json
{
  "card": {
    "ideaId": "string",
    "ideaTitle": "string",
    "problem": "string",
    "hypothesis": "string",
    "dataset": "string",
    "metrics": [...],
    "goNoGo": {...},
    "bestPractices": [...]
  }
}
```

## Customization

### Modify Ranking Weights

Edit `src/lib/ranking-engine.ts`:

```typescript
const DEFAULT_WEIGHTS: RankingWeights = {
  impact: 0.4, // Increase for more impact focus
  effort: -0.3, // Decrease (more negative) to penalize effort more
  risk: -0.2, // Decrease (more negative) to penalize risk more
  dataReadiness: 0.1, // Increase to value data more
};
```

### Update Playbook

Edit `src/data/playbook.md` to add or modify best practices specific to your organization.

### Customize Plan Templates

Edit `src/lib/plan-generator.ts` to adjust task templates for 30-60-90 day plans.

## License

MIT
