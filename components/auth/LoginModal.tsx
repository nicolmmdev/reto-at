"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

type Props = {
  close: () => void
}

export default function LoginModal({ close }: Props){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const isDisabled = !email || !password

  async function handleLogin(e:React.FormEvent){

    e.preventDefault()

    const result = await signIn("credentials",{
      email,
      password,
      redirect:false
    })

    if(result?.error){
      setError("Credenciales incorrectas")
      return
    }

    close()
  }

  return(

    <div className="modalOverlay">

      <div className="loginModal">

        <button
          className="closeBtn"
          onClick={close}
        >
          ✕
        </button>

        <h2>Inicia sesión</h2>

        <form onSubmit={handleLogin}>

          <input
            placeholder="Usuario o Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          {error && (
            <p className="loginError">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="loginSubmit"
            disabled={isDisabled}
          >
            CONTINUAR
          </button>

        </form>

      </div>

    </div>

  )

}