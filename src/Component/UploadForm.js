import React from 'react'
import UploadText from './UploadText'
import Button from './Button'
import CheckBox from './CheckBox'
import { useState } from 'react';
import UploadButton from './UploadButton'
import error from "../assets/erroricon.png"
import success from "../assets/checkicon.png"


const UploadForm = ({onAdd}) => {
  // set useStates here
  const [title, setTitle] = useState('')
  const [material, setMaterial] = useState('')
  const [contest, setContest] = useState(false)
  const [matureConfirm, setMatureConfirm] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [file, setFile] = useState([])
  const [filePicked, setFilePicked] = useState(false)
  const [fileShown, setFileShown] = useState('')
  const [theme, setTheme] = useState('Nature')
  const [contentType, setContentType] = useState('')
  const [missingTitle, setMissingTitle] = useState(false);
  const [missingMaterial, setMissingMaterial] = useState(false);
  const [missingContent, setMissingContent] = useState(false);
  const [missingImage, setMissingImage] = useState(false);
  const [missingTerms, setMissingTerms] = useState(false);
  // setTheme('Pets')


  const onSubmit = (e) => {
    e.preventDefault()
    setMissingTitle(false);
    setMissingMaterial(false);
    setMissingContent(false);
    setMissingImage(false);
    setMissingTerms(false);
    if(title == ""){
      setMissingTitle(true);
    }
    if(material == ""){
      setMissingMaterial(true);
    }
    if(contentType == ""){
      setMissingContent(true);
    }
    if(file.length == 0){
      setMissingImage(true);
    }
    if(!acceptTerms){
      setMissingTerms(true);
    }
    if(title != "" && material != "" && contentType != "" && file.length != 0 && acceptTerms){
      console.log("uploaded");
      // upload the file
    // additional information
    onAdd({
      'uploaderID': sessionStorage.getItem("user"), 
      'attributes': {
        'title':title, 
        'materials': material,
        'contest': contest, 
        'matureConfirm': matureConfirm, 
        'acceptTerms': acceptTerms, 
        'theme': theme, 
        'likes': 0, 
        'content_type': contentType,
        'likedBy': []
      }, 
        'file': file,
        })
    // need more states

    setTitle('')
    setMaterial('')
    setContentType('')
    setContest(false)
    setMatureConfirm(false)
    setAcceptTerms(false)
    }
  }

  const selectHandler = (event) => {
    setContentType(event.target.value)
  }

  return (
    <>
    <form className='uploadForm' onSubmit={onSubmit}>
        <UploadButton setFunction={setFile} setFilePicked={setFilePicked} setFileShown={setFileShown}/>
        {filePicked ? <div><img src={success} className="successIcon" alt="Success"></img><label className="successText">{fileShown}</label></div> : <p id='instructions'>Upload Content</p>}
        <div className="errorbox">
          {missingImage ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Choose content to upload</label></div> : ""}
        </div>
        <UploadText required label='Title' size='100' placeholder='Title' setFunction={setTitle}/>
        <div className="errorbox">
          {missingTitle ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter a title</label></div> : ""}
        </div>
        <UploadText required label='MaterialsUsed' size='100' placeholder='Materials Used' setFunction={setMaterial}/>
        <div className="errorbox">
          {missingMaterial ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Enter the materials used</label></div> : ""}
        </div>
        <select id='uploadDropdown' className="inputField" value={contentType} onChange={selectHandler}>
          <option value="" disabled hidden id='placeholderDropDown'>Select content type</option>
          <option value="Digital Media">Digital Media</option>
          <option value="Visual Arts">Visual Arts</option>
          <option value="Photography">Photography</option>
          <option value="3D Sculpture">3D Sculpture</option>
          <option value="Mixed Media">Mixed Media</option>
        </select>
        <div className="errorbox">
          {missingContent ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Select the content type</label></div> : ""}
        </div>

        <CheckBox text="Enter content in weekly voting" setFunction={setContest}/> 
        <CheckBox text="Mature content(18+)" setFunction={setMatureConfirm}/> 
        <CheckBox required text="TERMS & CONDITIONS*" setFunction={setAcceptTerms}/> 
        <div className="errorbox">
          {missingTerms ? <div className="errormsg"><img src={error} className="errorIcon" alt="Error"></img><label className="errorText">Must agree to terms and conditions</label></div> : ""}
        </div>
        <Button type='submit' />
    </form>
    <br></br>
    </>
  )
}

export default UploadForm