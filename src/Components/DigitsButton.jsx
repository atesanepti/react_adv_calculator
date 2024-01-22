import React from 'react'
import { ACTIONS } from './Calculator';
const DigitsButton = ({digit,dispatch}) => {
  return <button onClick={()=>{dispatch({ type: ACTIONS.ADD_DIGITS, payload : {digit}});}}>{digit}</button>;
}

export default DigitsButton