import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "";

  const fetchTasks = () => {
    axios
      .get(`${API_URL}/tasks`)
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
      await axios.post(`${API_URL}/tasks`, {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Błąd axios DELETE:", err);
      alert("Nie udało się usunąć zadania");
    }
  };

  // 🔥 NOWA FUNKCJA (8.3)
  const toggleCompleted = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.error("Błąd toggle:", err);
    }
  };

  return (
    <div style={{ padding: "20px", color: "#4CAF50" }}>
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
          <li
            key={task.id}
            style={{
              marginBottom: "10px",
              backgroundColor: "#1e1e1e",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #4CAF50",
            }}
          >
            {/* 🔥 ZMIANA FUNKCJI */}
            <strong
              onClick={() => toggleCompleted(task)}
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#888" : "#4CAF50",
              }}
            >
              {task.title}
            </strong>

            {task.description ? ` - ${task.description}` : ""}

            <div style={{ marginTop: "6px" }}>
              <button
                onClick={() => handleDelete(task.id)}
                style={{ padding: "6px 12px", cursor: "pointer" }}
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;