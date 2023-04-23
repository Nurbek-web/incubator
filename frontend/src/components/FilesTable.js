import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

const { Column } = Table;

export const TableFiles = ({ data }) => {
  return (
    <>
      <Table dataSource={data}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="filename" key="name" />
        <Column title="Age" dataIndex="url" key="age" />
      </Table>
    </>
  );
};
