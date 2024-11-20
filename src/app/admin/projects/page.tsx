'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useProjects } from '../../contexts/ProjectContext'
import Loader from '@/components/ui/Loader'

export default function ManageProjects() {
    const { data: session, status } = useSession()
    const { projects, refreshProjects } = useProjects()

    if (status === 'loading') {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <Loader />  {/* Your loader component */}
          </div>
        )
      }
    


    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/projects?id=${id}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            await refreshProjects()
        }
    }


    if (!session) {
        return <div>Access Denied</div>
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bebas-neue text-white mb-8">Manage Projects</h1>
                <div className="mb-6 space-x-4">
                    <Link href="/admin/add-project" className="bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300">
                        Add New Project
                    </Link>
                    <Link href="/admin/reorder-projects" className="bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300">
                        Reorder Projects
                    </Link>
                </div>
                <div className="space-y-8">
                    {[...projects].reverse().map(project => (
                        <div key={project._id} className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-manrope text-white mb-2">{project.title}</h2>
                            <p className="text-[#C7C7C7] mb-4">{project.description}</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-[#C7C7C7] mr-4">Year: {project.year}</span>
                                    <span className="text-[#C7C7C7]">Role: {project.role}</span>
                                </div>
                                <div>
                                    <button onClick={() => handleDelete(project._id)} className="bg-red-500 text-white font-manrope font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300">
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