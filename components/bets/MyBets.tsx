"use client"

import Link from "next/link"
import { useBetStore } from "@/stores/betStore"

export default function MyBets(){

  const bets = useBetStore((state)=>state.bets)
  const updateStake = useBetStore((state)=>state.updateStake)
  const clearBets = useBetStore((state)=>state.clearBets)

  const totalStake = bets.reduce(
    (acc,bet)=>acc + bet.stake,
    0
  )

  const totalWin = bets.reduce(
    (acc,bet)=>acc + bet.stake * bet.odd,
    0
  )

  const isDisabled = totalStake <= 0
const placeBets = useBetStore((state)=>state.placeBets)
  return(

    <div className="myBets">

      <h2>CUPÓN ({bets.length})</h2>

      <div className="betsList">

      {bets.map((bet)=>{

        const potentialWin = (bet.stake * bet.odd).toFixed(2)

        return(

          <div key={bet.id} className="betCard">

            <Link href={`/bet/${bet.id}`}>
              <p>{bet.match}</p>
            </Link>

            <p>
              Pick: <strong>{bet.pick}</strong>
            </p>

            <p>Odd: {bet.odd}</p>

            <input
              type="number"
              min="0"
              value={bet.stake}
              onChange={(e)=>
                updateStake(bet.id, Number(e.target.value))
              }
            />

            <p>Ganar: PEN {potentialWin}</p>

          </div>

        )

      })}

      </div>


      {/* RESUMEN */}

      <div className="betSummary">

        <div className="summaryRow">
          <span>Apuesta Total</span>
          <strong>PEN {totalStake.toFixed(2)}</strong>
        </div>

        <div className="summaryRow">
          <span>Ganancia Total</span>
          <strong>PEN {totalWin.toFixed(2)}</strong>
        </div>

      </div>


      {/* BOTONES */}

<button
  className="placeBet"
  disabled={isDisabled}
  onClick={placeBets}
>
Realizar apuesta PEN {totalStake.toFixed(2)}
</button>

      <button
        className="clearBtn"
        onClick={clearBets}
      >
        Limpiar todo
      </button>

    </div>

  )

}