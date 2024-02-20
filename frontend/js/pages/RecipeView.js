import { Card, Descriptions, List, Skeleton, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getRecipe } from "../store/recipe";

const RecipeView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getRecipe(id);
        setRecipe(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    getData();
  }, [id]);

  return isLoading ? (
    <Skeleton loading={isLoading} />
  ) : (
    <Space direction="vertical" size="middle">
      <Typography.Title level={1}>{recipe.title}</Typography.Title>
      <Descriptions
        column={1}
        items={[
          {
            key: "description",
            label: "Description",
            children: recipe.description,
          },
          {
            key: "details",
            // label: "",
            children: (
              <Descriptions
                column={1}
                items={Object.entries(recipe.details).map(([key, value]) => ({
                  key,
                  label: key,
                  children: value,
                }))}
              />
            ),
          },
          {
            key: "ingredients",
            label: "Ingredients",
            children: (
              <List
                bordered
                dataSource={recipe.ingredients}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
                }}
                renderItem={(item) => <List.Item>{item.name}</List.Item>}
                size="small"
              />
            ),
          },
          {
            key: "directions",
            label: "Directions",
            children: <ul>{recipe.directions.split(".").map((line) => (<li>{line}</li>))}</ul>,
          },
        ]}
      />
      {/* <pre>{JSON.stringify(recipe, null, 2)}</pre> */}
    </Space>
  );
};

export default RecipeView;
