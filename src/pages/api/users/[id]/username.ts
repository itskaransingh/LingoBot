import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// <Data>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ name: 'hello' })
}
