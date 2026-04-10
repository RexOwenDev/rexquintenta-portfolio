export type ProjectStatus =
  | 'live'
  | 'production'
  | 'demo'
  | 'open-source'
  | 'coming-soon';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}
