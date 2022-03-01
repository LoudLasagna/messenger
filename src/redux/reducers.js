const defaultState = {
  activeChannel: -1,
  activeChat: -1
}

export default function reducers(state = defaultState, action) {
  switch (action.type) {
    case 'CHANGE_CHANNEL':
      return {
        ...state,
        activeChannel: action.channel,
        activeChat: -1
      }
    case 'CHANGE_CHAT':
      return {
        ...state,
        activeChat: action.chat
      }
    default: return state
  }
}
