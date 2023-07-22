import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import * as Yup from "yup";

import { CreateImageContainer } from "./styled";
import { Toast } from "../../Components/Toater";
import ImagePreviwer from "./ImagePreviwer";
import { useFormik } from "formik";
import axios from "axios";
import { ROUTE_CREATE_POST_PAGE } from "../../routes/routes";

const descriptionShema = Yup.object().shape({
  description: Yup.string().required("Description is required."),
});
const CreateImage = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [imagesList, setImagesList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const { page } = useParams();
  const navigator = useNavigate();

  const fetchImages = async (values, page) => {
    setLoading(true);
    try {
      const respose = await axios({
        url: `${import.meta.env.VITE_BASE_API_URL}/generate-image`,
        method: "post",
        data: {
          prompt: values.description || values,
          pagination: {
            page: parseInt(page) || pagination.page,
            limit: 10,
          },
        },
      });
      const { result } = respose.data;
      if (result) {
        setLoading(false);
        setImagesList(result.data);
        if (result?.next?.page) {
          setPagination({
            page: result?.next.page,
            limit: 10,
            total: result?.next.totle,
          });
        } else {
          setPagination({
            page: parseInt(page),
            limit: 10,
            total: pagination.total,
          });
        }
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        Toast({
          type: "error",
          massage:
            error?.response?.data?.error?.message || "Somthing went wrong!",
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: descriptionShema,
    onSubmit: (values) => {
      fetchImages(values);
    },
  });

  const handlePageChange = (e) => {
    navigator(ROUTE_CREATE_POST_PAGE.replace(":page", e));
    fetchImages(formik.values.description, e);
    setPagination({
      page: e,
      ...pagination,
    });
  };

  const handleSelectImage = (id) => {
    setSelectedImage(id);
  };
  return (
    <CreateImageContainer className="container-fluid">
      <div className="row">
        <div className="col-9">
          <ImagePreviwer
            title={formik.values.description}
            pagination={pagination}
            handlePageChange={handlePageChange}
            data={imagesList}
            isLoading={isLoading}
          />
        </div>
        <div className="col-3">
          <Sidebar formik={formik} isLoading={isLoading} />
        </div>
      </div>
    </CreateImageContainer>
  );
};

export default CreateImage;
