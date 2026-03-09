"use client"

import { useParams } from "next/navigation"
import { useBetStore } from "@/stores/betStore"

export default function BetDetail(){

  const { id } = useParams()

  const bet = useBetStore((state)=>
    state.bets.find((b)=>b.id===id)
  )

  if(!bet){
    return <p>Apuesta no encontrada</p>
  }

  const potentialWin = (bet.stake * bet.odd).toFixed(2)

  return(

    <div style={{padding:"20px"}}>

      <h1>Detalle de apuesta</h1>

      <p>
        <strong>Partido:</strong> {bet.match}
      </p>

      <p>
        <strong>Resultado elegido:</strong> {bet.pick}
      </p>

      <p>
        <strong>Odd:</strong> {bet.odd}
      </p>

      <p>
        <strong>Monto apostado:</strong> PEN {bet.stake}
      </p>

      <p>
        <strong>Ganancia potencial:</strong> PEN {potentialWin}
      </p>

      <p>
        <strong>Estado:</strong> {bet.status}
      </p>

    </div>

  )

}