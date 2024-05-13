import { sendErrorResponse, sendJsonResponse } from "@/app/api"
import { PATCHLink, POSTLink } from "../action"

export async function GET(request: Request, context: { params: { id: string } }) {
  const result = await POSTLink({
    shortCode: context.params.id
  })

  if (!result.success) return sendErrorResponse(result.status || 400, result.message)
  return sendJsonResponse(result.data)
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const body = await request.json()
  const result = await PATCHLink({ shortCode: context.params.id, data: body })

  if (!result.success) return sendErrorResponse(result.status || 400, result.message)
  return sendJsonResponse(result.data)
}