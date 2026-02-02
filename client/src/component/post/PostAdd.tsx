import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";
import type { IPost } from "../../interfaces/postInterface";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// yup schema
const schema = yup.object().shape({
  title: yup.string().required("Title is a required field"),
  content: yup.string().required("Content is a required field"),
  username: yup.string().required("Username is a required field"),
  tags: yup
    .array()
    .of(yup.string().required())
    .min(1, "Please select at least one tag")
    .required("Tags are required"),
});

const PostAdd: React.FC = () => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IPost>({
    resolver: yupResolver(schema),
    defaultValues: {
      tags: [], // MUST be array
    },
  });
  const formValues = watch();
  console.log(formValues);

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const onSubmit = async (data: IPost) => {
    try {
      const send_data = {
        title: data.title,
        content: data.content,
        username: data.username,
        createdAt: new Date(),
        tags: data.tags,
      };
      const response = await axios.post(BACKEND_URL + "api/posts", send_data);

      if (response?.status === 201) {
        setMsg(response.data.message);
        setMsgType("success");
        navigate("/");
      }
    } catch (error: any) {
      if (error.status == 422) {
        setMsg(error?.response?.data?.message);
        setMsgType("error");
      }
    }
  };

  return (
    <Container>
      {msg && (
        <div style={{ color: msgType === "success" ? "green" : "red" }}>
          {msg}
        </div>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              //name="title"
              {...register("title")}
              isInvalid={!!errors.title}
            />

            <Form.Control.Feedback type="invalid">
              {errors.title && <p>{errors.title.message}</p>}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Content</Form.Label>

            <Form.Control
              as="textarea"
              placeholder="content"
              {...register("content")}
              isInvalid={!!errors.content}
            />
            <Form.Control.Feedback type="invalid">
              {errors.content && <p>{errors.content.message}</p>}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              //name="username"
              {...register("username")}
              isInvalid={!!errors.username}
            />

            <Form.Control.Feedback type="invalid">
              {errors.username && <p>{errors.username.message}</p>}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Tags</Form.Label>

            <Form.Select
              multiple
              isInvalid={!!errors.tags}
              {...register("tags")}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );
                setValue("tags", values, { shouldValidate: true });
              }}
            >
              <option value="Suspense">Suspense</option>
              <option value="Informative">Informative</option>
              <option value="Knowledge">Knowledge</option>
              <option value="Religious">Religious</option>
              <option value="Health">Health</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.tags?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
};
export default PostAdd;
