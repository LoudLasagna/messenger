/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import {
  useState, React
} from 'react';
import Channel from './channel';
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

function App() {
  const [ActiveChannel, ChangeActiveChannel] = useState(1);
  const ChannelOnClick = (id) => {
    ChangeActiveChannel(id);
    console.log(id);
  }
  return (
    <div className="App">
      <div className="Channels-container">
        { //// fetch channels
          channels.map((channel) => (
            <a
              key={channel.id}
              title={channel.name}
              onClick={() => ChannelOnClick(channel.id)}
            >
              <img
                alt={channel.name}
                src={channel.thumbnail}
                className="ChannelIMG"
              />
            </a>
          ))
        }
      </div>
      {
        ActiveChannel === -1 ? (
          <div> choose a channel to browse trough its history! </div>
        ) : (
          <Channel id={ActiveChannel} />
        )
      }
    </div>
  );
}

export default App;
