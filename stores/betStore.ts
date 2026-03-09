import { Bet } from "@/types/bet"
import { create } from "zustand"



type BetStore = {
  bets: Bet[]
  placedBets:Bet[]
  toggleBet: (bet: Bet) => void
  updateStake: (id: string, stake: number) => void
  removeBet: (id: string) => void
  clearBets: () => void
  placeBets: () => void
}

export const useBetStore = create<BetStore>((set)=>({

  bets: [],
  placedBets: [],

  toggleBet: (bet) =>
    set((state)=>{

      const exists = state.bets.find(b=>b.id === bet.id)

      if(exists){
        return {
          bets: state.bets.filter(b=>b.id !== bet.id)
        }
      }

      return {
        bets: [...state.bets, bet]
      }

    }),

  updateStake: (id, stake)=>
    set((state)=>({
      bets: state.bets.map(bet =>
        bet.id === id
          ? { ...bet, stake }
          : bet
      )
    })),

  removeBet: (id)=>
    set((state)=>({
      bets: state.bets.filter(
        bet => bet.id !== id
      )
    })),

  clearBets: () =>
    set({ bets: [] }),

placeBets: () =>
  set((state) => {

    const newPlaced = state.bets.map((bet) => ({
      ...bet,
      status: "PENDING" as const
    }))

    return {
      placedBets: [...state.placedBets, ...newPlaced],
      bets: []
    }

  })

}))