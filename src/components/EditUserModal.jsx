import React, { useEffect, useState } from 'react';
import { Button, Form, Input,Modal } from 'antd';
const EditUserModal = ({ setUsersData, isModalOpen,usersdata, setIsModalOpen,id}) => {
    const [form] = Form.useForm();
    useEffect(()=>{
    const newRes=usersdata?.find(ele=>ele.id==id);
if(isModalOpen){
form.setFieldsValue({
    name:newRes.name,
    email:newRes.email,
    phone:newRes.phone,
    website:newRes.website,
  });
}
    },[isModalOpen])
    //////////Submit Form//////
    const onFinish = (values) => {
        const newRes=usersdata.map((ele)=>{
            if(ele.id===id){
           return {...ele,name:values.name,
            email:values.email,
            phone:values.phone,
            website:values.website
        }
            }else{
                return ele
            }
        })
      setUsersData(newRes);
      setIsModalOpen(false)
      };
  return (
    <Modal title='Edit User' open={isModalOpen} onOk={onFinish} footer={false} onCancel={()=>setIsModalOpen(false)}>
    <div>
         <Form 
          onFinish={onFinish}
         form={form}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
   
  >
    <Form.Item
    
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input user name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        {
          required: true,
          message: 'Please input user email!',
        },
      ]}
    >
      <Input type='email'/>
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input user phone!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="website"
      name="website"
      rules={[
        {
          required: true,
          message: 'Please input user website!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <div className=' flex justify-end gap-2'>
    <Button className='' onClick={()=>setIsModalOpen(false)} >Cancel</Button>
        <Button htmlType='submit' className=' bg-blue-500 text-white'>Ok</Button>
    </div>
  </Form>
    </div>
    </Modal>
  )
}

export default EditUserModal