import * as dotenv from "dotenv";
import { PaginationResponse } from "../contants/contants.js";
import axios from "axios";

dotenv.config();

const handleGetPost = async (req, res) => {
  try {
    const { prompt, pagination } = req.body;

    const page = parseInt(pagination.page);
    const limit = parseInt(pagination.limit);

    const response = await axios({
      url: `${process.env.LAXICA_AI_API}${prompt}`,
      method: "get",
    });
    const data = response.data;
    const result = PaginationResponse(data.images, page, limit);
    res.status(200).json({ result });
  } catch (error) {
    console.log({ error });
    res.status(500).send(error?.response?.data.error.message);
  }
};

export { handleGetPost };
