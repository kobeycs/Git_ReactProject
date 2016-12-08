import React from 'react';
import classnames from 'classnames';

export default class TodoTextInput extends React.Component{
    constructor(props)
    {
        super(props);
        console.log('props 胡:',this.props);
    }
    static propTypes={
        onSave:React.PropTypes.func.isRequired,
        text:React.PropTypes.string,
        placeholder:React.PropTypes.string.isRequired,
        editing:React.PropTypes.bool,
        newTodo:React.PropTypes.bool
    };

    state={
        text:this.props.text || ''
    };

    render(){
        return (<input className={
            classnames({
                edit:this.props.editing,
                'new-todo':this.props.newTodo,
            })}
            type='text'
            placeholder={this.props.placeholder}
            autoFocus='true'
            value={this.state.text}
            onBlur={this.handleBlur.bind(this)} 
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleSubmit.bind(this)}
            />)
    }

    handleSubmit(e){
        const text=e.target.value.trim();
        if(e.which==13){
            this.props.onSave(text);
            if(this.props.newTodo){
               this.setState({text:''}); 
            }
        }
    }
    handleChange(e){
        this.setState({text:e.target.value});
    }
    handleBlur(e){
        if(!this.props.newTodo)
        {
            this.props.onSave(e.target.value);
        }
    }
}