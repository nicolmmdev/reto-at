"use client"

import { Match } from "@/types/match"
import MatchCard from "./MatchCard"

type Props = {
  matches: Match[]
  onBet:(match:any,pick:"HOME"|"DRAW"|"AWAY")=>void
}

export default function Timeline({ matches ,onBet}: Props) {

  return (

    <div className="matches">

      {matches.map((match) => (

        <MatchCard
          key={match.id}
          match={match}
        />

      ))}

    </div>

  )
}