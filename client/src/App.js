import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await fetch("http://localhost:5000/api/feedback");
    const data = await res.json();
    setFeedbacks(data);
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message })
    });
    setName("");
    setMessage("");
    fetchFeedbacks();
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", fontFamily: "Arial" }}>
      <h1>💚 Mental Health Support</h1>
      <p>You matter. Share your feelings with us.</p>

      <form onSubmit={submitFeedback}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Share your thoughts..."
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          style={{ width: "100%", padding: "8px" }}
        ></textarea>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>

      <h2>Recent Support Messages</h2>
      {feedbacks.map((fb, idx) => (
        <div key={idx} style={{ background: "#eee", padding: "10px", marginTop: "10px" }}>
          <strong>{fb.name}</strong>
          <p>{fb.message}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
