import React, { useState } from "react";
import { Button, Card, Form, Input, Radio, InputNumber } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const User = ({ id, user, onDelete, onEdit, fetchData }) => {
  const [isEdit, setIsEdit] = useState(false);

  async function onFinish(values) {
    if (!values.isprogrammer) values.isprogrammer = null;
    console.log("Success:", values);
    onEdit(values, id);
    setIsEdit(!isEdit);
    fetchData();
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div>
      {isEdit ? (
        <Form
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
            rules={[{ type: "number", min: 0, max: 99 }]}
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
              Edit
            </Button>
            <Button
              type="primary"
              danger
              style={{ margin: 10 }}
              onClick={handleEdit}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Card
          id={user.id}
          key={user.id}
          actions={[
            <DeleteOutlined key="delete" onClick={handleDelete} />,
            <EditOutlined key="edit" onClick={handleEdit} />,
          ]}
          title={user.name}
        >
          <p>
            <b>email: </b>
            {user.email}
          </p>
          <p>
            <b>age: </b>
            {user.age}
          </p>
          <p>
            <b>url: </b>
            {user.url}
          </p>
          <p>
            <b>Is Programmer: </b>
            {user.isprogrammer}
          </p>
          <p>
            <b>id: </b>
            {user.id}
          </p>
        </Card>
      )}
    </div>
  );
};
