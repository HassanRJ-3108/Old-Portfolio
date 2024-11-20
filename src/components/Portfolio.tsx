'use client'

import React from 'react'
import PortfolioCard from './portfolioCard'
import Link from 'next/link'
import { useProjects } from '@/app/contexts/ProjectContext'
import PortfolioCardSkeleton from './ui/PortfolioCardSkeleton'

const Portfolio = () => {
    const { projects } = useProjects()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (projects.length > 0) {
            setLoading(false)
        }
    }, [projects])

    return (
        <div className='flex justify-center items-center my-14 md:my-15'>
            <div className='flex flex-col lg:flex-row lg:justify-center items-center lg:mx-20 max-w-7xl p-5 gap-5 lg:gap-16'>
                <div className='w-full'>
                    <div>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bebas-neue ml-0'>FEATURE PROJECTS</h1>
                        <p className='text-lg lg:text-xl font-manrope text-left text-[#C7C7C7] mt-3'>A passionate student of Information Technology, I am currently focusing on Cloud Computing, Generative AI, and Web 3.0 technologies. I am also a Full Stack Developer at the Governor House in Karachi, where I am gaining valuable experience and applying my skills in real-world projects.</p>
                    </div>
                    <div className='mt-14 md:mt-15 flex gap-32 flex-col'>
                        {loading ? (
                            // Show skeletons while loading
                            <>
                                <PortfolioCardSkeleton />
                                <PortfolioCardSkeleton />
                                <PortfolioCardSkeleton />
                            </>
                        ) : (
                            [...projects].reverse().slice(0, 3).map(project => (
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
                    <div className='mt-10 text-center'>
                        <Link href="/projects" className='bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300'>
                            Explore more projects
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio