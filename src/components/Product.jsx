import React from 'react';
import $ from '../jquery';
var Alias=['a','b','c'];
class ProductTableComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            error:null,
            data:null,
            filterMsg:"",
            isShowStock:false
        }
    }
    getDetailList(filter)
    {
        var DataDetailList=this.state.data;
        return DataDetailList.filter(function(element){
            return element.category===filter;
        }).map(function(li,index){
            //alert(li.name);
            return <div key={index}>{li.name} ||  {li.price}</div>;
        })
    }
    getProductDataFromJson()
    {
        $.get(this.props.url,function(result){
            let ReturnResut;
             if(!this.state.isShowStock)
             {
                ReturnResut=result.filter(function(ele){
                     return (!this.state.filterMsg || ele.name.toLowerCase().indexOf(this.state.filterMsg.toLowerCase())>-1);
                 }.bind(this))
             }
             else
             {
                 ReturnResut=result.filter(function(ele){
                     return ele.stocked===this.state.isShowStock && (!this.state.filterMsg || ele.name.toLowerCase().indexOf(this.state.filterMsg.toLowerCase())>-1)
                 }.bind(this)) 
                 
             }
             this.setState({loading:false,data:ReturnResut});
             console.log('展示数据：'+this.state.data);
        }.bind(this))
    }
    getProductList(){
        var DataList=this.state.data;
        var ProductType=[];
        /*if(DataList)
        {
            DataList.reduce(function(ProductType,element){
                if(ProductType.indexOf(element.category)===0)
                    return ProductType.push(element.category);
                else 
                    return ProductType;
            }.bind(this))
        }*/
        if(DataList)
        {
            DataList.forEach(function(element) {
                if(ProductType.indexOf(element.category)<0)
                     ProductType.push(element.category);
            });
        }

        if(this.state.loading){
            return <span>Loading...</span>;
        }
        else if(this.state.error)
        {
           return <span>Error: {this.state.error.message}</span>
        }
        else
        {
            alert(ProductType);
           return  ProductType.map(function(elem,index){
               return <div key={index}>
               <h1>{elem}</h1>
               {this.getDetailList(elem)}
               </div>;
           }.bind(this))
        }
    }
    render(){
        //var repos;
        var txtMsg="search filter key word!"
        var isShow=this.state.isShowStock;
        console.log('render active!');
        return (<div className="index">
        <div className='notice' ref="divref">product list filter</div>
        <div><input type="text" placeholder={txtMsg} onChange={this.landleChange.bind(this)}/></div>
        <div><label><input type="checkbox" placeholder={txtMsg} checked={isShow} onChange={this.landleChange.bind(this)}/>only show product in stocks</label></div>
        <div>
           {this.getProductList()}
        </div>
        </div>);
    }
    //表单对象一般都用onchange获取用户的输入值，包含text ,textarea,select radio 
    landleChange(event){
        
        if(event.target.type=='text')
        {
            console.log(event.target.value);
            this.setState({filterMsg:event.target.value});
            this.getProductDataFromJson();
        }
        else if(event.target.type=="checkbox")
        {
            console.log(event.target.checked);
            this.setState({isShowStock:event.target.checked});
            this.getProductDataFromJson();
        }
        
        
    }
    //这个方法在类创建时调用，es6 这部分放在构造函数里处理
    /*
    getDefaultProps()
    {
        console.log('getDefaultProps Start');
    }*/
    //这个方法在类创建时调用，es6 这部分放在构造函数里处理
    /*getInitialState()
    {
        console.log('getInitialState start');
    }*/
    componentWillUpdate(){
        console.log('componentWillUpdate start!');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate start!');
    }

    componentWillUnmount(){
        console.log('componentWillUnmount start!');
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps start!');
    }
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate start!');
        return true;
    }

    //设置样式style={{opacity: this.state.opacity}}
    componentDidMount(){
        
        //这里能获取到组件中dom 的元素
        //console.log('findDOMNode:'+ReactDOM.findDOMNode(this.refs.divref));
        /*this.props.promise.then(value=>this.setState({loading:false,data:value}),
                                error=>this.setState({loading:false,error:error}));
        alert(this.state.data);
        
        $.get(this.props.url).done(value=>this.setState({loading:false,data:value}))
        .fail(error=>this.setState({loading:false,error:error}));*/

        console.log('componentDidMount 开始');

         $.get(this.props.url,function(result){
             if(!this.isShowStock)
             {
                this.setState({loading:false,data:result});
             }
             else
             {
                 let ReturnResut=result.filter(function(ele){
                     return ele.stocked===this.isShowStock;
                 })
                 this.setState({loading:false,data:ReturnResut});
             }
        }.bind(this))

        //alert(this.state.loading);
       


    }
}

///ProductTableComponent.propTypes={txtMsg:React.PropTypes.string.isRequired}

export default ProductTableComponent;