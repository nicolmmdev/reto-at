"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function handleLogin(e:any){

    e.preventDefault()

    const res = await signIn("credentials",{
      email,
      password,
      redirect:false
    })

    if(!res?.error){
      router.push("/")
    }

  }

  return(
    <form onSubmit={handleLogin}>
      <input
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  )
}