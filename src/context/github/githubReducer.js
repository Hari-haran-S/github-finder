/* eslint-disable import/no-anonymous-default-export */
import {
  SEARCH_USER,
  SET_LOADING,
  CLEAR_USER,
  GET_USER,
  GET_REPOS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        laoding: true,
      };
    default:
      return state;
  }
};
