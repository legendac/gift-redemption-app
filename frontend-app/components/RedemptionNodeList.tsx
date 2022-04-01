import * as React from 'react'
import RedemptionNode from './RedemptionNode'
import { Redemption } from '../interfaces'

type Props = {
  items: Redemption[]
}

const RedemptionNodeList = ({ items }: Props) => (
  <table className="table-auto w-full text-left whitespace-no-wrap">
    <thead>
      <tr>
        <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100 rounded-tl">Staff Pass ID</th>
        <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100">Team Name</th>
        <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100 rounded-tr">Redemption Time</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <RedemptionNode data={item} key={`${item.staff_pass_id}${item.created_at}`}/>
      ))}
    </tbody>
  </table>
)

export default RedemptionNodeList

