import { PlaybookSection, Idea } from '@/types';
import fs from 'fs';
import path from 'path';

export function parsePlaybook(): PlaybookSection[] {
  const playbookPath = path.join(process.cwd(), 'src', 'data', 'playbook.md');
  const content = fs.readFileSync(playbookPath, 'utf-8');

  const sections: PlaybookSection[] = [];
  const lines = content.split('\n');

  let currentCategory = '';
  let currentSection = '';
  let currentTips: string[] = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentSection && currentTips.length > 0) {
        sections.push({
          title: currentSection,
          category: currentCategory,
          tips: currentTips,
        });
      }

      currentCategory = line.replace('## ', '').trim();
      currentSection = '';
      currentTips = [];
    } else if (line.startsWith('### ')) {
      if (currentSection && currentTips.length > 0) {
        sections.push({
          title: currentSection,
          category: currentCategory,
          tips: currentTips,
        });
      }

      currentSection = line.replace('### ', '').trim();
      currentTips = [];
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const tip = line.replace(/^[-*] /, '').trim();
      if (tip) {
        currentTips.push(tip);
      }
    }
  }

  if (currentSection && currentTips.length > 0) {
    sections.push({
      title: currentSection,
      category: currentCategory,
      tips: currentTips,
    });
  }

  return sections;
}

export function getRelevantPractices(idea: Idea): string[] {
  const sections = parsePlaybook();
  const relevantTips: string[] = [];

  // Determine which sections are relevant
  const relevantSections: string[] = [];

  // Risk-based
  if (idea.risk >= 7) {
    relevantSections.push('High Risk Ideas');
  } else if (idea.risk >= 4) {
    relevantSections.push('Medium Risk Ideas');
  } else {
    relevantSections.push('Low Risk Ideas');
  }

  // Data readiness
  if (idea.dataReadiness < 4) {
    relevantSections.push('Low Data Readiness');
  } else if (idea.dataReadiness >= 7) {
    relevantSections.push('High Data Readiness');
  } else {
    relevantSections.push('Medium Data Readiness');
  }

  // Impact
  if (idea.impact >= 7) {
    relevantSections.push('High Impact Ideas');
  } else if (idea.impact >= 4) {
    relevantSections.push('Medium Impact Ideas');
  }

  // Effort
  if (idea.effort >= 7) {
    relevantSections.push('High Effort Ideas');
  } else {
    relevantSections.push('Low-Medium Effort Ideas');
  }

  for (const section of sections) {
    const matchesAnySection = relevantSections.some(relevantSection => section.title.startsWith(relevantSection));

    if (matchesAnySection) {
      // Add tips with citation prefix
      const tipsWithCitation = section.tips.map(tip => `💡 Playbook (${section.category}): ${tip}`);
      relevantTips.push(...tipsWithCitation);
    }
  }

  // Also add general best practices
  const generalSection = sections.find(s => s.category === 'Common Pitfalls to Avoid');
  if (generalSection) {
    const pitfallsWithCitation = generalSection.tips.slice(0, 3).map(tip => `⚠️ Playbook (Common Pitfalls): ${tip}`);
    relevantTips.push(...pitfallsWithCitation);
  }

  return relevantTips;
}

export function getPlaybookSection(category: string, title?: string): PlaybookSection[] {
  const sections = parsePlaybook();

  return sections.filter(section => {
    const categoryMatch = section.category.toLowerCase().includes(category.toLowerCase());
    const titleMatch = title ? section.title.toLowerCase().includes(title.toLowerCase()) : true;
    return categoryMatch && titleMatch;
  });
}
