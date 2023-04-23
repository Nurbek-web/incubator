import React from "react";
import { Button, Form, Input, InputNumber, Radio } from "antd";
import axios from "axios";

export const UserForm = ({ fetchData }) => {
  const [form] = Form.useForm();

  async function onFinish(values) {
    if (!values.isprogrammer) values.isprogrammer = null;
    if (!values.age) values.age = null;
    if (!values.url) values.url = null;

    console.log("Success:", values);
    await axios
      .post("http://localhost:5000/users/adduser", { ...values })
      .then(function (response) {
        console.log(response);
        fetchData();
        form.resetFields();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="age"
        label="Age"
        rules={[{ type: "number", min: 0, max: 100 }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="url"
        label="Url"
        rules={[
          { required: false },
          { type: "url", warningOnly: true },
          { type: "string", min: 6 },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>

      <Form.Item name="isprogrammer" label="Is programmer">
        <Radio.Group>
          <Radio.Button value="true">Yes</Radio.Button>
          <Radio.Button value="false">No</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
