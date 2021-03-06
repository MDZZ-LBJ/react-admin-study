import React ,{Component,Fragment} from 'react'
import {message, Form,Input, InputNumber, Radio,Button} from 'antd'
import FormCom from '@/components/form'
//api
import {DepartmentAddApi,Detail,Edit} from '../../api/department'

class DepartmentAdd extends Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            id:'',
            formLayout:{
                labelCol:{span:2},
                wrappCol:{span:22}
            },
            formItem:[
                {
                    type:"Input",
                    label:'部门名称',
                    name:"name",
                    required:true,
                    message:'部门名称不能为空',
                    styles:{width:'200px'},
                    placeholder:'请输入部门名称'
               },
               {
                type:"InputNumber",
                label:'人员数量',
                name:"number",
                min:0,
                max:100,
                required:true,
                styles:{width:'200px'},
             },
             {
                type:"Radio",
                label:'禁启用',
                name:"status",
                required:true,
                styles:{width:'200px'},
                options:[
                    {label:"禁用",value:false},
                    {label:"启用",value:true},
                  ] ,
             },
                {
                    type:"Select",
                    label:'部门名称aa',
                    name:"nameaa",
                    required:true, 
                    options:[
                      {label:"研发部",value:"a"},
                      {label:"行政部",value:"b"},
                    ] ,
                    styles:{ width:'150px'} ,
                    placeholder:'请选择部门'
               },
            ]
        }
    }

    componentWillMount() {
        // 存储路由跳转来的id
        const {state} = this.props.location
        if(state){
            this.setState({
                id:state.id
            })
        }
    }

    componentDidMount() {
        this.getDetail()
    }

    //获取从部门列表跳转过来 获取对应数据
    getDetail=()=>{
        const {id} =this.state
        if(!id) return;
        Detail({id}).then(res=>{
            this.refs.form.setFieldsValue(res.data.data)
        })
    }

    onSubmit=(value)=>{
        this.setState({
            loading:true
        })
        // 添加或编辑
        this.state.id ?  this.onHandleEdit(value) : this.onHandleAdd(value)
    }
    //添加
    onHandleAdd=(value)=>{
        DepartmentAddApi(value).then(res=>{
            const data = res.data
            message.info(data.message)
            //重置表单 需要获取form对象  调用resetFields方法 使用ref来获取
            //this.refs.form.resetFields()
        })
        this.setState({
            loading:false
        })
    }

    //编辑
    onHandleEdit=(value)=>{
        const requestData = value
        requestData.id = this.state.id
        Edit(requestData).then(res=>{
            const data = res.data
            message.info(data.message)
            this.refs.form.resetFields()
        })
        this.setState({
            loading:false
        })
    }

    render(){
       
        return(
            <FormCom formItem={this.state.formItem} formLayout={this.state.formLayout} 
            onSubmit={this.onSubmit}
         ></FormCom>
        )
    }
}

export default DepartmentAdd
