import {LOGIN, MESSAGES} from './actions'

const initialState  = {
    user: null,
    messages: []
};
  

export default function ChatpipeApp(state = initialState, action) {
  switch (action.type) {
    case  LOGIN:
      return {
          ...state,
          user: action.user
      }
    case MESSAGES:
      return {
          ...state,
          messages: action.messages
      }
    default:
      return state
  }
}
