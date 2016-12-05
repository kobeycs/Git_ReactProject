import React from 'react';
import $ from '../jquery-1.5.1.min';
var Alias=['a','b','c'];
class TestComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            like:true,
            txtMsg:'init msg',
            opacity:1.0,
            username:"",
            lastGistUrl:"",
            loading:true,
            error:null,
            data:null
        }
    }
    render(){
        var text=this.state.like?'Like':'Unlike';
        var txtMsg=this.state.txtMsg;
        //var repos;
        return (<div className="index">
        <div className='notice'>测试我的react 页面</div>
        <ul>
        {
            Alias.map(function(a){
           return <li key={a}>{a}</li>;
            })
        }
        <li>{this.props.name}</li>
        <li>{this.props.sex}</li>
        {
           React.Children.map(this.props.children,function(elem){
            return <li key={elem}>{elem}</li>;
            })
        }
        </ul>
        <input type="text" value={txtMsg} onChange={this.landleChange.bind(this)}/><br/>
        <input type="text" ref="mytext" />
        <input type="button" value="alert msg" onClick={this.handleClick.bind(this)} />
        <br/>
        <div style={{opacity:this.state.opacity,color:"red"}}>I {text} React!</div>
        </div>);
        /*
        <div>
        {this.state.username}'s last gist is <a href={this.state.lastGistUrl}>here</a>.
        </div>
        <div>
            if (this.state.loading) {
                 <span>Loading...</span>
            }
            else if (this.state.error !== null) {
                 <span>Error: {this.state.error.message}</span>
            }
            else {
                this.state.data.map(function (repo) {
                   return <li>
                        <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
                    </li>
                    })
            }
        </div>
         */
    }
    handleClick(){
        console.log('alert msg!');
        this.setState({like:!this.state.like});
        this.refs.mytext.focus();
        this.refs.mytext.value='this is my click event';
        
    }
    //表单对象一般都用onchange获取用户的输入值，包含text ,textarea,select radio 
    landleChange(event){
        console.log(event.target.value);
        this.setState({txtMsg:event.target.value});
    }

    componentWillMount(){
        //console.log('componentWillMount start!');
    }

    //设置样式style={{opacity: this.state.opacity}}
    componentDidMount(){
        
        /*this.props.promise.then(value=>this.setState({loading:false,data:value}),
                                error=>this.setState({loading:false,error:error}));*/

        $.get(this.props.source,function(result){
            alert(result);
            var lastgist=result[0];
            if(this.isMounted())
            {
                this.setState({username:lastgist.owner.login,
                    lastGistUrl:lastgist.html_url});
            }
        }.bind(this))

        this.timer=setInterval(function(){
            var opacity=this.state.opacity;
            opacity -=0.05;
            if(opacity<0.1){
                opacity=1.0;
            }
            this.setState({opacity:opacity});
        }.bind(this),100);
    }
    componentWillUpdate(){
        //console.log('componentWillUpdate start!');
    }
    componentDidUpdate(){
        //console.log('componentDidUpdate start!');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount start!');
    }
    componentWillReceiveProps(){
        //console.log('componentWillReceiveProps start!');
    }
    shouldComponentUpdate(){
        //console.log('shouldComponentUpdate start!');
        return true;
    }
}

TestComponent.defaultProps={};
TestComponent.propTypes={title:React.PropTypes.string.isRequired}

export default TestComponent;