import React from 'react'
import logo from '../assets/upload_icon.png';
import '../styles.css'

const UploadButton = ({setFunction, setFilePicked, setFileShown}) => {

  const onChangeFile = e => {
    setFunction(e.target.files[0])
    setFilePicked(true)
    setFileShown(e.target.files[0].name)
  }

  return (

    <>
      <div className='uploadButton-div'>
        <label>
          <input type='file' id='file' style={{display: 'none'}} onChange={e => onChangeFile(e)} />
          <img className="uploadButton" src={logo} alt="Upload Content" />
        </label>
      </div>
    </>
  )
}

export default UploadButton