"use client"

import Link from "next/link"
import { useBetStore } from "@/stores/betStore"
import styles from "./MyBets.module.css"

export default function MyBets(){

  const bets = useBetStore((state)=>state.bets)
  const updateStake = useBetStore((state)=>state.updateStake)
  const clearBets = useBetStore((state)=>state.clearBets)
  const removeBet = useBetStore((state)=>state.removeBet)
  const placeBets = useBetStore((state)=>state.placeBets)

  const totalStake = bets.reduce(
    (acc,bet)=>acc + bet.stake,
    0
  )

  const totalWin = bets.reduce(
    (acc,bet)=>acc + bet.stake * bet.odd,
    0
  )

  const isDisabled = totalStake <= 0

  return(

    <div className={styles.myBets}>

      <h2 className={styles.couponTitle}>
        CUPÓN <span className={styles.badge}>{bets.length}</span>
      </h2>

      <div className={styles.betsList}>

      {bets.map((bet)=>{

        const potentialWin = (bet.stake * bet.odd).toFixed(2)

        return(

          <div key={bet.id} className={styles.betCard}>

            <div className={styles.betHeader}>

              <Link href={`/bet/${bet.id}`}>
                {bet.match}
              </Link>

              <button
                className={styles.removeBet}
                onClick={()=>removeBet(bet.id)}
              >
                ×
              </button>

            </div>

            <div className={styles.betMarket}>

              <span className={styles.liveBadge}>
                EN VIVO
              </span>

              <span className={styles.pick}>
                {bet.pick}
              </span>

              <span className={styles.odd}>
                {bet.odd}
              </span>

            </div>

            <div className={styles.betStakeRow}>

              <input
                type="number"
                min="0"
                value={bet.stake}
                onChange={(e)=>
                  updateStake(bet.id, Number(e.target.value))
                }
              />

              <span className={styles.win}>
                Ganar: PEN {potentialWin}
              </span>

            </div>

          </div>

        )

      })}

      </div>

      <div className={styles.betSummary}>

        <div className={styles.summaryRow}>
          <span>Apuesta Total</span>
          <strong>PEN {totalStake.toFixed(2)}</strong>
        </div>

        <div className={styles.summaryRow}>
          <span>Ganancia Total</span>
          <strong>PEN {totalWin.toFixed(2)}</strong>
        </div>

      </div>

      <button
        className={styles.placeBet}
        disabled={isDisabled}
        onClick={placeBets}
      >
        Realizar apuesta PEN {totalStake.toFixed(2)}
      </button>

      <button
        className={styles.clearBtn}
        onClick={clearBets}
      >
        Limpiar todo
      </button>

    </div>

  )
}