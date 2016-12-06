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
           return  ProductType.map(function(elem){
               return <div>
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
        return (<div className="index">
        <div className='notice'>product list filter</div>
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
            getProductDataFromJson();
        }
        else if(event.target.type=="checkbox")
        {
            console.log(event.target.checked);
            this.setState({isShowStock:event.target.checked});
            getProductDataFromJson();
        }
        
        
    }
    componentWillUpdate(){
        console.log('componentWillUpdate start!');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate start!');
    }

    //设置样式style={{opacity: this.state.opacity}}
    componentDidMount(){
        
        /*this.props.promise.then(value=>this.setState({loading:false,data:value}),
                                error=>this.setState({loading:false,error:error}));
        alert(this.state.data);
        
        $.get(this.props.url).done(value=>this.setState({loading:false,data:value}))
        .fail(error=>this.setState({loading:false,error:error}));*/

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