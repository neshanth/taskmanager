import { useState } from "react";
import api from "../../api/api";

const TaskForm = ({ getTasks }) => {
  const [taskData, setTaskData] = useState({ task: "", description: "", due_date: "" });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/tasks", taskData);
      getTasks();
      setTaskData({ task: "", description: "", due_date: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    setTaskData({ task: "", description: "", due_date: "" });
  };

  return (
    <div className="modal fade" id="taskModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="taskModal">
              New Task
            </h5>
            <button type="button" onClick={clearForm} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
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
                <button className="btn btn-custom-primary" data-bs-dismiss="modal">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
