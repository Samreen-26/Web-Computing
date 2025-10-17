import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import confetti from "canvas-confetti";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("Work");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = {
      text: task,
      category,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    if (newTasks[index].completed) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
    setEditingIndex(null);
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(filter.toLowerCase())
  );

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const getCategoryEmoji = (cat) => {
    switch (cat) {
      case "Work":
        return "💼";
      case "Personal":
        return "💖";
      case "Study":
        return "📚";
      default:
        return "✨";
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        fontFamily: "Poppins, sans-serif",
        transition: "0.3s",
      }}
    >
      <div className="card shadow-lg p-4 rounded-4 w-75 border-0"
        style={{ backgroundColor: "#fff9fb" }}>
        <h2 className="text-center mb-3 text-primary fw-bold">
          🐻 Task Buddy
        </h2>

        <p className="text-center text-muted mb-3">
          {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
        </p>

        <div className="progress mb-3" style={{ height: "8px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%`, backgroundColor: "#ff8fab" }}
          ></div>
        </div>
        <p className="text-center small text-muted">
          🎯 {completedCount}/{tasks.length} tasks completed
        </p>

        <div className="d-flex mb-3 gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Add a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <select
            className="form-select w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>
          <button className="btn btn-pink text-white" style={{ backgroundColor: "#ff8fab" }} onClick={addTask}>
            Add 💫
          </button>
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <ul className="list-group">
          {filteredTasks.length === 0 ? (
            <li className="list-group-item text-center text-muted">
              🌸 No tasks found. Add something cute!
            </li>
          ) : (
            filteredTasks.map((t, index) => (
              <li
                key={index}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  t.completed ? "list-group-item-success" : ""
                }`}
                style={{
                  borderRadius: "12px",
                  marginBottom: "6px",
                  backgroundColor: t.completed ? "#e3f8e3" : "#fff",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleComplete(index)}
                    className="form-check-input"
                  />
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={t.text}
                      onChange={(e) => editTask(index, e.target.value)}
                      className="form-control"
                      style={{ width: "70%" }}
                    />
                  ) : (
                    <span
                      onDoubleClick={() => setEditingIndex(index)}
                      style={{
                        textDecoration: t.completed ? "line-through" : "none",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      {getCategoryEmoji(t.category)} {t.text}
                    </span>
                  )}
                </div>

                <button
                  className="btn btn-sm btn-outline-danger rounded-circle"
                  onClick={() => deleteTask(index)}
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
