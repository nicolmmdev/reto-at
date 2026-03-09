"use client"

import { useBetStore } from "@/stores/betStore"
import { Match } from "@/types/match"

type Props = {
  match: Match
}

export default function MatchCard({ match }: Props) {

  const bets = useBetStore((state) => state.bets)
  const toggleBet = useBetStore((state) => state.toggleBet)

  const isSelected = (pick: "HOME" | "DRAW" | "AWAY") =>
    bets.some(
      (bet) => bet.matchId === match.id && bet.pick === pick
    )

  function isMarketClosed() {

    if (!match.startTime) return false

    const now = new Date()
    const matchDate = new Date(match.startTime)

    const todayMatchTime = new Date()

    todayMatchTime.setHours(
      matchDate.getHours(),
      matchDate.getMinutes(),
      0,
      0
    )

    return now >= todayMatchTime
  }

  function handleBet(pick: "HOME" | "DRAW" | "AWAY") {

    const oddMap: any = {
      HOME: match.market.odds.home,
      DRAW: match.market.odds.draw,
      AWAY: match.market.odds.away
    }

    toggleBet({
      id: `${match.id}-${pick}`,
      matchId: match.id,
      match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      pick,
      odd: oddMap[pick],
      stake: 0,
      status: "PENDING"
    })
  }

  const closed = isMarketClosed()

  return (

    <div className="matchCard">

      <div className="matchHeader">

        {!closed && <span className="liveBadge">EN VIVO</span>}

        <span>{match.league.name}</span>

      </div>

      <h3>
        {match.homeTeam.name} vs {match.awayTeam.name}
      </h3>

      <div className="odds">

        <button
          disabled={closed}
          className={isSelected("HOME") ? "selected" : ""}
          onClick={() => handleBet("HOME")}
        >
          <div>{match.homeTeam.name}</div>
          <strong>{match.market.odds.home}</strong>
        </button>

        <button
          disabled={closed}
          className={isSelected("DRAW") ? "selected" : ""}
          onClick={() => handleBet("DRAW")}
        >
          <div>Empate</div>
          <strong>{match.market.odds.draw}</strong>
        </button>

        <button
          disabled={closed}
          className={isSelected("AWAY") ? "selected" : ""}
          onClick={() => handleBet("AWAY")}
        >
          <div>{match.awayTeam.name}</div>
          <strong>{match.market.odds.away}</strong>
        </button>

      </div>

      {closed && (
        <p className="closedMarket">Partido cerrado</p>
      )}

    </div>
  )
}