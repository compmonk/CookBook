import {
  AppstoreAddOutlined,
  BarsOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import React from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

import { PATHS } from "../constants";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Menu
        items={[
          {
            label: <Typography.Text strong>CookBook</Typography.Text>,
            key: PATHS.HOME,
            icon: <ShopOutlined />,
          },
          {
            label: "Recipes",
            key: PATHS.RECIPE_LIST.replace(":page", 1),
            icon: <BarsOutlined />,
          },
          {
            label: "Add New",
            key: PATHS.RECIPE_ADD,
            icon: <AppstoreAddOutlined />,
          },
        ]}
        mode="horizontal"
        // selectedKeys={[current]}
        onClick={(item) => navigate(item.key)}
      />
    </Container>
  );
};

export default Navigation;
