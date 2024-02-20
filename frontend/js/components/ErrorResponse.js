import { Result } from "antd";

const ErrorResponse = ({ error }) => {
  return (
    <Result status="error" title="Error Occured">
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Result>
  );
};

export default ErrorResponse;
