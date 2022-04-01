import React from 'react'
import Link from 'next/link'

import { TeamName } from '../interfaces'

type Props = {
  data: TeamName,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioNode = ({ data, onChange }: Props) => (
  <label htmlFor={`plan-${data.display}`} className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
    <span className="font-bold text-gray-900">
      <span className="text-xl">{data.display}</span>
      <span className="text-2xl uppercase"></span>
    </span>
    <span>
      
    </span>
    <input type="radio" name="plan" id={`plan-${data.display}`} value={data.value} className="absolute h-0 w-0 opacity-0" onChange={onChange}/>
    <span aria-hidden="true" className="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
      <span className="absolute -top-1.5 -right-2.5 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-green-600">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    </span>
  </label>
)

export default RadioNode
