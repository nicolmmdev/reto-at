"use client"

import { useParams } from "next/navigation"
import { useBetStore } from "@/stores/betStore"

const BetDetailPage = () => {

  const params = useParams()
  const betId = params.betId as string

  const bet = useBetStore((state)=>
    state.placedBets.find(b=>b.id === betId)
  )

  if(!bet){
    return <p>Apuesta no encontrada</p>
  }

  return(

    <div className="betDetail">

      <h1>Detalle de apuesta</h1>

      <div className="betDetailCard">

        <p>
          <strong>Partido:</strong> {bet.match}
        </p>

        <p>
          <strong>Selección:</strong> {bet.pick}
        </p>

        <p>
          <strong>Cuota:</strong> {bet.odd}
        </p>

        <p>
          <strong>Apuesta:</strong> PEN {bet.stake}
        </p>

        <p>
          <strong>Estado:</strong> {bet.status}
        </p>

        <p>
          <strong>Ganancia potencial:</strong> PEN {(bet.stake * bet.odd).toFixed(2)}
        </p>

      </div>

    </div>

  )

}

export default BetDetailPage