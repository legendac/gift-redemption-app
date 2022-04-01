import React, { useState } from 'react'
import Link from 'next/link'
import { Redemption, RedemptionFormSubmitResult, RedemptionResponse, TeamName } from './../interfaces/index'
import { teamNameArray } from '../utils/constants'
import RedemptionNodeList from './RedemptionNodeList'
function Form() {
  const baseState = {
    staff_pass_id: "",
    team_name: "",
    ops: "",
    ops_message: "",
    last_staff_redeemed: "",
    items: [{
      staff_pass_id: "-",
      team_name: "-",
      created_at: "-",
    }]
  }
  const [state, setState] = useState<RedemptionFormSubmitResult>(baseState)

  const [isLoading, setLoading] = useState(false)
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const registerRedemptionAttempt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  
    // Get data from the form.
    const data = {
      staff_pass_id: state.staff_pass_id,
      team_name: state.team_name
    }

    const urlRedemption = 'https://useczavsf8.execute-api.ap-southeast-1.amazonaws.com/default/gift-redemption?method=staffRedemption'
    const urlData = urlRedemption + '&teamName=' + data.team_name + '&staffId=' + data.staff_pass_id
    
    setLoading(true)
    try {
      const res = await fetch(urlData)
      if (!res.ok) {
        const message: string = `An error has occured: ${res.status}`
        throw new Error(message)
      }
      const result: RedemptionResponse = await res.json()

      if (result.ops === 'success' && result.items.length > 0) {
        setState({
          staff_pass_id: "",
          team_name: "",
          ops: "success",
          ops_message: `Redemption successful for ${data.staff_pass_id}.`,
          last_staff_redeemed: data.staff_pass_id,
          items: result.items
        })
      } else {
        setState({
          staff_pass_id: "",
          team_name: "",
          ops: "failure",
          ops_message: `Redemption failed for ${data.staff_pass_id}.`,
          last_staff_redeemed: data.staff_pass_id,
          items: result.items
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
      }
      console.log(String(err))

      setState({
        // persist form data for retry
        staff_pass_id: data.staff_pass_id,
        team_name: data.team_name,
        // failure-network
        ops: "failure-network",
        ops_message: `Redemption failed for ${data.staff_pass_id}. Error has occurred`,
        last_staff_redeemed: "",
        items: []
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={registerRedemptionAttempt} className="w-full max-w-screen-md mx-auto">
        <fieldset className="space-y-12">
          <div className="relative flex-grow w-2/3 mx-auto">

            <label htmlFor="staff_pass_id" data-testid="staff_pass_id_label" className="leading-7 text-sm text-gray-600">Staff Pass ID</label>
            <input
              name="staff_pass_id"
              id="staff_pass_id"
              data-testid="staff_pass_id"
              type="text"
              placeholder="e.g. BOSS_LRDTIELIM6RQ"
              onChange={handleChange}
              value={state.staff_pass_id}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out /"
              required
            />
          </div>

          {/* potential split to RadioNodeList */}
          <div className="px-4 ">
            <span className="leading-7 text-sm text-gray-600" data-testid="team_name_label" >Team Name</span>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {/* potential split to RadioNodeChild */}
                {teamNameArray.map((item) => (
                  <label key={`team_name-${item.display}`} htmlFor={`team_name-${item.display}`} className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                    <span className="font-bold text-gray-900">
                      <span className="text-xl">{item.display}</span>
                      <span className="text-2xl uppercase"></span>
                    </span>

                    <input type="radio" name="team_name" id={`team_name-${item.display}`} data-testid={`team_name-${item.display}`} value={item.value} className="absolute h-0 w-0 opacity-0" onChange={handleChange} checked={state.team_name === item.value}/>
                    <span aria-hidden="true" className="hidden absolute inset-0 border-2 border-blue-500 bg-blue-200 bg-opacity-10 rounded-lg">
                      <span className="absolute -top-1.5 -right-2.5 h-6 w-6 inline-flex items-center justify-center rounded-full bg-blue-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-blue-600">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className={`border-0 py-2 px-6 focus:outline-none rounded text-lg ${isLoading ? 'text-black bg-gray-200' : 'text-white bg-blue-500 focus:bg-blue-600 hover:bg-blue-600'}`}
            disabled={isLoading}
            data-testid="redeem_button"
          >
            {isLoading
              ? 'Submitting ...'
              : 'Redeem'
            }
          </button>
        </fieldset>
      </form>
      
      <div className="container py-11 mx-auto ">
        <div className={`py-5 transition-colors duration-300 ease-in-out sm:rounded bg-gray-100
          ${state.ops === "success" && ' bg-green-200'}
          ${state.ops.includes("failure") && ' bg-red-200'
        }`}>
          <div className="flex flex-col text-center w-full mb-4">
            {state.ops_message && (
              <p className="mb-4 font-bold title-font"><span className="px-5">{state.ops_message}</span>
                <button
                  type="button"
                  className={'border-0 py-1 mt-4 sm:mt-0 px-6 focus:outline-none bg-gray-200 focus:outline-blue-500 rounded text-lg'}
                  onClick={() => setState(baseState)}
                >
                  Reset
                </button>
              </p>
            )}
            <h1 className="text-sm font-bold text-gray-900">User Redemption History</h1>
          </div>
          <div className="w-full mx-auto overflow-auto">
            <RedemptionNodeList items={state.items} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
