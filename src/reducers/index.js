import {combineReducers} from 'redux';
import todos from './todos';

const rootReduer=combineReducers({todos});

export default rootReduer;