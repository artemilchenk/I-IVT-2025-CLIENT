import "./App.css";
import { RouterComponent } from "./router/Component.tsx";
import { useAuth } from "@/modules/auth/context.ts";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) return <div>Loading page</div>;

  return <RouterComponent />;
}

export default App;
