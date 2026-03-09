import matchesData from "@/data/matches.json"
import Timeline from "@/components/matches/Timeline"
import MyBets from "@/components/bets/MyBets"

export default function Home() {

  const matches = matchesData.matches

  return (
    <div className="layout">

      <Timeline matches={matches} />

      <MyBets />

    </div>
  )
}