/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState, React } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'

export default function FilePreview() {
  const bufferStyle = {
    width: '100%',
    minHeight: '15vh'
  }

  const style = {
    width: 'fit-content',
    height: '15vh',
    position: 'absolute',
    right: 0,
    bottom: 60,
    left: 0,
    margin: 'auto'
  }

  const elemWrapStyle = {
    height: '15vh',
    borderRadius: '5px',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start'
  }

  const elemStyle = {
    backgroundColor: '#404652',
    height: 'inherit',
    borderRadius: '5px'
  }

  const file = useSelector((store) => store.file);
  const dispatch = useDispatch()
  function unsetFile() {
    dispatch({
      type: 'CHANGE_FILE',
      file: null
    })
  }

  const [src, setSrc] = useState()

  const [type, setType] = useState()
  useEffect(() => {
    if (file) {
      setSrc(URL.createObjectURL(file))
      setType(file.type.split('/')[0])
    }
  }, [file])

  let element

  switch (type) {
    case 'image':
      element = <img src={src} alt={file.name} style={elemStyle} />
      break
    case 'audio':
      element = <audio src={src} controls style={elemStyle} />
      break
    case 'video':
      element = <video src={src} controls style={elemStyle} />
      break
    default:
      element = null
      break
  }

  return (
    <>
      <div className="file-preview-buffer" style={bufferStyle} />
      <div className="file-preview" style={style}>
        <div className="preview-elem-wrapper" style={elemWrapStyle}>
          {element}
          <button
            type="button"
            className="btn close"
            style={{
              color: 'white',
              transform: 'translateX(-42px)',
              backgroundColor: 'rgba(87, 87, 90, 0.63)',
              borderRadius: '0 0 0 5px'
            }}
            // обнуляем файл при закрытии превьюs
            onClick={() => unsetFile()}
          >
            <AiOutlineClose className="icon close" />
          </button>
        </div>
      </div>
    </>
  )
}
