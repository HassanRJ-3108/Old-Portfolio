'use client'

import React, { useEffect, useState } from 'react'
import ExperienceSkeleton from './ui/ExperienceSkeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Experience {
    _id: string;
    title: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string;
}

const Experience = () => {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAll, setShowAll] = useState<boolean>(false)

    useEffect(() => {
        fetch('/api/experiences')
            .then(response => response.json())
            .then(data => {
                setExperiences(data)  // Reverse the array here
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <ExperienceSkeleton />
    }

    const visibleExperiences = showAll ? experiences : experiences.slice(0, 2)

    return (
        <div className='flex justify-center items-center my-14 md:my-15'>
            <div className='flex flex-col lg:flex-row lg:justify-between max-w-7xl p-5 gap-5 lg:gap-10 w-full'>
                <div className='w-full lg:w-1/2'>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl font-bebas-neue lg:ml-10'>MY EXPERIENCE</h1>
                </div>
                <div className='w-full flex flex-col lg:w-1/2'>
                    <AnimatePresence>
                        {visibleExperiences.map((experience, index) => (
                            <motion.div
                                key={experience._id}
                                initial={showAll ? { opacity: 0, y: 20 } : undefined}
                                animate={{ opacity: 1, y: 0 }}
                                exit={showAll ? { opacity: 0, y: -20 } : undefined}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="mb-10"
                            >
                                <div className='md:flex justify-between items-center'>
                                    <h2 className='font-manrope font-medium text-xl'>{experience.title}</h2>
                                    <p className='font-manrope text-[#C7C7C7] mt-1 md:mt-0'>{experience.startDate} — {experience.endDate}</p>
                                </div>
                                <p className='font-manrope text-[#D3E97A] mt-1 md:mt-2'>{experience.company}</p>
                                <p className='text-lg lg:text-xl font-manrope text-left text-[#C7C7C7] mt-5'>{experience.description}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {experiences.length > 2 && (
                        <motion.div
                            layout
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 text-center"
                        >
                            <Button
                                onClick={() => setShowAll(!showAll)}
                                variant="outline"
                                className="bg-[#D3E97A] text-black hover:bg-[#C3D96A] transition-colors duration-300"
                            >
                                {showAll ? (
                                    <>
                                        Show Less <ChevronUp className="ml-2 h-4 w-4" />
                                    </>
                                ) : (
                                    <>
                                        Show More <ChevronDown className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Experience
