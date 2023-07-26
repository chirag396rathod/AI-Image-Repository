import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Form, Input, Button } from "antd";
import {
  CheckCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { ROUTE_HOME_PAGE, ROUTE_SIGN_UP } from "../../../routes/routes";
import { LoginSidebarIcon, Logo } from "../../../assets/Images";
import { AuthContainer } from "../../../globle-stled";
import FormInput from "../../../Components/FormInput";
import { Toast } from "../../../Components/Toater";

const LoginShema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter a valid password."
    ),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginShema,
    onSubmit: async (data) => {
      const requiredObj = {
        email: data.email,
        password: data.password,
      };
      try {
        setLoading(true);
        const response = await axios({
          url: `${import.meta.env.VITE_BASE_API_URL}/sign-in`,
          method: "POST",
          data: {
            ...requiredObj,
          },
        });
        const { user, jwttoken } = response.data;
        if (response.status === (201 || 200)) {
          localStorage.setItem("access_token", jwttoken);
          localStorage.setItem("user_email", user.email);
          localStorage.setItem("user_id", user.id);
          Toast({ type: "success", massage: "Login successfully!" });
          window.location.href = ROUTE_HOME_PAGE;
        }
        setLoading(false);
      } catch (err) {
        if (err) {
          const {
            data: { error },
          } = err.response;

          Toast({ type: "error", massage: error });
          setLoading(false);
        }
      }
    },
  });
  return (
    <AuthContainer>
      <div className="row">
        <div className="col-8 main-content">
          <Card bordered={false} style={{ width: 450 }}>
            <header>
              <div className="logo-header">
                <img src={Logo} alt="" />
                <span>AI Image Repository</span>
              </div>
              <div className="label-desc">
                <div className="signin-title">Sign In</div>
                <div className="sub-info-title">
                  Please sign in to your account.
                </div>
              </div>
            </header>
            <main>
              <form onSubmit={formik.handleSubmit}>
                <FormInput
                  label="Email address"
                  isRequired
                  tooltip="Email address is a required field"
                  placeholder="jone.duo@gmail.com"
                  name="email"
                  formik={formik}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
                <FormInput
                  isPassword
                  isRequired
                  placeholder="Enter a password"
                  label="Password"
                  tooltip="Password is a required field"
                  name="password"
                  formik={formik}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  className="mt-3"
                  htmlType="submit"
                  disabled={loading}
                  loading={loading}
                >
                  Sign In
                </Button>
              </form>
              <div className="account-info-link">
                Don't have an accoun?
                <Link to={ROUTE_SIGN_UP}>
                  <Button type="link">Sign Up</Button>
                </Link>
              </div>
            </main>
          </Card>
        </div>
        <div className="col-4 sidebar">
          <div className="info-text">
            Welcome back in <br />
            AI Image Repository
          </div>
          <div className="info-image">
            <img src={LoginSidebarIcon} alt="LoginSidebarIcon" />
          </div>
          <div className="benefits-section">
            <div className="benefit-title">Benefits</div>
            <div className="benefit-item">
              <CheckCircleOutlined />
              <span className="text">Personalized AI Avatars</span>
            </div>
            <div className="benefit-item">
              <CheckCircleOutlined />
              <span className="text">Enhanced Visual Content</span>
            </div>
            <div className="benefit-item">
              <CheckCircleOutlined />
              <span className="text">Inspiring Text Prompts</span>
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
