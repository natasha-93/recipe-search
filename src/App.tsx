import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import styles from "./App.module.css";

const { REACT_APP_APP_ID, REACT_APP_API_KEY } = process.env;

type Recipe = {
  calories: number;
  label: string;
  image: string;
  ingredientLines: string[];
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [openRecipeIndex, setOpenRecipeIndex] = useState(-1);

  useEffect(() => {
    fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${REACT_APP_APP_ID}&app_key=${REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data.hits.map((hit: any) => hit.recipe)));
  }, [search]);
  return (
    <div className={styles.app}>
      <div className={styles.searchForm}>
        <h2>Recipe Search</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(searchInput);
            setSearchInput("");
          }}
        >
          <input
            className={styles.searchBar}
            required
            value={searchInput}
            placeholder="Search recipes.."
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button className={styles.searchButton}>Search</button>
        </form>
      </div>
      {recipes.map((recipe, index) => {
        const open = openRecipeIndex === index;
        return (
          <Recipe
            key={index}
            title={recipe.label}
            calories={recipe.calories}
            image={recipe.image}
            ingredientLines={recipe.ingredientLines}
            open={open}
            onToggleOpen={() => setOpenRecipeIndex(open ? -1 : index)}
          />
        );
      })}
    </div>
  );
}

export default App;
