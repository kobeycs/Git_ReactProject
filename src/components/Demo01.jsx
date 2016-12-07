import React from 'react';

class Demo01 extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            list:[1,2,3,4]
        };
        //提高性能
        this.AddItemFromTopNew=this.AddItemFromTop.bind(this);
        this.DeleteItem=this.DeleteItem.bind(this);
    }

    AddItemFromBottom(){
        this.setState({list:this.state.list.concat([5])});
    }

    AddItemFromTop(){
        this.setState({list:[0].concat(this.state.list)});
    }

    DeleteItem(){
        const CopyList=[...this.state.list];
        CopyList.pop();
        this.setState({list:CopyList});
    }

    render(){
        return <div className="index">
         <div className='notice'>Demo01 list</div>
         {this.state.list.map(function(e,index){
             return <h1 key={index}>{e}</h1>;
         })}
        <button onClick={this.AddItemFromBottom.bind(this)}>尾部插入</button>
        <button onClick={this.AddItemFromTopNew}>头部插入</button>
        <button onClick={this.DeleteItem}>删除DOM</button>
        <button onClick={this.onclickRootMethod.bind(this)}>调用子部件的方法</button>
        <SubDemo ref={e=>this.RootCompont=e} />
        </div>;
    }

    onclickRootMethod(){
        alert('调用子组件的方法');
        console.log('调用子组件的方法');
        console.log(this.RootCompont.onclickMethod);

        this.RootCompont.onclickMethod();
    }

    componentDidMount(){
       console.log( this.RootCompont.rootRef);
    }
}

class SubDemo extends React.Component{
    render(){
        return <h2 ref={e=>this.rootRef=e}> refs test!<div ref={e=>this.leaf=e}>leaf teste!</div></h2>;
    }

    onclickMethod(){
        console.error("子部件方法");
        window.alert('子部件方法');
    }

    componentDidMount(){
       console.log( this.leaf);
    }
}

export default Demo01;