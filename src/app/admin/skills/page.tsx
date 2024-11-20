// app/admin/skills/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Loader from '@/components/ui/Loader'  // Assuming you have a Loader component

interface Skill {
  _id: string;
  name: string;
}

export default function ManageSkills() {
    const { data: session, status } = useSession()  // Using status to check session loading
    const [skills, setSkills] = useState<Skill[]>([])
    const [newSkill, setNewSkill] = useState('')

    useEffect(() => {
        fetch('/api/skills')
            .then(response => response.json())
            .then(data => setSkills(data))
    }, [])

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch('/api/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newSkill }),
        })
        if (response.ok) {
            const skill = await response.json()
            setSkills([...skills, skill])
            setNewSkill('')
        }
    }

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/skills?id=${id}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            setSkills(skills.filter(skill => skill._id !== id))
        }
    }

    // Display loader while the session is loading
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
                <h1 className="text-4xl font-bebas-neue text-white mb-8">Manage Skills</h1>
                <form onSubmit={handleAddSkill} className="mb-8">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="New Skill"
                        className="p-2 bg-[#333333] text-white rounded mr-2"
                    />
                    <button type="submit" className="bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300">
                        Add Skill
                    </button>
                </form>
                <div className="space-y-4">
                    {[...skills].reverse().map(skill => (
                        <div key={skill._id} className="bg-[#2A2A2A] p-4 rounded-lg shadow-lg flex justify-between items-center">
                            <span className="text-white font-manrope">{skill.name}</span>
                            <button onClick={() => handleDelete(skill._id)} className="bg-red-500 text-white font-manrope font-bold py-1 px-3 rounded hover:bg-red-600 transition duration-300">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
