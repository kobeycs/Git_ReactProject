import * as Actions from '../constants/ActionTypes';

const initialState=[{
    text:'Use Redux',
    completed:false,
    id:0
}];

export default function todos(state=initialState,action){
    switch (action.type) {
        case Actions.ADD_TODO:
            return [{
                text:action.text,
                completed:false,
                id:state.reduce((maxid,todo)=>
                    Math.max(maxid,todo.id),-1)+1
            },...state];
        case Actions.DELETE_TODO:
            return state.filter((todo)=>
            todo.id!==action.id
            )
        case Actions.EDIT_TODO:
            return state.map(todo=>{
                if(todo.id===action.id)
                {
                    return {
                        id:todo.id,
                            completed:todo.completed,
                            text:action.text
                        }
                }
                else
                    return todo;
            }
            )
        case Actions.COMPLETE_ALL:
            const areAllMarked=state.every(todo=>todo.completed);
            return state.map(todo=>{
                return {
                        id:todo.id,
                        completed:!areAllMarked,
                        text:todo.text
                    }
            })
        case Actions.COMPLETE_TODO:
            return state.map(todo=>{
                if(todo.id===action.id){
                    return {
                        id:todo.id,
                        completed:!todo.completed,
                        text:todo.text
                    }
                }else
                    {
                        return todo;
                    }
            })
        case Actions.CLEAN_COMPLETED:
            return state.filter(todo=>todo.completed===false);
        default:
            return state;
    }
}
