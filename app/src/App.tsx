import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
              <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
