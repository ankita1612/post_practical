import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import type { IPost } from "../../interfaces/postInterface";
interface PostRowProps {
  postData: IPost;
  handleDelete: (id: string) => void;
}

const PostRow = ({ postData, handleDelete }: PostRowProps) => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    return navigate("/post/add/" + id);
  };

  return (
    <>
      {}
      <tr>
        <td>{postData.title}</td>
        <td>{postData.content}</td>
        <td>{postData.username}</td>
        <td>{postData.tags.join(",")}</td>
        <td>{postData.createdAt?.toString()}</td>
        <td>
          <Button onClick={() => handleDelete(postData._id)} variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default PostRow;
