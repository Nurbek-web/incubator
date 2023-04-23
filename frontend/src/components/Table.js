import React from "react";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

export const TableUsers = ({ data }) => {
  return (
    <>
      <Table dataSource={data}>
        <Column title="ID" dataIndex="id" key="id" />

        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="email" dataIndex="email" key="email" />
        <Column title="url" dataIndex="url" key="url" />
        <Column
          title="Is programmer"
          dataIndex="isprogrammer"
          key="isprogrammer"
        />
      </Table>
    </>
  );
};
