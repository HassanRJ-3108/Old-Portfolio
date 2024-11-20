'use client'

import React from 'react'
import PortfolioCard from '../../components/portfolioCard'
import { useProjects } from '../contexts/ProjectContext'
import PortfolioCardSkeleton from '@/components/ui/PortfolioCardSkeleton'
import Contact from '@/components/Contact'

export default function Projects() {
    const { projects } = useProjects()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (projects.length > 0) {
            setLoading(false)
        }
    }, [projects])

    return (
        <>
            <div className='flex justify-center items-center my-14 md:my-15'>
                <div className='w-full max-w-7xl p-5'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bebas-neue ml-0 mb-10'>ALL PROJECTS</h1>
                    <div className='mt-14 md:mt-15 flex flex-col gap-32'>
                        {loading ? (
                            // Display multiple skeletons while loading
                            Array(3).fill(null).map((_, index) => (
                                <PortfolioCardSkeleton key={index} />
                            ))
                        ) : (
                            [...projects].reverse().map(project => (
                                <PortfolioCard
                                    key={project._id}
                                    title={project.title}
                                    desc={project.description}
                                    source={project.imageUrl}
                                    demo={project.demoUrl}
                                    githubLink={project.githubUrl}
                                />
                            ))
                        )}
                    </div>
                </div>

            </div>
            <div id="contact-section">
                <Contact />
            </div>
        </>

    )
}