import React, { useEffect, useState } from "react";
import { Card, Empty, Spin } from "antd";

import Modals from "../Modals";
import { CommentModalContainer } from "./styled";
import CommentItem from "./CommentItem";
import CommentInputbox from "./CommentInputbox";
import { apiInstance } from "../../Utils/axios";
import { Toast } from "../Toater";
import { USER_ID } from "../../Utils/constants";

const CommentModal = ({
  isOpen,
  toggle,
  footer,
  data,
  input,
  setInput,
  setPost,
  post,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [CommentData, setCommentData] = useState([]);
  const [isCommentLoading, setCommentLoading] = useState(false);

  const fetchCommentList = async (post_id) => {
    try {
      setLoading(true);
      const response = await apiInstance({
        method: "post",
        url: `${import.meta.env.VITE_BASE__DEV_API_URL}/get-comment`,
        data: {
          post_id: data?._id,
        },
      });
      if (response?.status === 200) {
        setLoading(false);
        setCommentData(response?.data?.data);
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

  const handlePostComment = async ({ input }) => {
    if (!input) {
      return Toast({
        type: "error",
        massage: "Enter some comment massage!",
      });
    }
    try {
      setCommentLoading(true);
      const response = await apiInstance({
        method: "post",
        url: `${import.meta.env.VITE_BASE__DEV_API_URL}/post-comment`,
        data: {
          post_id: post?._id,
          user_id: USER_ID,
          comment: input,
        },
      });
      if (response?.status === 200) {
        setCommentLoading(false);
        setInput("");
        const NewPost = { ...post };
        NewPost.total_comment = parseInt(post?.total_comment) + 1;
        NewPost.comment = [post?.comments];
        setPost(NewPost);
        const newComment = [...CommentData];
        fetchCommentList();
      }
    } catch (error) {
      if (error) {
        setCommentLoading(false);
        Toast({
          type: "error",
          massage:
            error?.response?.data?.error?.message || "Somthing went wrong!",
        });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCommentList(data);
    }
  }, [isOpen]);

  return (
    <Modals isOpen={isOpen} toggle={toggle} title={"Comments"} footer={footer}>
      <CommentModalContainer>
        <Card className="comment-container-card">
          <div className={"comment-container"}>
            {isLoading ? (
              <div className="ant-empty-loading">
                <Spin />
              </div>
            ) : (
              <div className="comment-msg-body">
                {CommentData?.length > 0 ? (
                  <>
                    {CommentData?.map((comment, key) => (
                      <CommentItem data={comment} key={key} />
                    ))}
                  </>
                ) : (
                  <Empty
                    rootClassName="ant-empty-loading"
                    description="No comment data found!"
                  />
                )}
              </div>
            )}
            <CommentInputbox
              data={data}
              input={input}
              setInput={setInput}
              handlePostComment={handlePostComment}
              isCommentLoading={isCommentLoading}
            />
          </div>
        </Card>
      </CommentModalContainer>
    </Modals>
  );
};

export default CommentModal;
