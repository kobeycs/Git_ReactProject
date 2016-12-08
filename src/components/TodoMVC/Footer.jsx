import React from 'react';
import classnames from 'classnames';
import {SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE} from '../../constants/TodoFilters';

const FILTER_TITLES={
    [SHOW_ALL]:'All',
    [SHOW_COMPLETED]:'Completed',
    [SHOW_ACTIVE]:'Active'
}

export default class Footer extends React.Component{
    static propTypes={
        completedCount:React.PropTypes.number.isRequired,
        activeCount:React.PropTypes.number.isRequired,
        filter:React.PropTypes.string.isRequired,
        onClearCompleted:React.PropTypes.func.isRequired,
        onShow:React.PropTypes.func.isRequired
    }

    renderTodoCount(){
        const {activeCount} =this.props;
        const itemWord=activeCount===1?'item':'items';
        return (<span className='todo-count'>
            <strong>{activeCount+' ' || 'NO ' }</strong>
                  {itemWord} left
        </span>);
    }

    renderFilterLink(filter){
        const title=FILTER_TITLES[filter];
        const {filter:selectedFilter,onShow}=this.props;

        return (<a className={
            classnames({selected:filter===selectedFilter})
                            }
            style={{cursor:'pointer'}}
            onClick={()=>onShow(filter)}
            >{title}</a>);
    }

    renderCleanButton(){
        const {completedCount,onClearCompleted}=this.props;
        if(completedCount>0)
        {
            return (<button className='clear-completed'
                            onClick={onClearCompleted}>
                            Clear Completed</button>);
        }
    }

    render(){
        return (<footer className='footer'>
        {this.renderTodoCount()}
        <ul className='filters'>
        {[SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE].map(filter=>
            <li key={filter}> 
            {this.renderFilterLink(filter)}
            </li>
            )}
        </ul>
        {this.renderCleanButton()}
        </footer>);
    }
}