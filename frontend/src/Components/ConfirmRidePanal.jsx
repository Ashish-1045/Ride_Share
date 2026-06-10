import React from 'react'

const ConfirmRidePanal = (props) => {
  return (

    <div onClick={() => props.setVechielPanal(false)} className="bg-white p-4 h-full w-full rounded-t-3xl space-y-4">
      <h2 className="text-2xl font-semibold">Confirm your ride</h2>
      <p className="text-gray-600">Your driver is on the way. Please wait for a moment.</p>
        <button onClick={() => props.setConfirmPanal(false)}>Close</button>
    </div>
  )
}

export default ConfirmRidePanal