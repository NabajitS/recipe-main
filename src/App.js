import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateRecipe from "./pages/CreateRecipe";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecipeView from "./pages/RecipeView";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipeview/:id" element={<RecipeView />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/create" element={<CreateRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
