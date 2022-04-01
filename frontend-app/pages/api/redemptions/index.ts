import { NextApiRequest, NextApiResponse } from 'next'
import { sampleRedemptionData } from '../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleRedemptionData)) {
      throw new Error('Cannot find redemption data')
    }

    res.status(200).json({
      items: sampleRedemptionData
    })
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
