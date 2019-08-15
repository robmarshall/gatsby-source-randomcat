# gatsby-source-randomcat

This is a starter plugin for building a Gatsby JS Source Plugin. It helps to update this as you go.

## Set The Config

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-randomcat",
      options: { api: "", catCategories: "" }
    }
  ]
};
```

## Get API

https://thecatapi.com/

## Set Cat Categories

Check out https://api.thecatapi.com/v1/categories

You can use more than one category id by using a comma to separate them for a mix of results. e.g. category_ids=1,4 for hats & sunglasses
