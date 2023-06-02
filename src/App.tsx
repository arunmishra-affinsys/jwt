import Routes from "./routes/routes";
import { AuthProvider } from "./helpers/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { setAuthToken } from "./helpers/setAuthToken";

function App(): JSX.Element {
  // check jwt token
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <div className="App">
      <ErrorBoundary>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
