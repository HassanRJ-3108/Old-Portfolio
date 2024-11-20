'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const AddProject = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [project, setProject] = useState({
        title: '',
        description: '',
        imageUrl: '',
        demoUrl: '',
        githubUrl: '',
        year: new Date().getFullYear().toString(),
        role: ''
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageInputType, setImageInputType] = useState<'url' | 'file'>('url')
    const [isPrivate, setIsPrivate] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProject(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0])
            setProject(prev => ({ ...prev, imageUrl: '' }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', project.title)
        formData.append('description', project.description)
        formData.append('demoUrl', project.demoUrl)
        formData.append('year', project.year)
        formData.append('role', project.role)

        if (imageInputType === 'file' && imageFile) {
            formData.append('image', imageFile)
        } else {
            formData.append('imageUrl', project.imageUrl)
        }

        if (!isPrivate && project.githubUrl) {
            formData.append('githubUrl', project.githubUrl)
        }

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                router.push('/admin/projects')
            } else {
                const errorData = await response.json()
                console.error('Failed to add project:', errorData)
                alert(`Failed to add project: ${errorData.error}. Details: ${errorData.details}`)
            }
        } catch (error: any) {
            console.error('Error submitting project:', error)
            alert(`Error submitting project: ${error.message}`)
        }
    }

    if (!session) {
        return <div>Access Denied</div>
    }

    return (
        <div className="bg-[#1A1A1A] min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bebas-neue mb-6 text-white">Add New Project</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Title</label>
                    <input type="text" id="title" name="title" value={project.title} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Description</label>
                    <textarea id="description" name="description" value={project.description} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" rows={4}></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="demoUrl" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Demo URL</label>
                    <input type="url" id="demoUrl" name="demoUrl" value={project.demoUrl} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Year</label>
                    <input type="number" id="year" name="year" value={project.year} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Your Role</label>
                    <input type="text" id="role" name="role" value={project.role} onChange={handleChange} required className="w-full p-2 bg-[#333333] text-white rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-manrope text-[#C7C7C7] mb-2">Project Image</label>
                    <select
                        value={imageInputType}
                        onChange={(e) => setImageInputType(e.target.value as 'url' | 'file')}
                        className="w-full p-2 bg-[#333333] text-white rounded mb-2"
                    >
                        <option value="url">Image URL</option>
                        <option value="file">Upload File</option>
                    </select>
                    {imageInputType === 'url' ? (
                        <input
                            type="url"
                            name="imageUrl"
                            value={project.imageUrl}
                            onChange={handleChange}
                            className="w-full p-2 bg-[#333333] text-white rounded"
                            placeholder="Image URL"
                        />
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 bg-[#333333] text-white rounded"
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-manrope text-[#C7C7C7] mb-2">GitHub</label>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="isPrivate"
                            checked={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)}
                            className="mr-2"
                        />
                        <label htmlFor="isPrivate" className="text-sm font-manrope text-[#C7C7C7]">Private Repository</label>
                    </div>
                    {!isPrivate && (
                        <input
                            type="url"
                            id="githubUrl"
                            name="githubUrl"
                            value={project.githubUrl}
                            onChange={handleChange}
                            className="w-full p-2 bg-[#333333] text-white rounded"
                            placeholder="GitHub URL (optional)"
                        />
                    )}
                </div>
                <button type="submit" className="w-full bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300">
                    Add Project
                </button>
            </form>
        </div>
    )
}

export default AddProject