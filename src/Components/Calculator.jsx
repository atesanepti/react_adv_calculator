import React, { useReducer } from "react";
import DigitsButton from "./DigitsButton";
import OperationButton from "./OperationButton";
import evaluate from "../assets/lib/functions.js";
export const ACTIONS = {
  ADD_DIGITS: "add_digits",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  DELETE_DIGITE: "delete_digit",
  EVALUATE: "evaluate",
};

const reduce = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if (payload.digit == "0" && state.currentOperand == "0") {
        return state;
      }
      if (state.currentOperand != null && payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      if(state.currentOperand != null && state.currentOperand.length > 13){
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGITE:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        };
      }
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(
          0,
          state.currentOperand.length - 1
        ),
      };
    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
        overwrite: true,
      };
  }
};

const Calculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reduce,
    {}
  );
  return (
    <div className="bg-white p-3 rounded-lg" id="calculator-grid">
      <div
        className="bg-slate-600 p-3 flex flex-col items-end justify-around"
        id="display"
      >
        <div className="text-xl font-medium text-slate-100">
          {previousOperand}
          {operation}
        </div>
        <div className="text-4xl font-semibold text-white">{currentOperand}</div>
      </div>
      <button id="span-2" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        ALL
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGITE })}>
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitsButton digit="1" dispatch={dispatch} />
      <DigitsButton digit="2" dispatch={dispatch} />
      <DigitsButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitsButton digit="4" dispatch={dispatch} />
      <DigitsButton digit="5" dispatch={dispatch} />
      <DigitsButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitsButton digit="7" dispatch={dispatch} />
      <DigitsButton digit="8" dispatch={dispatch} />
      <DigitsButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitsButton digit="." dispatch={dispatch} />
      <DigitsButton digit="0" dispatch={dispatch} />
      <button id="span-2" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
        =
      </button>
    </div>
  );
};

export default Calculator;
