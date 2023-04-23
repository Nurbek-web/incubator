import React from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const Files = ({ fetchData }) => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item name="upload" label="Upload">
          <Upload
            action="http://localhost:5000/upload"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
          <Button style={{ margin: 15 }} type="primary" onClick={fetchData}>
            Refresh List
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
