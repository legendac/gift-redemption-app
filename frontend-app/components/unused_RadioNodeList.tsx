import * as React from 'react'
import RadioNode from './unused_RadioNode'
import { TeamName } from '../interfaces'

type Props = {
  items: TeamName[],
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioNodeList = ({ items, onChange }: Props) => (
  <div className="px-4 ">
    <span className="text-lg text-gray-700">Team Name</span>
    <div className="flex items-center justify-center">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <RadioNode key={item.value} data={item} onChange={onChange}/>
        ))}
      </div>
    </div>
  </div>
)

export default RadioNodeList
