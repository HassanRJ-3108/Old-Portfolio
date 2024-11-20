'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const AddExperience = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [experience, setExperience] = useState({
        title: '',
        company: '',
        description: '',
        startDate: '',
        endDate: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setExperience({ ...experience, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch('/api/experiences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(experience),
        })
        if (response.ok) {
            router.push('/admin/experiences')
        } else {
            console.error('Failed to add experience')
        }
    }

    if (!session) {
        return <div>Access Denied</div>
    }

    return (
        <div className=" min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bebas-neue mb-6 text-white">Add New Experience</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Title</label>
                    <input type="text" id="title" name="title" value={experience.title} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="company" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Company</label>
                    <input type="text" id="company" name="company" value={experience.company} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Description</label>
                    <textarea id="description" name="description" value={experience.description} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" rows={4}></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Start Date</label>
                    <input type="date" id="startDate" name="startDate" value={experience.startDate} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-manrope text-[#C7C7C7] mb-2">End Date</label>
                    <input type="date" id="endDate" name="endDate" value={experience.endDate} onChange={handleChange} className="w-full p-2 bg-[#333333] text-white rounded" />
                </div>
                <button type="submit" className="w-full bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300">
                    Add Experience
                </button>
            </form>
        </div>
    )
}

export default AddExperience