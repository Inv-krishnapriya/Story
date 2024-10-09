import { PayloadAction } from '@reduxjs/toolkit';

const uiReducer = (state = {}, action: PayloadAction) => {
  const { type } = action;
  const matches = /(.*)(Request|Success|Error|Fetch)/.exec(type);

  // not a *Request / *Success /  *Error /  *Fetch actions, so we ignore them
  if (!matches) {
    return state;
  }

  const requestPrefix = matches[1];
  const requestState = matches[2];
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    [requestPrefix]: requestState === 'Fetch' || requestState === 'Request',
  };
};

export default uiReducer;
