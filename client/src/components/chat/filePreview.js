/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import { useEffect, useState, React } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'

export default function FilePreview() {
  const file = useSelector((store) => store.file);
  const dispatch = useDispatch()
  function unsetFile() {
    dispatch({
      type: 'CHANGE_FILE',
      file: null
    })
  }

  const style = {
    width: '100%',
    height: '15vh',
    backgroundColor: '#404652'
  }

  const picStyle = {
    height: 'inherit'
  }

  // извлекаем файл и метод для его обновления из хранилища
  // локальное состояние для источника файла
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
      element = <img src={src} alt={file.name} style={picStyle} />
      break
    case 'audio':
      element = <audio src={src} controls style={picStyle} />
      break
    case 'video':
      element = <video src={src} controls style={picStyle} />
      break
    default:
      element = null
      break
  }

  return (
    <div className="file-preview" style={style}>
      {element}

      <button
        type="button"
        className="btn close"
        // обнуляем файл при закрытии превью
        onClick={() => unsetFile()}
      >
        <AiOutlineClose className="icon close" />
      </button>
    </div>
  )
}
