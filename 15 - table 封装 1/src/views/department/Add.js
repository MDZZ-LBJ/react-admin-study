import React ,{Component} from 'react'
import {message, Form,Input, InputNumber, Radio,Button} from 'antd'

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
            }
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
        if(!value.name){
            message.error('部门名称不能为空')
            return false
        }
        if(!value.number || value.number===0){
            message.error('人员数量不能为0')
            return false
        }
        if(!value.content){
            message.error('描述不能为空')
            return false
        }
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
            this.refs.form.resetFields()
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
            <Form
                  /* 用来获取form对象 */
                  ref="form"
                  /* 点击确定触发 字段为表单的name值 */
                  onFinish={this.onSubmit}
                  /* 布局 */
                  {...this.state.formLayout}
                  /* 设置初始值 要在Form里面使用initialValues设置 不能在Form.Item里面使用defaultValue */
                  initialValues={{number:0,status:true}}

            >
                <Form.Item label='部门名称' name='name'>
                    <Input/>
                </Form.Item>
                <Form.Item label='人员数量' name='number'>
                    <InputNumber min={0} max={100} />
                </Form.Item>
                <Form.Item label='禁启用' name='status'>
                    <Radio.Group  >
                        <Radio value={false}>禁用</Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label='描述' name='content'>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item >
                    <Button loading={this.state.loading} type='primary' htmlType='submit'>确定</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default DepartmentAdd
