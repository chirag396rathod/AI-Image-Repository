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
  prefix,
}) => {
  return (
    <>
      <Form.Item
        required={isRequired}
        tooltip={tooltip}
        label={label}
        size="large"
        validateStatus={
          formik &&
          formik.errors &&
          formik.touched[name] &&
          formik.errors[name] &&
          "error"
        }
        help={
          formik && formik.errors && formik.touched[name] && formik.errors[name]
        }
      >
        {!isPassword ? (
          <Input
            name={name}
            onKeyUp={(e) => {
              formik && formik.setFieldValue([name], e.target.value);
            }}
            prefix={prefix}
            onBlur={() => formik && formik.setFieldTouched([name])}
            placeholder={placeholder}
            status={
              formik &&
              formik.errors &&
              formik.errors[name] &&
              formik.touched[name] &&
              "error"
            }
          />
        ) : (
          <Input.Password
            name={name}
            size="large"
            prefix={prefix}
            onKeyUp={(e) => {
              formik && formik.setFieldValue([name], e.target.value);
            }}
            onBlur={() => formik && formik.setFieldTouched([name])}
            placeholder={placeholder}
            status={
              formik &&
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
