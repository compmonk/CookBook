import { Result } from "antd";

const SuccessResponse = ({ title, subtitle, extra }) => {
  return (
    <Result extra={extra} status="success" subTitle={subtitle} title={title} />
  );
};

export default SuccessResponse;
