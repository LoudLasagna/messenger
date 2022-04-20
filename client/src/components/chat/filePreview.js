/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import { useEffect, useState, React } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { AiOutlineClose, AiTwotoneCloseCircle } from 'react-icons/ai'

export default function FilePreview() {
  const file = useSelector((store) => store.file);
  const dispatch = useDispatch()
  function unsetFile() {
    dispatch({
      type: 'CHANGE_FILE',
      file: null
    })
  }

  const bufferStyle = {
    width: '100%',
    minHeight: '15vh'
  }

  const style = {
    width: window.innerWidth - 330,
    height: '15vh',
    left: 330,
    bottom: '7vh',
    position: 'absolute'
  }

  const elemWrapStyle = {
    backgroundColor: '#404652',
    postion: 'relative',
    height: '15vh',
    width: 'fit-content',
    inset: '0',
    margin: 'auto auto',
    borderRadius: '5px'
  }

  const elemStyle = {
    height: 'inherit',
    borderRadius: '5px'
  }

  // извлекаем файл и метод для его обновления из хранилища
  // локальное состояние для источника файлаs
  const [src, setSrc] = useState()
  // локальное состояние для типа файла
  const [type, setType] = useState()

  // при наличии файла обновляем источник и тип файла
  useEffect(() => {
    if (file) {
      setSrc(URL.createObjectURL(file))
      setType(file.type.split('/')[0])
    }
  }, [file])

  // элемент для рендеринга зависит от типа файла
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
            // обнуляем файл при закрытии превью
            onClick={() => unsetFile()}
          >
            <AiOutlineClose className="icon close" style={{ color: 'white' }} />
          </button>
        </div>
      </div>
    </>
  )
}
