const defaultState = {
  activeChat: {
    id: '1-1',
    name: 'cunny'
  },
  currentUser: {}
}

export default function reducers(state = defaultState, action) {
  switch (action.type) {
    case 'CHANGE_CHAT':
      return {
        ...state,
        activeChat: action.chat
      }
    case 'CHANGE_USER':
      return {
        ...state,
        currentUser: action.user
      }
    default: return state
  }
}
