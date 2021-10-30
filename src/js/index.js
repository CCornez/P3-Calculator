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
  payload: {
    operator: 'MUL',
    sign: 'x',
  },
});
const inputDivide = () => ({
  type: INPUTDIVIDE,
  payload: {
    operator: 'DIV',
    sign: '&#247',
  },
});
const inputSum = () => ({
  type: INPUTSUM,
  payload: {
    operator: 'SUM',
    sign: '+',
  },
});
const inputMinus = () => ({
  type: INPUTMINUS,
  payload: {
    operator: 'MIN',
    sign: '-',
  },
});
const inputEquals = () => ({
  type: INPUTEQUALS,
  payload: {
    operator: 'EQ',
    sign: '=',
  },
});

/**
 * Initial State
 */

const initialState = {
  number: '0',
  sign: '',
};

/**
 * Reducer
 */

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INPUTNUMBER:
      if (state.number === '0') {
        return {
          ...state,
          number: payload.number,
          render: 'number',
        };
      } else {
        return {
          ...state,
          number: state.number + payload.number,
          render: 'number',
        };
      }
    case INPUTDECIMAL:
      if (state.number.includes('.')) {
        return state;
      } else {
        if (state.number === '') {
          return {
            ...state,
            number: state.number + '0.',
            render: 'number',
          };
        } else {
          return {
            ...state,
            number: state.number + '.',
            render: 'number',
          };
        }
      }
    case INPUTERASE:
      return initialState;

    //operators

    case INPUTMULTIPLY:
    case INPUTDIVIDE:
    case INPUTSUM:
    case INPUTMINUS:
    case INPUTEQUALS:
      if (state.number === '') {
        return {
          ...state,
          operator: payload.operator,
          sign: payload.sign,
        };
      } else {
        switch (state.operator) {
          case 'MUL':
            return {
              ...state,
              number: '',
              total: multiply(state.total, Number(state.number)),
              render: 'total',
              operator: payload.operator,
              sign: payload.sign,
            };
          case 'DIV':
            return {
              ...state,
              number: '',
              total: divide(state.total, Number(state.number)),
              render: 'total',
              operator: payload.operator,
              sign: payload.sign,
            };
          case 'SUM':
            return {
              ...state,
              number: '',
              total: sum(state.total, Number(state.number)),
              render: 'total',
              operator: payload.operator,
              sign: payload.sign,
            };
          case 'MIN':
            return {
              ...state,
              number: '',
              total: minus(state.total, Number(state.number)),
              render: 'total',
              operator: payload.operator,
              sign: payload.sign,
            };
          case 'EQ':
            return {
              ...state,
              number: '',
              render: 'total',
              operator: payload.operator,
              sign: payload.sign,
            };
          default:
            return {
              ...state,
              number: '',
              total: Number(state.number),
              render: 'total',
              operator: payload.operator,
              sign: payload.sign,
            };
        }
      }
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
  if (myStore.getState().render === 'total') {
    console.log('render');
    document.querySelector('.display h2').innerHTML = myStore.getState().total;
    document.querySelector('.display p').innerHTML = myStore.getState().sign;
  } else {
    document.querySelector('.display h2').innerHTML = myStore.getState().number;
    document.querySelector('.display p').innerHTML = myStore.getState().sign;
  }
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
