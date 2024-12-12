import { Metadata } from 'next'
import ProjectsList from '@/components/ProjectsList'

export const metadata: Metadata = {
  title: 'HassanRJ - Projects',
  description: 'Explore my projects showcasing my skills in full stack development and AI integration.',
  keywords: 'Hassan, HassanRJ, Hassanrj projects, full stack developer, AI projects, web development, portfolio projects',
  robots: 'index, follow',
  authors: [{ name: 'HassanRJ' }],
}

export default function Projects() {
  return <ProjectsList />
}

