import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import ErrorResponse from "../components/ErrorResponse";
import SuccessResponse from "../components/SuccessResponse";
import { PATHS } from "../constants";
import { addRecipe } from "../store/recipe";

const RecipeAdd = () => {
  const [form] = Form.useForm();
  const [response, setResponse] = useState({
    status: "pending",
    data: {},
    error: {},
  });
  const onFinish = async (values) => {
    if (values.details) {
      values.details = Object.assign(
        {},
        ...values.details.map((item) => ({ [item.key]: item.value })),
      );
    }
    console.log(values);
    try {
      const data = await addRecipe(values);
      setResponse({
        data,
        status: "success",
      });
      console.log(data);
    } catch (e) {
      console.log(e);
      setResponse({
        error: e,
        status: "fail",
      });
    }
  };
  return response.status === "pending" ? (
    <Space direction="vertical" size="large">
      <Typography.Title level={1}>Add Recipe</Typography.Title>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        style={{ width: 800 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }, { max: 100 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }, { max: 200 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Details" name="details">
          <Form.List name="details">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    // style={{ display: "flex", marginBottom: 8 }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[
                        { required: true, message: "Detail Name is required" },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        { required: true, message: "Detail Value is required" },
                      ]}
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    block
                    icon={<PlusOutlined />}
                    type="dashed"
                    onClick={() => add()}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item label="Ingredients" name="ingredients">
          <Form.List
            name="ingredients"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error("At least 1 ingredient"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Form.Item key={key} required={false}>
                    <Space direction="horizontal" style={{ display: "flex" }}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Ingredient name is required",
                          },
                          {
                            max: 20,
                            message:
                              "Ingredient name is cannot exceed 20 characters",
                          },
                        ]}
                        validateTrigger={["onChange", "onBlur"]}
                      >
                        <Input
                          placeholder="Ingredient Name"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(name)}
                          />
                        ) : null}
                      </>
                    </Space>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    icon={<PlusOutlined />}
                    style={{ width: "100%" }}
                    type="dashed"
                    onClick={() => add()}
                  >
                    Add Ingredient
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="Directions"
          name="directions"
          rules={[{ required: true }, { max: 400 }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button htmlType="submit" type="primary">
            Add
          </Button>
        </Form.Item>
      </Form>
      {response.status === "fail" ? (
        <ErrorResponse error={response.error} />
      ) : null}
    </Space>
  ) : (
    <SuccessResponse
      extra={[
        <Link
          key="view"
          to={PATHS.RECIPE_VIEW.replace(":id", response.data.id)}
        >
          <Button type="link">View Recipe</Button>
        </Link>,
      ]}
      subtitle={`Id: ${response.data.id}, Title: ${response.data.title}`}
      title="Recipe Added Successfully"
    />
  );
};

export default RecipeAdd;
