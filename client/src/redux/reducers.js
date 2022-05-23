const defaultState = {
  activeChat: { id: null },
  currentUser: {},
  file: null
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
    case 'LOGOUT':
      return {
        ...state,
        currentUser: {}
      }
    case 'CHANGE_SID':
      return {
        ...state,
        sessionId: action.sid
      }
    case 'CHANGE_FILE':
      return {
        ...state,
        file: action.file,
        fileChatId: action.fileChatId
      }
    default: return state
  }
}
