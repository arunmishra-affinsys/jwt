import Routers from "./routes";
import { AuthProvider } from "./pages/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

import { setAuthToken } from "./helpers/setAuthToken";

function App() {
  //check jwt token
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <div className="App">
      <ErrorBoundary>
        <AuthProvider>
          <Routers />
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
