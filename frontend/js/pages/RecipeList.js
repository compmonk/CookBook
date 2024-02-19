import {Button, Space, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import {PATHS,} from "../constants";
import {getRecipes} from "../store/recipe";

const RecipeList = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recipesData, setRecipesData] = useState({
    count: 0,
    previous: "",
    next: "",
    results: [],
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getRecipes(page);
        setRecipesData(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    };

    getData();
  }, [page]);

  const columns = [
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (_, record) =>
        record.description.length >= 100
          ? `${record.description.slice(0, 100)}...`
          : record.description,
    },
    {
      key: "actions",
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <Link to={PATHS.RECIPE_VIEW.replace(":id", record.id)}>
          <Button size="small" type="link">
            View Recipe{" "}
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{display: "flex"}} size="large">
      <Typography.Title level={1}>Recipes</Typography.Title>
      <Table
        columns={columns}
        dataSource={recipesData.results}
        loading={isLoading}
        pagination={{
          total: recipesData.count,
          defaultCurrent: page,
          showSizeChanger: false,
          onChange: (pageNo) => {
            navigate(PATHS.RECIPE_LIST.replace(":page", pageNo));
          },
        }}
        size="small"
      />
    </Space>
  );
};

export default RecipeList;
