import React, { useEffect, useState, useContext } from "react";
import config from "../config";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";
import { RecipeContext } from "../context/RecipeContext";
import "../styles/Home.css";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  const baseURL =
    process.env.NODE_ENV === "production" ? config.production : config.local;

  const { recipes, dispatch } = useContext(RecipeContext);
  const { user, userExists } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  // const [startSearch, setStartSearch] = useState(false)

  const dataLoad = async () => {
    // setIsLoading(true);
    const response = await fetch(`${baseURL}/api/recipes?search=${searchTerm}`);


    const data = await response.json();

    if (response.ok) {
      console.log(data)
      dispatch({ type: "SET_RECIPES", payload: data.Recipes });
    }
  };

  useEffect(() => {
    dataLoad();
  }, []);


  return (
    <div>

        <>
          {/* <h1>Home</h1> */}
          <div
            className="home"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              "margin-bottom": "50px",
            }}
          >

            <div className="search-div" >
              <form onSubmit={(e) => {
                e.preventDefault()
                dataLoad()}} >
                <input onChange={ (e) => setSearchTerm(e.target.value) } type="text" />
                <button type="submit">Search</button>
              </form>
              
            </div>


            {recipes &&
              recipes.map((singleData) => <RecipeCard singleData={singleData} />)}
          </div>
        </>
      
    </div>
  );
}

export default Home;
