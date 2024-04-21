import React from 'react'

const CheckBox = ({text, setFunction}) => {
  return (
    <>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="materialUnchecked" onChange={(e) => setFunction(e.target.checked)}/>
          <label className="form-check-label" htmlFor="materialUnchecked">{text}</label>
        </div>
    </>
    
  )
}

export default CheckBox