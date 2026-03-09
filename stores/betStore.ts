import { create } from "zustand"

type Bet = {
  id: string
  matchId: string
  match: string
  pick: "HOME" | "DRAW" | "AWAY"
  odd: number
  status: "PENDING" | "WON" | "LOST"
  stake: number
}

type BetStore = {
  bets: Bet[]        // CUPÓN
  placedBets: Bet[]  // APUESTAS CONFIRMADAS

  toggleBet: (bet: Bet) => void
  updateStake: (id: string, stake: number) => void
  clearBets: () => void
  placeBets: () => void
}

export const useBetStore = create<BetStore>((set,get)=>({

  bets: [],
  placedBets: [],

  toggleBet: (bet) =>
    set((state) => {

      const exists = state.bets.find(
        (b) =>
          b.matchId === bet.matchId &&
          b.pick === bet.pick
      )

      if (exists) {
        return {
          bets: state.bets.filter(
            (b) =>
              !(b.matchId === bet.matchId && b.pick === bet.pick)
          )
        }
      }

      return {
        bets: [...state.bets, bet]
      }

    }),

  updateStake: (id, stake) =>
    set((state) => ({
      bets: state.bets.map((b) =>
        b.id === id ? { ...b, stake } : b
      )
    })),

  clearBets: () => set({ bets: [] }),

  placeBets: () => {

    const { bets, placedBets } = get()

    const confirmed = bets.filter(b => b.stake > 0)

    set({
      placedBets: [...placedBets, ...confirmed],
      bets: []
    })

  }

}))