import { PlaybookSection, Idea } from '@/types';
import fs from 'fs';
import path from 'path';

/**
 * Parse the playbook markdown file into structured sections
 * 
 * @returns Array of playbook sections
 */
export function parsePlaybook(): PlaybookSection[] {
  const playbookPath = path.join(process.cwd(), 'src', 'data', 'playbook.md');
  const content = fs.readFileSync(playbookPath, 'utf-8');

  const sections: PlaybookSection[] = [];
  const lines = content.split('\n');

  let currentCategory = '';
  let currentSection = '';
  let currentTips: string[] = [];

  for (const line of lines) {
    // H2 headers are categories (## Risk Management)
    if (line.startsWith('## ')) {
      // Save previous section if exists
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
    }
    // H3 headers are sections (### High Risk Ideas)
    else if (line.startsWith('### ')) {
      // Save previous section if exists
      if (currentSection && currentTips.length > 0) {
        sections.push({
          title: currentSection,
          category: currentCategory,
          tips: currentTips,
        });
      }

      currentSection = line.replace('### ', '').trim();
      currentTips = [];
    }
    // List items are tips
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const tip = line.replace(/^[-*] /, '').trim();
      if (tip) {
        currentTips.push(tip);
      }
    }
  }

  // Save last section
  if (currentSection && currentTips.length > 0) {
    sections.push({
      title: currentSection,
      category: currentCategory,
      tips: currentTips,
    });
  }

  return sections;
}

/**
 * Get relevant best practices for an idea based on its metrics
 * 
 * @param idea - The idea to get practices for
 * @returns Array of relevant tips
 */
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

  // Collect tips from relevant sections
  for (const section of sections) {
    if (relevantSections.includes(section.title)) {
      relevantTips.push(...section.tips);
    }
  }

  // Also add general best practices
  const generalSection = sections.find(s => s.category === 'Common Pitfalls to Avoid');
  if (generalSection) {
    relevantTips.push(...generalSection.tips.slice(0, 3)); // Add top 3 pitfalls
  }

  return relevantTips;
}

/**
 * Get playbook section by category and title
 * 
 * @param category - Category name
 * @param title - Section title (optional)
 * @returns Array of matching sections
 */
export function getPlaybookSection(category: string, title?: string): PlaybookSection[] {
  const sections = parsePlaybook();
  
  return sections.filter(section => {
    const categoryMatch = section.category.toLowerCase().includes(category.toLowerCase());
    const titleMatch = title ? section.title.toLowerCase().includes(title.toLowerCase()) : true;
    return categoryMatch && titleMatch;
  });
}


