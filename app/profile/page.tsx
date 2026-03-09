"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import ProfileData from "./ProfileData"
import ProfileBets from "./ProfileBets"

export default function ProfilePage(){

  const { data: session } = useSession()

  const [tab,setTab] = useState<"data"|"bets">("data")

  return(

    <div className="profileLayout">

      <div className="sidebar">

        <div className="userBox">

          <div className="avatar">
            {session?.user?.name?.charAt(0)}
          </div>

          <div>
            <b>{session?.user?.name}</b>
            <p>ID: {session?.user?.id}</p>
          </div>

        </div>

        <div className="menu">

          <button
            className={tab==="data" ? "active":""}
            onClick={()=>setTab("data")}
          >
            Mi perfil
          </button>

          <button
            className={tab==="bets" ? "active":""}
            onClick={()=>setTab("bets")}
          >
            Mis apuestas deportivas
          </button>

        </div>

      </div>

      <div className="content">

        {tab==="data" && <ProfileData/>}

        {tab==="bets" && <ProfileBets/>}

      </div>

    </div>

  )
}