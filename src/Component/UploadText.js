import React from 'react'

const UploadText = ({ label, size, placeholder, setFunction }) => {

  return (
    <>
      <div className='uploadContent'>
        <input width={size} className='inputField' type='text' name={label}  placeholder={placeholder} onChange={(e) => setFunction(e.target.value)}/>
      </div>
    </>
  )
}

export default UploadText