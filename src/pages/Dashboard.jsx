import React from "react";

export default function Dashboard({ uidState }) {
  const [uid, setUid] = uidState;

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setUid(null)}>Logout</button>
    </div>
  );
}
