import React, { useState } from "react";
import { Slider, Form, Button, Col, Checkbox, Row, Radio } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

export const Filter = ({ fetchData, onClose, open }) => {
  const [checked, setChecked] = useState(true);

  async function onFinish(values) {
    let querystring = "?";
    if (values.age) {
      querystring += `agemin=${values.age[0]}&agemax=${values.age[1]}&`;
    }
    if (values.pro) {
      if (values.pro.length == 0) setChecked(true);
      else if (values.pro.length == 1) querystring += `pro=${values.pro[0]}&`;
    }
    if (values.sort) querystring += `sort=${values.sort}`;
    fetchData(querystring);
    console.log("Success:", values);
    console.log(querystring);
    onClose();
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
        <Form.Item name="age" label="Age" initialValue={[0, 100]}>
          <Slider range defaultValue={[0, 100]} />
        </Form.Item>

        <Form.Item
          name="pro"
          label="Is programmer?"
          initialValue={["true", "false"]}
        >
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  checked={checked}
                  value="true"
                  style={{ lineHeight: "32px" }}
                >
                  Yes
                </Checkbox>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Checkbox value="false" style={{ lineHeight: "32px" }}>
                  No
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item name="sort" label="Sort by age" initialValue={"1"}>
          <Radio.Group>
            <Radio.Button value="1">
              <ArrowUpOutlined />
            </Radio.Button>
            <Radio.Button value="0">
              <ArrowDownOutlined />
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button type="primary" danger onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
