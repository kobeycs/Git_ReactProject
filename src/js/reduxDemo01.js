import {createStore} from 'redux';

function counter(state=0,action){
    switch (action.type) {
        case 'INCRMENT':
            return state+1;
        case 'DECRMENT':
            return state-1;
        default:
            return state;
    }
}

let store=createStore(counter);

store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch({type:'INCRMENT'});
store.dispatch({type:'INCRMENT'});
store.dispatch({type:'DECRMENT'});