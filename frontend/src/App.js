import React, { useState, useEffect } from "react";
import { Layout, Menu, theme, Button, Drawer } from "antd";
import axios from "axios";
import { FilterOutlined } from "@ant-design/icons";

// importing components
import { TableUsers } from "./components/Table";
import { Files } from "./components/Files";
import { TableFiles } from "./components/FilesTable";
import { Filter } from "./components/Filter";
import { User } from "./components/User";
import { UserForm } from "./components/UserForm";

const { Header, Content, Footer } = Layout;

// navbar
const items = [
  {
    label: "Nfactorial",
    key: "nfactorial",
  },
  {
    label: "please",
    key: "please",
  },
  {
    label: "apply",
    key: "apply",
  },
  {
    label: "me",
    key: "me",
  },
  {
    label: "PLEASE!",
    key: "dsds",
  },
  {
    label: "Пожалуйста!",
    key: "dsds",
  },

  {
    label: "өтінемін!",
    key: "dsds",
  },
  {
    label: "будь ласка!!!",
    key: "dsds",
  },
];

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (querystring) => {
    let url = "http://localhost:5000/users/list";
    if (querystring) url += querystring;
    await axios
      .get(url)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:5000/upload/list")
      .then((res) => {
        setFiles(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  };

  const onEdit = async (values, id) => {
    await axios.put(`http://localhost:5000/users/update/${id}`, values);
    await fetchData();
  };

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/users/delete/${id}`)
      .then(() => console.log("Successfully deleted"));

    console.log("delete", id);
    await fetchData();
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer, margin: "16px 0" }}
        >
          <h2 style={{ textAlign: "center" }}>Create User</h2>

          <UserForm fetchData={fetchData} />

          <div style={{ padding: 10 }}>
            <div style={{ textAlign: "center" }}>
              <h2>Users List</h2>
              <Button type="primary" onClick={showDrawer}>
                Filter and Sorting
                <FilterOutlined />
              </Button>
            </div>

            <Drawer
              title="Filter and Sorting"
              placement="right"
              onClose={onClose}
              open={open}
            >
              <Filter fetchData={fetchData} onClose={onClose} open={open} />
            </Drawer>
          </div>

          {users.map((user) => (
            <User
              id={user.id}
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
              fetchData={fetchData}
            />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <h2>Users Table</h2>
          <TableUsers data={users} />
        </div>
        <div>
          <h2>Files table</h2>
          <TableFiles data={files} />
          <h2>Upload file</h2>
          <Files fetchData={fetchData} />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>Taizhanov Nurbek ©2023</Footer>
    </Layout>
  );
};

export default App;
