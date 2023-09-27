import { ActionTypes } from "../../constants/actionTypes";

export const addressReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_ADDRESS_SUCCESS:
      return {
        addressData: payload,
      };
    case ActionTypes.ADD_ADDRESS_FAILED:
      return {
        loading: true,
        addressError: payload,
      };
    case ActionTypes.GET_ADDRESS_SUCCESS:
      return {
        addressData: payload,
      };
    case ActionTypes.GET_ADDRESS_FAILED:
      return {
        loading: true,
        addressError: payload,
      };

    case ActionTypes.DELETE_ADDRESS_SUCCESS:
      return {
        addressData: payload,
      };
    case ActionTypes.DELETE_ADDRESS_FAILED:
      return {
        loading: true,
        addressError: payload,
      };

    default: {
      return state;
    }
  }
};
