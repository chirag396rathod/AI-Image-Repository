import React, { useState } from "react";
import Sidebar from "./Sidebar";
import * as Yup from "yup";

import { CreateImageContainer } from "./styled";
import ImagePreviwer from "./ImagePreviwer";
import { useFormik } from "formik";
import axios from "axios";

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

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: descriptionShema,
    onSubmit: async (values) => {
      try {
        const respose = await axios({
          url: `${import.meta.env.VITE_BASE_API_URL}/generate-image`,
          method: "post",
          data: {
            prompt: values.description,
            pagination: {
              page: pagination.page || 1,
              limit: pagination.page || 1,
            },
          },
        });
        const { data } = respose.data;
        if (data) {
          console.log({ data });
          setImagesList(data);
        }
      } catch (error) {
        if (error) {
          Toast({
            type: "error",
            massage: error?.response?.data?.error?.message,
          });
          setLoading(false);
        }
      }
    },
  });

  return (
    <CreateImageContainer className="container-fluid">
      <div className="row">
        <div className="col-9">
          <ImagePreviwer
            title={formik.values.description}
            pagination={pagination}
          />
        </div>
        <div className="col-3">
          <Sidebar formik={formik} />
        </div>
      </div>
    </CreateImageContainer>
  );
};

export default CreateImage;
