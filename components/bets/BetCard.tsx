import { useBetStore } from "@/stores/betStore"
import { Bet } from "@/types/bet"


type Props = {
  bet: Bet
}

export default function BetCard({ bet }: Props) {

  const toggleBet = useBetStore((state) => state.toggleBet)

  return (

    <div className="betCard">

      <button
        className="removeBet"
        onClick={() => toggleBet(bet)}
      >
        ✕
      </button>

      <p>{bet.match}</p>

      <p>
        Pick: <strong>{bet.pick}</strong>
      </p>

      <p>Odd: {bet.odd}</p>

    </div>

  )


}