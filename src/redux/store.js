import { createStore } from "redux";

const currentUserData = "CURRENT_USER_DATA";
const currentContact = "CURRENT_CONTACT"

const store = createStore(
  function (state = "", action) {
    switch (action.type) {
      case currentUserData: {
        return {
          ...state,
          currentUserData: {
            data: action.payload.data,
          },
        };
      }
      case currentContact: {
        return {
          ...state,
          currentContact: {
            data: action.payload.data,
          },
        };
      }
      default:
        return state;
    }
  },
  {
    currentUserData: {
      data: {},
    },
    currentContact: {
      data: {},
    }
  }
);

export default store;
