// app/admin/experiences/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Loader from '@/components/ui/Loader'  // Assuming you have a Loader component

interface Experience {
  _id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function ManageExperiences() {
    const { data: session, status } = useSession()  // Using status to check loading state
    const [experiences, setExperiences] = useState<Experience[]>([])

    useEffect(() => {
        fetch('/api/experiences')
            .then(response => response.json())
            .then(data => setExperiences(data))
    }, [])

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/experiences?id=${id}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            setExperiences(experiences.filter(exp => exp._id !== id))
        }
    }

    // Display loader while fetching session data
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />  {/* Assuming you have a Loader component */}
            </div>
        )
    }

    if (!session) {
        return <div>Access Denied</div>
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bebas-neue text-white mb-8">Manage Experiences</h1>
                <Link href="/admin/add-experience" className="bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300 mb-8 inline-block">
                    Add New Experience
                </Link>
                <div className="space-y-8">
                    {experiences.map(experience => (
                        <div key={experience._id} className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-manrope text-white mb-2">{experience.title}</h2>
                            <p className="text-[#C7C7C7] mb-2">{experience.company}</p>
                            <p className="text-[#C7C7C7] mb-4">{experience.description}</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-[#C7C7C7] mr-4">From: {experience.startDate}</span>
                                    <span className="text-[#C7C7C7]">To: {experience.endDate}</span>
                                </div>
                                <div>
                                    <button onClick={() => handleDelete(experience._id)} className="bg-red-500 text-white font-manrope font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
