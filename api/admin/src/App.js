import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import VideoLists from "./pages/videoLists/VideoLists";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import NewList from "./pages/newList/NewList";
import VideoList from "./pages/videoList/VideoList";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ReactNotifications />
          {user && user.isAdmin ? <Redirect to={"/home"} /> : <Login />}
        </Route>
        {user && user.isAdmin ?
          <>
            <ReactNotifications />
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <ProductList />
              </Route>
              <Route path="/movie/:movieId">
                <Product />
              </Route>
              <Route path="/newmovie">
                <NewProduct />
              </Route>
              <Route path="/lists">
                <VideoLists />
              </Route>
              <Route path="/list/:listId">
                <VideoList />
              </Route>
              <Route path="/newlist">
                <NewList />
              </Route>
            </div>
          </> : <>
            <Redirect to={"/"} />
          </>
        }
      </Switch>
    </Router>
  );
}

export default App;
