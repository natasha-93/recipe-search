import React from "react";
import styles from "./Recipe.module.css";

type RecipeProps = {
  title: string;
  calories: number;
  image: string;
  ingredientLines: string[];
  open: boolean;
  onToggleOpen: () => void;
};

export default function Recipe({
  title,
  calories,
  image,
  ingredientLines,
  open,
  onToggleOpen,
}: RecipeProps) {
  return (
    <div className={styles.recipeCard}>
      <h3>{title}</h3>
      <p>Calories: {Math.floor(calories)}</p>
      {open && (
        <>
          <ol className={styles.ingredientsList}>
            <strong>Ingredients:</strong>
            {ingredientLines.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ol>

          <img className={styles.image} src={image} alt={image} />
        </>
      )}
      <button
        className={styles.expandButton}
        onClick={() => {
          onToggleOpen();
        }}
      >
        {!open ? "Read more.." : "Read Less.."}
      </button>
    </div>
  );
}
