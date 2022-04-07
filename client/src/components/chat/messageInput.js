/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import {
  useState,
  React,
  useEffect
} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Picker } from 'emoji-mart';
import { FiSend } from 'react-icons/fi';
import { GrEmoji } from 'react-icons/gr';

import fileApi from '../api/fileAPI';
import UseChat from '../hooks/useChat'
import FileInput from './fileInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'emoji-mart/css/emoji-mart.css';


export default function MessageInput() {
  const activeChat = useSelector((store) => store.activeChat);

  const [userInput, ChangeInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const file = useSelector((state) => state.file);

  const chatHook = UseChat(activeChat.id)

  const handleEmojiShow = () => {
    setShowEmoji((v) => !v)
  }
  const handleEmojiSelect = (e) => {
    // eslint-disable-next-line no-shadow
    ChangeInput(userInput + e.native)
  }

  const HandleInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    ChangeInput(event.target.value);
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (submitDisabled) return

    const message = {}

    if (file) {
      try {
        const path = await fileApi.upload({ file, chatId: activeChat.id })
        const type = file.type.split('/')[0]
        message.messageType = type
        message.content = path
      } catch (e) {
        console.error(e)
      }
      chatHook.sendMessage(message)
    }

    message.messageType = 'text'
    message.content = userInput
    chatHook.sendMessage(message)

    ChangeInput('');
  }

  useEffect(() => {
    setSubmitDisabled(!userInput.trim() && !file)
  }, [userInput, file])

  return (
    <>
      <Form className="Chat-input-container" onSubmit={HandleSubmit}>
        <Button variant="primary" type="button" onClick={handleEmojiShow}>
          <GrEmoji />
        </Button>
        <Form.Control disabled={setSubmitDisabled} type="text" className="Chat-input" value={userInput} onChange={HandleInput} />
        <FileInput />
        <Button variant="success" type="submit">
          <FiSend />
        </Button>
      </Form>
      {showEmoji && <Picker set="apple" theme="dark" style={{ position: 'absolute', bottom: '6vh', left: '340px' }} onSelect={handleEmojiSelect} emojiSize={20} />}
    </>
  );
}

