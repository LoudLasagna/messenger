/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import {
  useState, React, useEffect, useRef
} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from './message';
import 'bootstrap/dist/css/bootstrap.min.css';

let messages = [
  {
    chatId: '1-1',
    userId: 1,
    text: 'im just trying to do this shit'
  },
  {
    chatId: '1-1',
    userId: 1,
    text: 'im just trying to do this shit'
  },
  {
    chatId: '1-1',
    userId: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique, elit vel mollis vestibulum, ante lectus mattis nunc, vel porta lacus ex vel magna. Pellentesque fringilla tortor sit amet leo congue, quis tincidunt magna varius. Nam magna tellus, sodales eu ipsum nec, finibus commodo arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi efficitur dolor lorem, nec egestas arcu euismod sit amet. Curabitur nisi diam, eleifend at tellus eget, vestibulum vehicula magna. Duis a maximus erat, ac bibendum mi. Duis volutpat velit a dapibus molestie. Suspendisse blandit eu diam vel mollis. Nullam pharetra ex eget enim euismod, ac tincidunt erat maximus. Suspendisse maximus in justo a hendrerit. Cras diam orci, consequat vitae rutrum ac, convallis aliquet nibh. Nulla eget ornare nunc. Aenean aliquet quam sit amet tempor vestibulum. Nulla cursus augue eros, ut facilisis neque consectetur nec. Praesent elit metus, lobortis ut ultricies vel, placerat et nibh. Proin tincidunt ipsum vitae urna eleifend, id blandit purus consequat. Fusce varius nibh at tellus semper viverra. Quisque pharetra, dui non ornare molestie, nisi massa sagittis nulla, eget pretium erat risus non quam. Ut ultricies dignissim ligula, in sollicitudin arcu iaculis vitae. Vivamus molestie tempus sapien non volutpat. Nunc consectetur ex eget purus volutpat egestas vel sit amet odio. Donec aliquam nisl et turpis placerat fringilla. Ut ut tortor massa. Suspendisse at massa turpis. Nullam imperdiet id enim a tempor. Donec euismod nibh nec velit sagittis tristique. Fusce euismod malesuada eros ut efficitur. Praesent feugiat orci at lacus dignissim ullamcorper nec dictum lorem. Aenean eget nisi dolor.'
  },
  {
    chatId: '1-1',
    userId: 1,
    text: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  },
  {
    chatId: '1-1',
    userId: 1,
    text: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  },
  {
    chatId: '1-1',
    userId: 1,
    text: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  },
  {
    chatId: '1-1',
    userId: 1,
    text: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  },
  {
    chatId: '1-1',
    userId: 2,
    text: 'im just trying to do this shit'
  },
  {
    chatId: '1-1',
    userId: 2,
    text: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  }
]


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function Chat() {
  const activeChat = useSelector((store) => store.activeChat);
  const currentUserId = useSelector((store) => store.currentUser.id);

  const messagesEnd = useRef(null);

  const [userInput, ChangeInput] = useState('');

  const [Tmessages, CM] = useState(messages); /////////////////

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const HandleInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    ChangeInput(event.target.value);
  }

  const HandleSubmit = (event) => {
    let t = Tmessages.slice();
    t.push({
      chatId: activeChat.id,
      userId: currentUserId,
      text: userInput,
      datetime: new Date()
    })
    console.log(Tmessages);
    CM(t);
    ChangeInput('');

    scrollToBottom();
    event.preventDefault();
    event.stopPropagation();
  }

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [Tmessages, activeChat])

  return (
    <div className="Chat-elements-container">
      <div className="Chat-info-container">
        {activeChat.name}
      </div>
      <div className="Chat-history" style={{ height: windowDimensions.height }}>
        {
          Tmessages.filter((elem) => elem.chatId === activeChat.id).length > 0
            ? (Tmessages.filter((elem) => elem.chatId === activeChat.id).map((message, index) => (
              <Message key={index} messageData={message} currentUser={currentUserId} />
            ))) : (
            // eslint-disable-next-line max-len
              <div className="SampleText"> You can be the first one to write in this chat! Dont miss this opportunity</div>
            )
        }
        <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
      </div>
      <Form className="Chat-input-container" onSubmit={HandleSubmit}>
        <Form.Control type="text" className="Chat-input" value={userInput} onChange={HandleInput} />
        <Button variant="warning" type="submit">отправить</Button>
      </Form>
    </div>
  );
}
