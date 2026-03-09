"use client"

import { useState } from "react"
import LoginModal from "../auth/LoginModal"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Header(){

  const { data: session } = useSession()
  const router = useRouter()

  const [showLogin,setShowLogin] = useState(false)

  function handleProfile(){

    if(!session){
      setShowLogin(true)
      return
    }

    router.push("/profile")
  }

  return(

    <header className="header">

      <Link href="/">
<h1 className="logo">
  BetDay <span>Lite</span>
</h1>
      </Link>

      <div className="navActions">

        {!session && (

          <button
            className="loginBtn"
            onClick={()=>setShowLogin(true)}
          >
            Inicia sesión
          </button>

        )}

        {session && (

          <div className="userMenu">

            {/* avatar clickable */}
            <button
              className="avatarBtn"
              onClick={handleProfile}
            >
              {session.user?.name?.charAt(0) ?? "U"}
            </button>

            <button
              className="logoutBtn"
              onClick={()=>signOut({ callbackUrl: "/" })}
            >
              Salir
            </button>

          </div>

        )}

      </div>

      {showLogin && (
        <LoginModal close={()=>setShowLogin(false)} />
      )}

    </header>

  )

}