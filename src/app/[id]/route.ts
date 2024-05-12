import { redirect } from "next/navigation"
import { GetLink } from "../api/v1/link/action"

export const GET = async (request: Request, context: { params: { id: string } }) => {
  console.log(context.params.id)

  const linkExists = await GetLink({shortCode: context.params.id})

  if (!linkExists.success) return Response.redirect(process.env.NEXTAUTH_URL!)

  redirect(linkExists.data.originalUrl)
}