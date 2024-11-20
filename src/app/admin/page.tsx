// app/admin/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Loader from '@/components/ui/Loader'  // Assuming you have a Loader component

export default function AdminDashboard() {
  const { data: session, status } = useSession()

  // Show loader until session data is loaded
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />  {/* Your loader component */}
      </div>
    )
  }

  if (!session) {
    return <div>Access Denied</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bebas-neue mb-6 text-white">Admin Dashboard</h1>
        <nav className="space-y-4">
          <Link href="/admin/projects" className="block w-full bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300 text-center">
            Manage Projects
          </Link>
          <Link href="/admin/skills" className="block w-full bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300 text-center">
            Manage Skills
          </Link>
          <Link href="/admin/experiences" className="block w-full bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300 text-center">
            Manage Experiences
          </Link>
        </nav>
      </div>
    </div>
  )
}
