"use client"

import { useBetStore } from "@/stores/betStore"

export default function ProfileBets(){

const bets = useBetStore((state)=>state.placedBets)
  return(

    <div className="profileCard">

      <h2>Mis apuestas deportivas</h2>

      <table className="betsTable">

        <thead>
          <tr>
            <th>Partido</th>
            <th>Pick</th>
            <th>Cuota</th>
            <th>Monto</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>

          {bets.map((bet)=>(
            <tr key={bet.id}>

              <td>{bet.match}</td>
              <td>{bet.pick}</td>
              <td>{bet.odd}</td>
              <td>S/ {bet.stake}</td>
              <td>{bet.status}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )
}