import { useEffect, useState } from "react";
import { FaPlus, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  fetchTodos,
  fetchUser,
} from "../features/todoSlice";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [inputData, setInputData] = useState("");
  const [toggle, setToggle] = useState(true);
  const [isEdit, setIsEdit] = useState(null);
  const dispatch = useDispatch();
  const items = useSelector((state) => state?.todo?.items);
  const user = useSelector((state) => state?.todo?.user);

  const addItem = () => {
    if (!inputData) {
      return;
    } else if (inputData && !toggle) {
      dispatch(updateTodo(isEdit, { inputData }, token));
      setToggle(true);
      setInputData("");
      setIsEdit(null);
    } else {
      dispatch(addTodo({ inputData, completed: false }, token));
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    dispatch(deleteTodo(id, token));
  };

  const editItem = (id) => {
    const editId = items.find((elem) => elem._id === id);
    setToggle(false);
    setInputData(editId.inputData);
    setIsEdit(id);
  };

  const handleCheckboxChange = (id, completed) => {
    dispatch(updateTodo(id, { completed: !completed }, token));
  };

  useEffect(() => {
    dispatch(fetchTodos(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchUser(token));
  }, [dispatch, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <button style={{ marginLeft: "100%" }} onClick={handleLogout}>
        Logout
      </button>
      <div className="main">
        {user && <h1>Welcome, {user[0]?.firstName}!</h1>}
        <div>
          <h1>To Do</h1>
          <p>Add your list here</p>
        </div>
        <div className="card">
          <input
            placeholder="Add Item..."
            className="input-box"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {toggle ? (
            <button style={{ width: "125px" }} onClick={addItem}>
              <FaPlus style={{ marginRight: "10px" }} />
              ADD
            </button>
          ) : (
            <button style={{ width: "125px" }} onClick={addItem}>
              <FaPencilAlt style={{ marginRight: "10px" }} />
              EDIT
            </button>
          )}
        </div>
        <div className="main-card">
          {items?.map((elem) => (
            <div className="main-div" key={elem._id}>
              <input
                type="checkbox"
                checked={elem.completed}
                onChange={() => handleCheckboxChange(elem._id, elem.completed)}
              />
              {elem.completed ? (
                <del>{` ${elem.inputData}`}</del>
              ) : (
                <span>{` ${elem.inputData}`}</span>
              )}
              <div className="inside-btn">
                <button onClick={() => editItem(elem._id)}>
                  <FaPencilAlt />
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteItem(elem._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Todo;
