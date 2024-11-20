// app/admin/login/page.tsx
'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin')
    }
  }, [status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    })
    if (result?.error) {
      setError('Invalid credentials')
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'authenticated') {
    return null
  }

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bebas-neue mb-6 text-white">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-[#333333] text-white rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-manrope text-[#C7C7C7] mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-[#333333] text-white rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  )
}