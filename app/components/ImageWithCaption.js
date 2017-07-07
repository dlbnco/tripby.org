import React from 'react'

const ImageWithCaption = (props) => {
  return (
    <div style={{padding: '1em 2em 2em'}} className="text-center">
      <img src={props.image} className="mb-3"/>
      <p>
        {props.caption}
      </p>
    </div>
  )
}

export default ImageWithCaption
