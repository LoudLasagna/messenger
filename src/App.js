/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import {
  useState, React, useEffect, useRef
} from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from './logo.svg';
import gorg from './pics/gorg.jpg';
import smiley from './pics/smiley.jpg';
import danny from './pics/danny.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const channels = [
  {
    id: 1,
    name: 'beno',
    thumbnail: gorg
  },
  {
    id: 2,
    name: 'smiley',
    thumbnail: smiley
  },
  {
    id: 3,
    name: 'bob',
    thumbnail: danny
  }
]

let chats = [
  {
    channelId: 1,
    id: '1-1',
    name: 'cunny'
  },
  {
    channelId: 1,
    id: '1-2',
    name: 'test'
  },
  {
    channelId: 1,
    id: '1-3',
    name: 'asdaasdsa'
  },
  {
    channelId: 2,
    id: '2-1',
    name: 'test'
  },
  {
    channelId: 2,
    id: '2-2',
    name: 'asdaasdsa'
  }
]

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
  }
]

const userdata = [
  {
    id: 1,
    avatar: gorg,
    login: 'nexman',
    password: 'qwerty'
  }
]



function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function App() {
  const messagesEnd = useRef(null);

  const [ActiveChannel, ChangeActiveChannel] = useState(1);
  const [ActiveChat, ChangeActiveChat] = useState('0');
  const [UsersData, LoadUserData] = useState([]);

  const [userInput, ChangeInput] = useState('');


  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const [Tmessages, CM] = useState(messages); ////////////////////////////////////////

  const ChannelOnClick = (id) => {
    ChangeActiveChannel(id);
    ChangeActiveChat(chats.find((elem) => elem.channelId === id).id);
    console.log(id);
  }

  const ChatOnClick = (id) => {
    ChangeActiveChat(id);
  }

  const HandleInput = (event) => {
    ChangeInput(event.target.value);
  }

  const HandleSubmit = (event) => {
    let t = Tmessages.slice();
    t.push({
      chatId: ActiveChat,
      userId: userdata[0].id,
      text: userInput
    })
    console.log(t);
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
  }, [Tmessages, ActiveChat])

  return (
    <div className="App">
      <div className="Channels-container">
        {
          channels.map((channel) => (
            <a
              key={channel.id}
              title={channel.name}
              onClick={() => ChannelOnClick(channel.id)}
            >
              <img
                alt={channel.name}
                src={channel.thumbnail}
                className="Channel"
              />
            </a>
          ))
        }
      </div>
      {
        ActiveChannel === -1 ? (
          <div> choose a channel to browse trough its history! </div>
        ) : (
          <>
            <div className="Chats-container">
              {
                chats.filter((elem) => elem.channelId === ActiveChannel)
                  .map((chat) => (
                    <div key={chat.id} className="Chat" onClick={() => ChatOnClick(chat.id)}>{chat.name}</div>
                  ))
              }
            </div>
            <div style={{ display: 'flex', flexFlow: 'column' }}>
              <div className="Chat-history" style={{ height: windowDimensions.height }}>
                {
                  Tmessages.filter((elem) => elem.chatId === ActiveChat) ///////////////////////////
                    .map((message, index) => (
                      <div key={index} className="Message">
                        <img className="Message-avatar" alt="a" src={userdata.find((user) => user.id === message.userId).avatar} />
                        <div className="Message-textcontainer">
                          <div className="Message-username">{userdata.find((user) => user.id === message.userId).login}</div>
                          <div className="Message-text">
                            {message.text}
                          </div>
                        </div>
                      </div>
                    ))
                }
                <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
              </div>
              <Form className="Chat-inputcontainer" onSubmit={HandleSubmit}>
                <Form.Control type="text" className="Chat-input" value={userInput} onChange={HandleInput} />
                <Button variant="warning">warning</Button>
              </Form>
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;
