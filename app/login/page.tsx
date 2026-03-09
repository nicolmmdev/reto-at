"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./LoginPage.module.css"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const isDisabled = !email || !password || loading

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()

    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    setLoading(false)

    if (res?.error) {
      setError("Credenciales incorrectas")
      return
    }

    router.push("/")
  }

  return (

    <main className={styles.loginPage}>

      <div className={styles.loginCard}>

        <header className={styles.loginHeader}>

          <p className={styles.welcomeText}>
            BIENVENIDO A
          </p>

          <h1 className="logo">
            BetDay <span>Lite</span>
          </h1>

        </header>

        <h2 className={styles.loginTitle}>
          Inicia sesión
        </h2>

        <form onSubmit={handleLogin} noValidate>

          <div className={styles.inputGroup}>

            <label htmlFor="email">
              Usuario o Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Usuario o Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className={styles.inputGroup}>

            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {/* <div className={styles.forgotPassword}>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div> */}

          {error && (
            <p className={styles.loginError} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles.loginSubmit}
            disabled={isDisabled}
          >
            {loading ? "Ingresando..." : "CONTINUAR"}
          </button>

          {/* <p className={styles.signupText}>
            ¿No tienes una cuenta? <a href="#">Regístrate</a>
          </p> */}

        </form>

      </div>

    </main>

  )
}