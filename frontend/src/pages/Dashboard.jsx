import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => {
        setTasks(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Błąd axios GET:", err);
        setTasks([]);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Tytuł jest wymagany");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Błąd axios POST:", err);
      alert("Nie udało się dodać zadania");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista zadań</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Tytuł zadania"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Opis zadania"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Dodaj zadanie
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            {task.description ? ` - ${task.description}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;