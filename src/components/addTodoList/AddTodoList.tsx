import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieList from "../movieList/MovieList";
// import styled from "styled-components";

const url = import.meta.env.VITE_BACKEND_URL;

interface Todo {
  _id: number;
  title: string;
  img: string;
  rating: number;
}

const AddTodoList = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [values, setValues] = useState({
    title: "",
    img: "",
    rating: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const notify = () => toast.success("write something");
  const error = () => toast.error("write");

  const postRequest = async () => {
    if (values.title === "" || values.img === "" || values.rating === "") {
      error();
      return null;
    } else {
      const response = await (await axios.post(url, values)).data;
      notify();
      setTodo(response);
    }
    setValues({ title: "", img: "", rating: "" });
  };

  const getRequest = async () => {
    const response = (await axios.get(url)).data;
    setTodo(response);
  };

  const deleteAll = async () => {
    (await axios.delete(url)).data;
    setTodo([]);
  };

  useEffect(() => {
    getRequest();
  }, []);

  // const StyleForm = styled.div`
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   gap: 10px;
  //   position: relative;
  //   bottom: 270px;
  // `;
  return (
    <div>
      <div>
        <TextField
          id="title"
          type="text"
          label="Title..."
          variant="standard"
          value={values.title}
          onChange={handleChange}
        />
        <TextField
          id="img"
          type="url"
          label="Image....."
          variant="standard"
          value={values.img}
          onChange={handleChange}
        />
        <TextField
          id="rating"
          type="number"
          label="rating..."
          variant="standard"
          value={values.rating}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={postRequest}>
          Add Movie
        </Button>
        <Button variant="contained" onClick={deleteAll}>
          deleteAll
        </Button>
        <ToastContainer />
        <MovieList todo={todo} getRequest={getRequest} />
      </div>
    </div>
  );
};

export default AddTodoList;
