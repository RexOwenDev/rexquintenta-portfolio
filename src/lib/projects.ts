import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'proposal-studio',
    title: 'Proposal Studio',
    tagline: 'AI-powered collaborative proposal editor',
    description:
      "Built for a design agency's sales team. Import any HTML → Claude structures it into a proposal → team edits with real-time presence, threaded comments, and emoji reactions.",
    status: 'live',
    stack: ['Next.js', 'Supabase', 'Claude API', 'Vercel AI SDK', 'TypeScript'],
    liveUrl: 'https://proposal-studio-mu.vercel.app',
    githubUrl: 'https://github.com/RexOwenDev/proposal-studio',
  },
  {
    id: 'cmca-pipeline',
    title: 'CMCA AI Content Pipeline',
    tagline: '5-phase AI content production system',
    description:
      'End-to-end n8n workflow for a marketing client. URL intake → web scraping → GPT-4o draft → Claude editorial review → Google Doc creation → WordPress publish → Gmail approval loop. 3-retry error handling across 6 sub-workflows.',
    status: 'production',
    stack: ['n8n', 'OpenAI', 'Claude API', 'WordPress', 'Google Workspace'],
    githubUrl: 'https://github.com/RexOwenDev/cmca-pipeline',
  },
  {
    id: 'rag-assistant',
    title: 'RAG Knowledge Assistant',
    tagline: 'Ask questions, get answers from your documents',
    description:
      'Upload PDFs or paste text → indexes into a vector database → chat interface powered by Claude. Demonstrates RAG architecture for enterprise knowledge management use cases.',
    status: 'coming-soon',
    stack: ['Python', 'LangChain', 'ChromaDB', 'Claude API', 'FastAPI', 'Next.js'],
    githubUrl: 'https://github.com/RexOwenDev/rag-assistant',
  },
  {
    id: 'multi-agent-kit',
    title: 'Multi-Agent AI Starter Kit',
    tagline: 'Production-ready CrewAI pattern with Claude',
    description:
      'Reusable 3-agent architecture: Coordinator dispatches tasks to Researcher and Writer agents. Claude API as the LLM backend. Documented with SOPs for enterprise deployment.',
    status: 'coming-soon',
    stack: ['Python', 'CrewAI', 'Claude API', 'mem0'],
    githubUrl: 'https://github.com/RexOwenDev/multi-agent-starter',
  },
];
