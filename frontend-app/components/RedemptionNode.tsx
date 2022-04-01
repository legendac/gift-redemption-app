import React from 'react'
import Link from 'next/link'
import { epochToDate, toDateDisplay, toDateTimeDisplay } from '../helpers/date'

import { Redemption } from '../interfaces'

type Props = {
  data: Redemption
}

const RedemptionNode = ({ data }: Props) => (
  <tr className="bg-gray-100">
    <td className="px-2 sm:px-4 py-3">{data.staff_pass_id}</td>
    <td className="px-2 sm:px-4 py-3">{data.team_name}</td>
    <td className="px-2 sm:px-4 py-3">{data.created_at !== '-' ? toDateTimeDisplay(epochToDate(data.created_at)) : '-' }</td>
  </tr>
)

export default RedemptionNode
