import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI & LLM',
    skills: [
      'Claude Code', 'Claude API', 'OpenAI GPT-4o', 'Gemini API',
      'CrewAI', 'RAG Pipelines', 'Prompt Engineering',
      'Multi-Agent Systems', 'mem0',
    ],
  },
  {
    label: 'Automation',
    skills: [
      'n8n (Production)', 'Make.com', 'Zapier',
      'Webhook Architecture', 'Event-Driven Workflows',
    ],
  },
  {
    label: 'Development',
    skills: [
      'Next.js', 'React', 'TypeScript', 'Python',
      'JavaScript', 'Supabase', 'PostgreSQL', 'REST APIs', 'OAuth2',
    ],
  },
  {
    label: 'Integrations',
    skills: [
      'HubSpot', 'Slack', 'Gmail', 'Google Workspace',
      'WordPress', 'Airtable', 'ClickUp', 'GitHub',
    ],
  },
];
