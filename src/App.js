import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from './Pages/Login';
import { GarbageProvider } from './Provider/GarbageProvider';
import { Header } from './Components/Header';
import Register from './Pages/Register';
import Home from './Pages/Home';
import PrivateRoute from './Components/PrivateRoute';
import EditUser from './Pages/EditUser';
import Articles from './Pages/Articles';
import ShowArticles from './Pages/ShowArticles';


function App() {
  return (
    <GarbageProvider>
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route exact path="/user/edit" element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        } />
        <Route exact path="/articles" element={
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
        } />
        <Route exact path="/articles/:id" element={
          <PrivateRoute>
            <ShowArticles />
          </PrivateRoute>
        } />
      </Routes>
    </GarbageProvider>
  );
}

export default App;

