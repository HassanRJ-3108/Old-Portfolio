'use client'

import React, { useEffect, useState } from 'react'
import CapabilitiesSkeleton from './ui/CapabilitiesSkeleton'

interface Skill {
    _id: string;
    name: string;
}

function Capabilities() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('/api/skills')
            .then(response => response.json())
            .then(data => {
                setSkills(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <CapabilitiesSkeleton />
    }

    return (
        <div className='flex justify-center items-center my-14 md:my-15'>
            <div className='flex flex-col lg:flex-row lg:justify-between max-w-7xl p-5 gap-5 lg:gap-10 w-full'>
                <div className='w-full lg:w-1/2'>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl font-bebas-neue lg:ml-10'>MY CAPABILITIES</h1>
                </div>
                <div className='w-full flex flex-col lg:w-1/2'>
                    <p className='text-lg lg:text-xl font-manrope text-left text-[#C7C7C7] mt-3'>
                        Proficient in HTML, CSS, JavaScript, and Tailwind CSS, I have developed various dynamic projects. My hands-on experience includes participation in hackathons, enhancing my skills in frontend development and creative problem-solving.
                    </p>
                    <div className='mt-10 flex flex-wrap gap-5'>
                        {[...skills].reverse().map(skill => (
                            <span
                                key={skill._id}
                                className='border-2 border-[#484848] rounded-full px-10 py-3 font-manrope font-bold'>
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Capabilities