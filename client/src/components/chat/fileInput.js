import {
  useEffect, useRef, React
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAttachFile } from 'react-icons/md'

// eslint-disable-next-line react/prop-types
export default function FileInput() {
  const file = useSelector((store) => store.file);
  const activeChat = useSelector((store) => store.activeChat);
  const dispatch = useDispatch()

  function setFile(selectedFile) {
    dispatch({
      type: 'CHANGE_FILE',
      file: selectedFile,
      fileChatId: activeChat.id
    })
  }

  const inputRef = useRef();
  useEffect(() => {
    if (!file) {
      inputRef.current.value = ''
    }
  }, [file])

  return (
    <div>
      <input
        type="file"
        accept="image/*, audio/*, video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="visually-hidden"
        ref={inputRef}
      />
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => inputRef.current.click()}
      >
        <MdAttachFile className="icon" />
      </button>
    </div>
  )
}
