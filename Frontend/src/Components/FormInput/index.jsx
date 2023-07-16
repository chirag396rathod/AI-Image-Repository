import React from "react";
import { Form, Input } from "antd";

const FormInput = ({
  label,
  isRequired,
  tooltip,
  placeholder,
  isPassword,
  formik,
  name,
}) => {
  return (
    <>
      <Form.Item
        required={isRequired}
        tooltip={tooltip}
        label={label}
        validateStatus={
          formik && formik.errors && formik.errors[name] && "error"
        }
        help={formik && formik.errors && formik.errors[name]}
      >
        {!isPassword ? (
          <Input
            name={name}
            onKeyUp={(e) => {
              formik && formik.setFieldValue([name], e.target.value);
            }}
            onBlur={() => formik && formik.setFieldTouched([name])}
            placeholder={placeholder}
            status={
              formik.errors &&
              formik.errors[name] &&
              formik.touched[name] &&
              "error"
            }
          />
        ) : (
          <Input.Password
            name={name}
            onKeyUp={(e) => {
              formik && formik.setFieldValue([name], e.target.value);
            }}
            onBlur={() => formik && formik.setFieldTouched([name])}
            placeholder={placeholder}
            status={
              formik.errors &&
              formik.errors[name] &&
              formik.touched[name] &&
              "error"
            }
          />
        )}
      </Form.Item>
    </>
  );
};

export default FormInput;
