import {
  SET_INVOICES,
  ADD_NEW_INVOICE,
  CHANGE_INVOICE,
  DELETE_INVOICE
} from "../constance";

const initialState = {
  invoices: []
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.payload
      };
    case ADD_NEW_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload]
      };
    case CHANGE_INVOICE:
      const updatedArray = state.invoices.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }

        return item;
      });

      return {
        invoices: updatedArray
      };
    case DELETE_INVOICE:
      const arrWithoutDeleted = state.invoices.filter(
        item => item.id !== action.payload.id
      );

      return {
        invoices: arrWithoutDeleted
      };
    default:
      return state;
  }
};
