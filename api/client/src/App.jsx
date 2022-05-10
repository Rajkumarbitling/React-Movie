import "./App.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../src/authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Home /> : <Navigate to="/register" />
            }
          ></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          ></Route>
          {user && (
            <>
              <Route path="/series" element={<Home type="series" />}></Route>
              <Route path="/movies" element={<Home type="movies" />}></Route>
              <Route path="/watch" element={<Watch />}></Route>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
