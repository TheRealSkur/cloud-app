import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => {
        console.log("DANE Z API:", res.data);
        setTasks(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Błąd axios:", err);
        setTasks([]);
      });
  }, []);

  return (
    <div>
      <h1>Lista zadań</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;