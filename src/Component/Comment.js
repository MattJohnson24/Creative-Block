import React from 'react'

const Comment = ({username, comment}) => {
  return (
    <div className='comment'>
        <p>
            <b>{username}:&nbsp;</b>{comment}
        </p>
    </div>
  )
}

export default Comment