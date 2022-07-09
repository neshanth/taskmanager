import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import api from "../../api/api";
import { UserContext } from "../../context";
import Spinner from "../spinner/Spinner";

const EditTaskForm = () => {
  const [taskData, setTaskData] = useState({ task: "", description: "", due_date: "" });
  const { loading, setLoading } = useContext(UserContext);
  const { id } = useParams();
  let history = useHistory();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  useEffect(() => {
    const getTask = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/tasks/${id}`);
        const { task, description, due_date } = response.data;
        setTaskData({ task, description, due_date });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/api/tasks/${id}`, taskData);
      setLoading(false);
      setTaskData({ task: "", description: "", due_date: "" });
      history.push("/dashboard/tasks");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="edit-title text-center">
          <h2>Edit Task</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="task">Task</label>
            <input type="text" name="task" className="form-control" onChange={handleInput} value={taskData.task} />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea name="description" className="form-control" onChange={handleInput} value={taskData.description} />
          </div>
          <div className="mb-3">
            <label htmlFor="due_date">Due Date</label>
            <input type="date" name="due_date" className="form-control" onChange={handleInput} value={taskData.due_date} />
          </div>
          <div className="submit-btn d-flex justify-content-center">
            <Link to="/dashboard/tasks" className="btn">
              Go Back
            </Link>
            <button className="btn btn-custom-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
