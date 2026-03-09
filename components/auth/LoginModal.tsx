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
  const [loading,setLoading] = useState(false)

  const isDisabled = !email || !password || loading

  async function handleLogin(e:React.FormEvent<HTMLFormElement>){

    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials",{
      email,
      password,
      redirect:false
    })

    setLoading(false)

    if(result?.error){
      setError("Credenciales incorrectas")
      return
    }

    close()
  }

  return(

    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >

      <div className="loginModal">

        <button
          className="closeBtn"
          onClick={close}
          aria-label="Cerrar login"
        >
          ✕
        </button>

        <header className="loginHeader">

          <p className="welcomeText">
            BIENVENIDO A
          </p>

          <h1 className="logo">
            BetDay<span>Lite</span>
          </h1>

        </header>

        <h2 id="login-title" className="loginTitle">
          Inicia sesión
        </h2>

        <form
          onSubmit={handleLogin}
          noValidate
        >

          <div className="inputGroup">

            <label htmlFor="email">
              Usuario o Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Usuario o Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>

          <div className="inputGroup">

            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Contraseña"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

          </div>

          {/* <div className="forgotPassword" aria-disabled>
            <a href="#">
              ¿Olvidaste tu contraseña?
            </a>
          </div> */}

          {error && (
            <p
              className="loginError"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="loginSubmit"
            disabled={isDisabled}
          >
            {loading ? "Ingresando..." : "CONTINUAR"}
          </button>

          {/* <p className="signupText">
            ¿No tienes una cuenta? <a href="#">Regístrate</a>
          </p> */}

        </form>

      </div>

    </div>

  )

}