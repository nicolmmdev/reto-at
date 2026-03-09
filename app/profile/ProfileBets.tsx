"use client"

import { useBetStore } from "@/stores/betStore"
import { useRouter } from "next/navigation"

export default function ProfileBets(){

  const router = useRouter()
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
            <tr
              key={bet.id}
              onClick={() => router.push(`/bets/${bet.id}`)}
              style={{cursor:"pointer"}}
            >

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