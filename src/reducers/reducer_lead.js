import React from 'react';

import {ACTION_SIGNUP} from '../actions/index';

export default function(state = {}, action) {
    // In case of successful submission
    switch(action.type) {
      case ACTION_SIGNUP:
        console.log("Inside reducer: Lead email: ", 
        action.payload.data.lead.email);
        return {
          submitted: true,
          email: action.payload.data.lead.email
        };
      default:
        return state;
    }
}
