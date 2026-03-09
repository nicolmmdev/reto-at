"use client"

import { useEffect,useState } from "react"
import Timeline from "@/components/matches/Timeline"
import MyBets from "@/components/bets/MyBets"

export default function Home(){

  const [matches,setMatches] = useState([])

  useEffect(()=>{

    fetch("/api/matches")
      .then(res=>res.json())
      .then(data=>setMatches(data.matches))

  },[])

  async function onBet(match:any,pick:"HOME"|"DRAW"|"AWAY"){

    const bet={
      matchId:match.id,
      match:`${match.homeTeam.name} vs ${match.awayTeam.name}`,
      pick,
      odd:match.market.odds[pick.toLowerCase()],
      amount:30
    }

    await fetch("/api/bets",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(bet)
    })

  }

  return(

      <div className="layout">
        <Timeline
      matches={matches}
      onBet={onBet}
    />
          <MyBets />
    </div>




  )
}