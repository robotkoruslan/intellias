import { NextRequest, NextResponse } from 'next/server';
import { generateExperimentCard } from '@/lib/experiment-card-generator';
import { Idea } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idea } = body;

    if (!idea || typeof idea !== 'object') {
      return NextResponse.json({ error: 'Invalid input: idea object is required' }, { status: 400 });
    }

    const card = generateExperimentCard(idea as Idea);

    return NextResponse.json({ card });
  } catch (error) {
    console.error('Error in experiment card generation API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
