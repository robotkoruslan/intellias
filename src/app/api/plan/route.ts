import { NextRequest, NextResponse } from 'next/server';
import { generatePlans } from '@/lib/plan-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ideas, constraints } = body;

    // Validate input
    if (!ideas || !Array.isArray(ideas) || ideas.length === 0) {
      return NextResponse.json({ error: 'Invalid input: ideas array is required' }, { status: 400 });
    }

    if (!constraints) {
      return NextResponse.json({ error: 'Constraints are required' }, { status: 400 });
    }

    // Validate constraints
    if (typeof constraints.budget !== 'number' || typeof constraints.teamSize !== 'number') {
      return NextResponse.json({ error: 'Invalid constraints: budget and teamSize must be numbers' }, { status: 400 });
    }

    // Generate plans
    const plans = generatePlans(ideas, constraints);

    return NextResponse.json({ plans });
  } catch (error) {
    console.error('Error in plan generation API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
