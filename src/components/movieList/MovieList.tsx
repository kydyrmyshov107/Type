import axios from "axios";
import { FC, useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import styled from "styled-components";
const url = import.meta.env.VITE_BACKEND_URL;

interface Todo {
  _id: number;
  title: string;
  img: string;
  rating: number;
}
const MovieList: FC<{ todo: Todo[]; getRequest: () => void }> = ({
  todo,
  getRequest,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [values, setValues] = useState({
    title: "",
    img: "",
    rating: "",
  });

  const deleteRequest = async (id: number) => {
    await axios.delete(`${url}/${id}`);
    getRequest();
  };

  const [isEdit, setIsEdit] = useState<number | null>(null);

  const edit = (item: Todo) => {
    // setValues(item);
    setIsEdit(item._id);
  };

  const saveMovie = async (id: number) => {
    const newData = {
      title: values.title,
      img: values.img,
      rating: values.rating,
    };
    await axios.patch(`${url}/${id}`, newData);
    setIsEdit(0);
    getRequest();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const Stylemap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `;
  const StyleRender = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #7fb4ff;
    border-radius: 20px;
    img {
      width: 200px;
      height: auto;
    }
  `;

  return (
    <Stylemap>
      {todo.map((item) => (
        <StyleRender key={item._id}>
          {isEdit === item._id ? (
            <>
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

              <button onClick={() => saveMovie(item._id)}>save</button>
              <button onClick={() => setIsEdit(null)}>cancel</button>
            </>
          ) : (
            <>
              <p>{item.title}</p>
              <img src={item.img} alt="" />
              <p>{item.rating}</p>
              <Button onClick={() => edit(item)}>isEdit</Button>
              <Button
                variant="contained"
                onClick={() => deleteRequest(item._id)}
              >
                delete
              </Button>
            </>
          )}
        </StyleRender>
      ))}
    </Stylemap>
  );
};

export default MovieList;
