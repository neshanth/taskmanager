import { useEffect, useState } from "react";
import api from "../../api/api";
import TaskForm from "./TaskForm";
import { Link } from "react-router-dom";
import "./tasks.css";
import Popup from "../popup/Popup";
import { useContext } from "react";
import { UserContext } from "../../context";
import Spinner from "../spinner/Spinner";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const { loading, setLoading } = useContext(UserContext);

  const getTasks = async () => {
    setLoading(true);
    const response = await api.get("/api/tasks");
    const tasks = response.data.tasks;
    setTasks([...tasks]);
    setLoading(false);
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks([...filteredTasks]);
      setTaskId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelDelete = () => {
    setTaskId(null);
  };

  const toggleStatus = async (id) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status };
        } else {
          return { ...task };
        }
      });
      setTasks([...updatedTasks]);
      await api.patch(`api/tasks/status/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <ul className="list-group">
            {tasks.map((task) => {
              return (
                <li key={task.id} className="list-group-item d-flex align-items-baseline justify-content-between">
                  <div className={`task-data d-flex align-items-center ${task.status ? "task-complete" : ""}`}>
                    <input type="checkbox" onChange={() => toggleStatus(task.id)} checked={task.status} className="mx-4 check-box" />
                    <p className="my-2">{task.task}</p>
                  </div>
                  <div className="task-actions">
                    <Link to={`/dashboard/tasks/edit/${task.id}`}>
                      <i className="fa-solid fa-pencil edit-btn mx-2" />
                    </Link>
                    <button className="btn btn-delete" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setTaskId(task.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    {/* <button onClick={() => console.log(task.id)} className="fa-solid fa-trash delete-btn mx-2" data-bs-toggle="modal" data-bs-target="#deleteModal" /> */}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="add-task mt-2">
            <i className="fa-solid fa-plus add-btn" data-bs-toggle="modal" data-bs-target="#taskModal" />
          </div>
        </div>
      </div>
      <TaskForm getTasks={getTasks} />
      <Popup successCallback={deleteTask} failiureCallback={cancelDelete}>
        <h5>Do You want to Delete The Task ?</h5>
      </Popup>
    </>
  );
};

export default Tasks;
