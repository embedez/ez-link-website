import { redirect } from "next/navigation"
import { POSTLink } from "../api/v1/link/action"
import { sendErrorRedirectResponse } from "../api"

export const GET = async (request: Request, context: { params: { id: string } }) => {
  const linkExists = await POSTLink({shortCode: context.params.id})

  if (!linkExists.success) return sendErrorRedirectResponse(404, `Could not find the path you requested at ${context.params.id}`)

  redirect(linkExists.data.originalUrl)
}