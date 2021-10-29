import '../css/style.scss';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { multiply, divide, sum, minus } from './helper';

/**
 * Actiontypes
 */

//numbers

const INPUTNUMBER = 'INPUTNUMBER';

//operators

const INPUTDECIMAL = 'INPUTDECIMAL';
const INPUTERASE = 'INPUTERASE';
const INPUTMULTIPLY = 'INPUTMUPLTIPLY';
const INPUTDIVIDE = 'INPUTDIVIDE';
const INPUTSUM = 'INPUTSUM';
const INPUTMINUS = 'INPUTMINUS';
const INPUTEQUALS = 'INPUTEQUALS';

/**
 * Action Creators
 */

const inputNumber = (payload) => ({
  type: INPUTNUMBER,
  payload: {
    number: payload,
  },
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
  payload: 'MUL',
});
const inputDivide = () => ({
  type: INPUTDIVIDE,
  payload: 'DIV',
});
const inputSum = () => ({
  type: INPUTSUM,
  payload: 'SUM',
});
const inputMinus = () => ({
  type: INPUTMINUS,
  payload: 'MIN',
});
const inputEquals = () => ({
  type: INPUTEQUALS,
  payload: 'EQ',
});

/**
 * Initial State
 */

const initialState = {
  number: '0',
};

/**
 * Reducer
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUTNUMBER:
      if (state.number === '0') {
        return {
          ...state,
          number: action.payload.number,
          render: 'number',
        };
      } else {
        return {
          ...state,
          number: state.number + action.payload.number,
          render: 'number',
        };
      }

    //operators

    case INPUTMULTIPLY:
    case INPUTDIVIDE:
    case INPUTSUM:
    case INPUTMINUS:
    case INPUTEQUALS:
      switch (state.payload) {
        case 'MUL':
          return {
            ...state,
            number: '0',
            total: multiply(state.total, Number(state.number)),
            render: 'total',
            payload: action.payload,
          };
        case 'DIV':
          return {
            ...state,
            number: '0',
            total: divide(state.total, Number(state.number)),
            render: 'total',
            payload: action.payload,
          };
        case 'SUM':
          return {
            ...state,
            number: '0',
            total: sum(state.total, Number(state.number)),
            render: 'total',
            payload: action.payload,
          };
        case 'MIN':
          return {
            ...state,
            number: '0',
            total: minus(state.total, Number(state.number)),
            render: 'total',
            payload: action.payload,
          };
        case 'EQ':
          return {
            ...state,
            render: 'total',
            payload: action.payload,
          };
        default:
          return {
            ...state,
            number: '0',
            total: Number(state.number),
            render: 'total',
            payload: action.payload,
          };
      }

    //not working 100%
    case INPUTDECIMAL:
      if (state.number.toString().includes('.')) {
        return state;
      } else {
        return { ...state, number: [state.number + '.'] };
      }
    case INPUTERASE:
      return (state = initialState);
    default:
      return state;
  }
};

/**
 * Store
 */

const myStore = createStore(reducer, applyMiddleware(logger));

/**
 * Render
 */

const renderNumber = () => {
  myStore.getState().render === 'total'
    ? ((document.querySelector('.display p').innerHTML =
        myStore.getState().total),
      10)
    : ((document.querySelector('.display p').innerHTML =
        myStore.getState().number),
      10);
};
myStore.subscribe(renderNumber);
renderNumber();

/**
 * Dispatch
 */

//numbers

document.querySelector('.numbers').onclick = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('btn')) {
    myStore.dispatch(inputNumber(e.target.outerText));
  }
};

//operators

document.querySelector('.btnMultiply').onclick = () =>
  myStore.dispatch(inputMultiply());
document.querySelector('.btnDivide').onclick = () =>
  myStore.dispatch(inputDivide());
document.querySelector('.btnSum').onclick = () => myStore.dispatch(inputSum());
document.querySelector('.btnMinus').onclick = () =>
  myStore.dispatch(inputMinus());
document.querySelector('.btnEquals').onclick = () =>
  myStore.dispatch(inputEquals());
document.querySelector('.btnDecimal').onclick = () =>
  myStore.dispatch(inputDecimal());
document.querySelector('.btnErase').onclick = () =>
  myStore.dispatch(inputErase());
