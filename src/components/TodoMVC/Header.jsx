import React from 'react';
import TodoTextInput from './TodoTextInput';

export default class Header extends React.Component{
    static propTypes={
        addTodo:React.PropTypes.func.isRequired
    }
    handleSave=(text)=>{
        if(text.length!==0)
        {
            this.props.addTodo(text);
        }
    }
    render(){
        return (<header className='header'>
        <h1>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave.bind(this)}
                       placeholder='what needs to be done?' />
        </header>)
    }
}