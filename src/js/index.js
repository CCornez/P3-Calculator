import "../css/style.scss";
import * as redux from "redux";
import { multiply, divide, sum, minus } from "./helper";

/**
 * Actiontypes
 */

//numbers

const INPUTONE = "INPUTONE";
const INPUTTWO = "INPUTTWO";
const INPUTTHREE = "INPUTTHREE";
const INPUTFOUR = "INPUTFOUR";
const INPUTFIVE = "INPUTFIVE";
const INPUTSIX = "INPUTSIX";
const INPUTSEVEN = "INPUTSEVEN";
const INPUTEIGHT = "INPUTEIGHT";
const INPUTNINE = "INPUTNINE";
const INPUTZERO = "INPUTZERO";

//operators

const INPUTDECIMAL = "INPUTDECIMAL";
const INPUTERASE = "INPUTERASE";
const INPUTMULTIPLY = "INPUTMUPLTIPLY";
const INPUTDIVIDE = "INPUTDIVIDE";
const INPUTSUM = "INPUTSUM";
const INPUTMINUS = "INPUTMINUS";
const INPUTEQUALS = "INPUTEQUALS";

/**
 * Action Creators
 */

//numbers

const inputOne = () => ({
  type: INPUTONE,
});
const inputTwo = () => ({
  type: INPUTTWO,
});
const inputThree = () => ({
  type: INPUTTHREE,
});
const inputFour = () => ({
  type: INPUTFOUR,
});
const inputFive = () => ({
  type: INPUTFIVE,
});
const inputSix = () => ({
  type: INPUTSIX,
});
const inputSeven = () => ({
  type: INPUTSEVEN,
});
const inputEight = () => ({
  type: INPUTEIGHT,
});
const inputNine = () => ({
  type: INPUTNINE,
});
const inputZero = () => ({
  type: INPUTZERO,
});

//operators

const inputDecimal = () => ({
  type: INPUTDECIMAL,
});
const inputErase = () => ({
  type: INPUTERASE,
});
const inputMultiply = () => ({
  type: INPUTMULTIPLY,
});
const inputDivide = () => ({
  type: INPUTDIVIDE,
});
const inputSum = () => ({
  type: INPUTSUM,
});
const inputMinus = () => ({
  type: INPUTMINUS,
});
const inputEquals = () => ({
  type: INPUTEQUALS,
});

/**
 * Initial State
 */

const initialState = {
  number: 0,
};

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //numbers
    case INPUTONE:
      return {
        ...state,
        number: parseInt([state.number + "1"], 10),
        render: "number",
      };
    case INPUTTWO:
      return {
        ...state,
        number: parseInt([state.number + "2"]),
        render: "number",
      };
    case INPUTTHREE:
      return {
        ...state,
        number: parseInt([state.number + "3"]),
        render: "number",
      };
    case INPUTFOUR:
      return {
        ...state,
        number: parseInt([state.number + "4"]),
        render: "number",
      };
    case INPUTFIVE:
      return {
        ...state,
        number: parseInt([state.number + "5"]),
        render: "number",
      };
    case INPUTSIX:
      return {
        ...state,
        number: parseInt([state.number + "6"]),
        render: "number",
      };
    case INPUTSEVEN:
      return {
        ...state,
        number: parseInt([state.number + "7"]),
        render: "number",
      };
    case INPUTEIGHT:
      return {
        ...state,
        number: parseInt([state.number + "8"]),
        render: "number",
      };
    case INPUTNINE:
      return {
        ...state,
        number: parseInt([state.number + "9"]),
        render: "number",
      };
    case INPUTZERO:
      return {
        ...state,
        number: parseInt([state.number + "0"]),
        render: "number",
      };

    //operators (needs work) !not working as intended!

    case INPUTMULTIPLY:
      if (state.total || state.total === 0) {
        return {
          ...state,
          number: 0,
          total: multiply(state.total, state.number),
          render: "total",
        };
      } else {
        console.log(state.total);
        return { ...state, number: 0, total: state.number };
      }
    case INPUTDIVIDE:
      if (state.total) {
        return {
          ...state,
          number: 0,
          total: divide(state.total, state.number),
          render: "total",
        };
      } else {
        return { ...state, number: 0, total: state.number };
      }
    case INPUTSUM:
      if (state.total) {
        return {
          ...state,
          number: 0,
          total: sum(state.total, state.number),
          render: "total",
        };
      } else {
        return { ...state, number: 0, total: state.number };
      }
    case INPUTMINUS:
      if (state.total) {
        return {
          ...state,
          number: 0,
          total: minus(state.total, state.number),
          render: "total",
        };
      } else {
        return { ...state, number: 0, total: state.number };
      }
    default:
      return state;
  }
};

/**
 * Store
 */

const myStore = redux.createStore(reducer);

/**
 * Render
 */

const renderNumber = () => {
  myStore.getState().render === "total"
    ? ((document.querySelector(".display p").innerHTML =
        myStore.getState().total),
      10)
    : ((document.querySelector(".display p").innerHTML =
        myStore.getState().number),
      10);
};
myStore.subscribe(renderNumber);
renderNumber();

/**
 * Dispatch
 */

//numbers

document.querySelector(".btn1").onclick = () => myStore.dispatch(inputOne());
document.querySelector(".btn2").onclick = () => myStore.dispatch(inputTwo());
document.querySelector(".btn3").onclick = () => myStore.dispatch(inputThree());
document.querySelector(".btn4").onclick = () => myStore.dispatch(inputFour());
document.querySelector(".btn5").onclick = () => myStore.dispatch(inputFive());
document.querySelector(".btn6").onclick = () => myStore.dispatch(inputSix());
document.querySelector(".btn7").onclick = () => myStore.dispatch(inputSeven());
document.querySelector(".btn8").onclick = () => myStore.dispatch(inputEight());
document.querySelector(".btn9").onclick = () => myStore.dispatch(inputNine());
document.querySelector(".btn0").onclick = () => myStore.dispatch(inputZero());

//operators

document.querySelector(".btnMultiply").onclick = () =>
  myStore.dispatch(inputMultiply());
document.querySelector(".btnDivide").onclick = () =>
  myStore.dispatch(inputDivide());
document.querySelector(".btnSum").onclick = () => myStore.dispatch(inputSum());
document.querySelector(".btnMinus").onclick = () =>
  myStore.dispatch(inputMinus());
