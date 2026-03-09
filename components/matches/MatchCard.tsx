"use client"

import React, { useEffect, useState } from "react"
import { useBetStore } from "@/stores/betStore"
import { Match, Pick } from "@/types/match"

type Props = {
  match: Match
}

function MatchCard({ match }: Props) {

  const toggleBet = useBetStore((state) => state.toggleBet)
  const bets = useBetStore((state) => state.bets)

  const [closed,setClosed] = useState(false)

  const isSelected = (pick: Pick) =>
    bets.some(
      (bet) => bet.matchId === match.id && bet.pick === pick
    )

useEffect(() => {

  function checkMarket(){

    if(!match.startTime) return

    const now = new Date()

    const matchDate = new Date(match.startTime)

    const todayMatchTime = new Date()

    todayMatchTime.setHours(
      matchDate.getHours(),
      matchDate.getMinutes(),
      0,
      0
    )

    setClosed(now >= todayMatchTime)

  }

  checkMarket()

  const interval = setInterval(checkMarket, 1000)

  return () => clearInterval(interval)

}, [match.startTime])

  function handleBet(pick: Pick){

    if(closed) return

    const oddMap = {
      HOME: match.market.odds.home,
      DRAW: match.market.odds.draw,
      AWAY: match.market.odds.away
    } as const

    toggleBet({
      id: crypto.randomUUID(),
      matchId: match.id,
      match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      pick,
      odd: oddMap[pick],
      stake: 0,
      status: "PENDING",
      placedAt: "",
      return: null
    })
  }
const matchHour = new Date(match.startTime).toLocaleTimeString("es-PE", {
  hour: "2-digit",
  minute: "2-digit"
})
  return (

    <div className="matchCard">

<div className="matchHeader">

  {!closed && (
    <span className="liveBadge">
      EN VIVO
    </span>
  )}

  <span>{match.league.name}</span>

  <span className="matchTime">
    {matchHour}
  </span>

</div>

      <h3>
        {match.homeTeam.name} vs {match.awayTeam.name}
      </h3>

      <div className="odds">

        <button
          disabled={closed}
          className={isSelected("HOME") ? "selected" : ""}
          onClick={()=>handleBet("HOME")}
        >
          <div>{match.homeTeam.name}</div>
          <strong>{match.market.odds.home}</strong>
        </button>

        <button
          disabled={closed}
          className={isSelected("DRAW") ? "selected" : ""}
          onClick={()=>handleBet("DRAW")}
        >
          <div>Empate</div>
          <strong>{match.market.odds.draw}</strong>
        </button>

        <button
          disabled={closed}
          className={isSelected("AWAY") ? "selected" : ""}
          onClick={()=>handleBet("AWAY")}
        >
          <div>{match.awayTeam.name}</div>
          <strong>{match.market.odds.away}</strong>
        </button>

      </div>

      {closed && (
        <p className="closedMarket">
          Mercado cerrado
        </p>
      )}

    </div>

  )
}

export default React.memo(MatchCard)