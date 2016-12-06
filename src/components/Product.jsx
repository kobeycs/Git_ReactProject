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
    getProductList(){
        var DataList=this.state.data;
        var ProductType=[];
        ProductType.push(1);
        /*if(DataList)
        {
            DataList.reduce(function(ProductType,element){
                if(ProductType.indexOf(element.category)===0)
                    return ProductType.push(element.category);
                else 
                    return ProductType;
            }.bind(this))
        }*/
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
           return  DataList.map(function(e,i){
                return <li key={i}>{e.name}   {e.price}</li>
            })
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
          <ul> {this.getProductList()}</ul>
        </div>
        </div>);
    }
    //表单对象一般都用onchange获取用户的输入值，包含text ,textarea,select radio 
    landleChange(event){
        
        if(event.target.type=='text')
        {
            console.log(event.target.value);
            this.setState({filterMsg:event.target.value});
        }
        else if(event.target.type=="checkbox")
        {
            console.log(event.target.checked);
            this.setState({isShowStock:event.target.checked});
        }
        
        
    }

    //设置样式style={{opacity: this.state.opacity}}
    componentDidMount(){
        
        /*this.props.promise.then(value=>this.setState({loading:false,data:value}),
                                error=>this.setState({loading:false,error:error}));
        alert(this.state.data);
        
        $.get(this.props.url).done(value=>this.setState({loading:false,data:value}))
        .fail(error=>this.setState({loading:false,error:error}));*/

         $.get(this.props.url,function(result){
           this.setState({loading:false,data:result});
        }.bind(this))

        //alert(this.state.loading);
       


    }
}

///ProductTableComponent.propTypes={txtMsg:React.PropTypes.string.isRequired}

export default ProductTableComponent;