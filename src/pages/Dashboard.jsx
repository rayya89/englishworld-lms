// Project files
import { useUser } from "../state/UserContext";

export default function Dashboard() {
  const { setUser } = useUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}
