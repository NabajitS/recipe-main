import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext} from "../context/RecipeContext";
import "../styles/RecipeView.css";

function RecipeView() {
  const { recipes, dispatch } = useContext(RecipeContext);
  const { id } = useParams();

  const selectedRecipe = recipes.filter((el) => {
    return el._id == id;
  });

  return (
    <div className="recipeview-complete-page">
      <div className="recipeview-container">
        {selectedRecipe.map((recipe) => {
          const blob = new Blob([Int8Array.from(recipe.img.data.data)], {
            type: recipe.img.contentType,
          });
          const image = window.URL.createObjectURL(blob);
          console.log(recipe);
          const createdDate = recipe.updatedAt.substring(0, 10);
          return (
            <div className="indiv-recipe">
              <div className="recipe-header-img-cont">
                <img
                  alt="Dummy scene"
                  className="recipe-header-img"
                  src={image}
                />
              </div>

              <section>
                <div className="recipe-author-info">
                  <img src="https://picsum.photos/id/237/40" alt="avatar" />
                  <div>
                    <p className="author-name">
                      {recipe.user_email.substring(
                        0,
                        recipe.user_email.indexOf("@")
                      )}
                    </p>
                    <p className="posted-date">{createdDate}</p>
                  </div>
                </div>

                <h1 className="recipe-title">{recipe.title}</h1>
                <p
                  id="text-body"
                  dangerouslySetInnerHTML={{ __html: recipe.body }}
                ></p>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecipeView;
