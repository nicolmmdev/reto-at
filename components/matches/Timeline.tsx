"use client"

import { Match } from "@/types/match"
import MatchCard from "./MatchCard"

type Props = {
  matches: Match[]
}

export default function Timeline({ matches }: Props) {

  function getTodayMatchTime(startTime: string){

    const matchDate = new Date(startTime)

    const todayMatchTime = new Date()

    todayMatchTime.setHours(
      matchDate.getHours(),
      matchDate.getMinutes(),
      0,
      0
    )

    return todayMatchTime.getTime()
  }

  const sortedMatches = [...matches].sort((a,b)=>{

    const now = Date.now()

    const timeA = getTodayMatchTime(a.startTime)
    const timeB = getTodayMatchTime(b.startTime)

    const closedA = now >= timeA
    const closedB = now >= timeB

    if(closedA !== closedB){
      return closedA ? 1 : -1
    }

    return timeA - timeB
  })

  return(

    <div className="matches">

      {sortedMatches.map(match=>(
        <MatchCard
          key={match.id}
          match={match}
        />
      ))}

    </div>

  )
}