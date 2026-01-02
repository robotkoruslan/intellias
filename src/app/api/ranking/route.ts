import { NextRequest, NextResponse } from 'next/server';
import { rankIdeas, validateIdea } from '@/lib/ranking-engine';
import { Idea } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ideas } = body;

    if (!ideas || !Array.isArray(ideas)) {
      return NextResponse.json({ error: 'Invalid input: ideas array is required' }, { status: 400 });
    }

    if (ideas.length === 0) {
      return NextResponse.json({ error: 'At least one idea is required' }, { status: 400 });
    }

    const validationErrors: Record<string, string[]> = {};
    ideas.forEach((idea: Partial<Idea>, index: number) => {
      const validation = validateIdea(idea);
      if (!validation.valid) {
        validationErrors[`idea_${index}`] = validation.errors;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: validationErrors }, { status: 400 });
    }

    const ideasWithIds = ideas.map((idea: Idea, index: number) => ({
      ...idea,
      id: idea.id || `idea_${Date.now()}_${index}`,
    }));

    const result = rankIdeas(ideasWithIds);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in ranking API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
