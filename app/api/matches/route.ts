import matches from "@/data/matches.json"

export async function GET() {
  return Response.json(matches)
}