"use client"

import { useState } from "react"
import ProfileData from "./ProfileData"
import ProfileBets from "./ProfileBets"

export default function ProfilePage(){

  const [tab,setTab] = useState<"data"|"bets">("data")

  return(

    <div className="profileLayout">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div className="userBox">
          <div className="avatar">N</div>
          <div>
            <b>Nicol Lesly Mendoza Mattos</b>
            <p>ID: 1003120052</p>
          </div>
        </div>

        <div className="menu">

          <button className={tab==="data" ? "active":""}
            onClick={()=>setTab("data")}
          >
            Mi perfil
          </button>

          <button className={tab==="bets" ? "active":""}
            onClick={()=>setTab("bets")}
          >
            Mis apuestas deportivas
          </button>

        </div>

      </div>

      {/* CONTENIDO */}

      <div className="content">

        {tab==="data" && <ProfileData/>}

        {tab==="bets" && <ProfileBets/>}

      </div>

    </div>

  )
}