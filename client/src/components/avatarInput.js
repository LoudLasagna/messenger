/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import {
  useEffect, useRef, React, useState
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlusCircle } from 'react-icons/fi';

export default function AvatarInput(props) {
  const selectedAvatar = useSelector((store) => store[props.varName]);
  const { currentAvatar } = props;
  const dispatch = useDispatch()
  const [src, setSrc] = useState('');

  function setFile(selectedFile) {
    dispatch({
      type: props.type,
      selectedAvatar: selectedFile
    })
  }

  const inputRef = useRef();
  useEffect(() => {
    if (!selectedAvatar) {
      inputRef.current.value = ''
    } else {
      setSrc(URL.createObjectURL(selectedAvatar))
    }
  }, [selectedAvatar])

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="visually-hidden"
        ref={inputRef}
      />
      <button
        type="button"
        style={{ backgroundColor: 'transparent', border: 'none' }}
        onClick={() => inputRef.current.click()}
      >
        <img
          style={{
            height: 100,
            width: 100,
            borderRadius: '50%',
            margin: 10
          }}
          src={selectedAvatar ? src : currentAvatar}
          alt=""
        />
        <FiPlusCircle style={{
          width: '30px',
          height: '30px',
          position: 'absolute',
          transform: 'translate(-50px, 70px)'
        }}
        />
      </button>
    </>
  )
}
