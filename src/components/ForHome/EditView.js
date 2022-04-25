import React, { useEffect, useState } from "react";
import { categoryData } from "../../Data/categoryData";

import {
  Box,
  Typography,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  container: {
    padding: "0 100px",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  image: {
    width: "100%",
    height: "80vh",
    objectFit: "cover",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  textField: {
    flex: 1,
    margin: "0 1.875rem",
    padding: "1rem 0",
    fontSize: 25,
  },
  textarea: {
    flex: 1,
    margin: "0 1.875rem",
    padding: "1rem 0 2rem 0",
    fontSize: 18,
    "&:focus-visible": {
      outline: "none",
    },
  },
  inputLabel: {
    margin: "0.8rem 0 0 0.6rem",
  },
  button: {
    marginTop: "2rem",
  },
  warning: {
    fontSize: "14px",
    color: "red",
  },
}));

const EditView = () => {
  const classes = useStyle();
  const postId = window.location.href.split("/edit/")[1];

  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [rating, setRating] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [drinkCategory, setDrinkCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categories, setCategories] = useState([]);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await getPost(postId);
      setPost(res);
      setTitle(res.title);
      setUser(res.user_name);
      setRating(res.rating);
      setDrinkCategory(res.id);
      setInstructions(res.instructions);
      setRating(res.star_num);

      const resIngredients = await getIngredientsFromDatabase(res.recipe_id);
      let resIngredientsFormat = resIngredients.join(", ");
      setIngredients(resIngredientsFormat);

      const resCategories = await getCategoriesFromDatabase();
      setCategories(resCategories);
    }
    fetchData();
  }, []);

  const isEmptyField = (str) => {
    return !str || !str.toString().trim().length;
  };

  const validate = () => {
    let isValid = true;
    if (isEmptyField(title)) {
      isValid = false;
    } else if (isEmptyField(user)) {
      isValid = false;
    } else if (isEmptyField(ingredients)) {
      isValid = false;
    } else if (isEmptyField(drinkCategory.toString())) {
      isValid = false;
    } else if (isEmptyField(instructions)) {
      isValid = false;
    }

    setValid(isValid);
    return isValid;
  };

  const submit = (e) => {
    e.preventDefault();
    // Validation - prevent submission if missing fields
    if (!validate()) {
      return;
    }

    let formattedIngredients = ingredients.split(", ");
    let outerArray = []
    formattedIngredients.forEach(ingredient => {
      let innerArray = [];
      innerArray.push(ingredient.replace(",", " "));
      outerArray.push(innerArray);
    })

    // Create form object and send request
    const body = { title, user, ingredients: outerArray, category: drinkCategory, instructions, star_num: rating, post_id:post.post_id, recipe_id:post.recipe_id };
    console.log(body)
    axios
      .put(`/api/posts/${post.post_id}`, body)
      .then((res) => console.log("saved! " + res.data))
      .catch((err) => console.log(err));

    window.location.href = "/";
  };

  return (
    <Box className={classes.container}>
      {/* <img className={classes.image} src={url} alt="banner" /> */}
      <form className={classes.form} encType="multipart/form-data">
        {/* <AddCircle fontSize="large" color="action" /> */}
        <TextField
          error={isEmptyField(title)}
          helperText={isEmptyField(title) ? "Required field" : ""}
          variant="outlined"
          placeholder="Title"
          className={classes.textField}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* <TextField
          error={isEmptyField(user)}
          helperText={isEmptyField(user) ? "Required field" : ""}
          variant="outlined"
          placeholder="User"
          className={classes.textField}
          onChange={(e) => setUser(e.target.value)}
          value={user}
        /> */}

        <TextField
          error={isEmptyField(rating)}
          helperText={isEmptyField(rating) ? "Required field" : ""}
          variant="outlined"
          placeholder="User rating from 0 ~ 5"
          className={classes.textField}
          onChange={(e) => setRating(e.target.value)}
          value={rating}
        />

        <TextField
          error={isEmptyField()}
          helperText={isEmptyField(ingredients) ? "Required field" : ""}
          multiline
          variant="outlined"
          placeholder="Ingredients..."
          className={classes.textField}
          onChange={(e) => setIngredients(e.target.value)}
          value={ingredients}
        />

        <FormControl className={classes.textField}>
          <InputLabel className={classes.inputLabel}>Drink Category</InputLabel>
          <Select
            error={isEmptyField(drinkCategory)}
            helperText={isEmptyField(drinkCategory) ? "Required field" : ""}
            variant="outlined"
            value={drinkCategory}
            onChange={(e) => setDrinkCategory(e.target.value)}
          >
            {categories.map((currCategory) => (
              <MenuItem value={currCategory.id.toString()}>
                {currCategory.category_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          error={isEmptyField(instructions)}
          helperText={isEmptyField(instructions) ? "Required field" : ""}
          variant="outlined"
          placeholder="Instructions..."
          className={classes.textField}
          onChange={(e) => setInstructions(e.target.value)}
          value={instructions}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={submit}
        >
          Post
        </Button>
        {!valid && (
          <div className={classes.warning}>Required fields are missing!</div>
        )}
      </form>
    </Box>
  );
};

async function getPost(id) {
  const res = await axios({
    method: "get",
    url: `/api/posts/${id}`,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

async function getIngredientsFromDatabase(recipe_id) {
  const res = await axios({
    method: "get",
    url: `/api/ingredients/${recipe_id}`,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

async function getCategoriesFromDatabase() {
  const res = await axios({
    method: "get",
    url: "/api/drink_categories",
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export default EditView;
