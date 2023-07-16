import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Input, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

import { LoginSidebarIcon, Logo } from "../../../assets/Images";
import { ROUTE_HOME_PAGE, ROUTE_SIGN_IN } from "../../../routes/routes";
import { AuthContainer } from "../../../globle-stled";
import FormInput from "../../../Components/FormInput";
import axios from "axios";
import { Toast } from "../../../Components/Toater";

const RegistrationShema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!")
    .min(3, "Full Name is too short!")
    .max(50, "Full Name is too Long!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Please enter a valid password."
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm Passwords must match")
    .required("Confirm Passwords is required!"),
});

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: RegistrationShema,
    onSubmit: async (data) => {
      const requiredObj = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      try {
        setLoading(true);
        const response = await axios({
          url: `${import.meta.env.VITE_BASE_API_URL}/sign-up`,
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
          window.location.href = ROUTE_HOME_PAGE;
          Toast({ type: "success", massage: "Login successfully!" });
        }
        setLoading(false);
      } catch (err) {
        const {
          data: { error },
        } = err.response;

        Toast({ type: "error", massage: error });
        setLoading(false);
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
                <div className="signin-title">Sign Up</div>
                <div className="sub-info-title">
                  Please create your account to expolre AI image repository.
                </div>
              </div>
            </header>
            <main>
              <form onSubmit={(e) => formik.handleSubmit(e)}>
                <FormInput
                  label="Full name"
                  isRequired
                  tooltip="Full name is a required field"
                  placeholder="Jone duo"
                  name="name"
                  formik={formik}
                />
                <FormInput
                  label="Email address"
                  isRequired
                  tooltip="Email address is a required field"
                  placeholder="jone.duo@gmail.com"
                  name="email"
                  formik={formik}
                />
                <FormInput
                  isPassword
                  isRequired
                  placeholder="Enter a password"
                  label="Password"
                  tooltip="Password is a required field"
                  name="password"
                  formik={formik}
                />
                <FormInput
                  isPassword
                  isRequired
                  label="Confirm Password"
                  name="passwordConfirmation"
                  tooltip="Confirm Password is a required field"
                  placeholder="Enter a Confirm password"
                  formik={formik}
                />
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  className="mt-3"
                  htmlType="submit"
                  disabled={loading}
                  loading={loading}
                >
                  Sign Up
                </Button>
              </form>
              <div className="account-info-link">
                Allready have an accoun?
                <Link to={ROUTE_SIGN_IN}>
                  <Button type="link">Sign In</Button>
                </Link>
              </div>
            </main>
          </Card>
        </div>
        <div className="col-4 sidebar">
          <div className="info-text">
            Create account to expolre <br />
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

export default Registration;
