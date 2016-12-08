import * as Actions from '../constants/ActionTypes';

export const addTodo=text=>({type:Actions.ADD_TODO,text});
export const editTodo=(id,text)=>({type:Actions.EDIT_TODO,id,text});
export const deleteTodo=id=>({type:Actions.DELETE_TODO,id});

export const completeTodo=id=>({type:Actions.COMPLETE_TODO,id});
export const completeAll=()=>({type:Actions.COMPLETE_ALL});
export const clearCompleted=()=>({type:Actions.CLEAN_COMPLETED});