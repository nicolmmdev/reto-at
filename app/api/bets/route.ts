import bets from "@/data/bets.json"

export async function GET() {
  return Response.json(bets)
}