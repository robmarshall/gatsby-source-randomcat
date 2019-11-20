# gatsby-source-randomcat

This is a starter plugin for building a Gatsby JS Source Plugin. It helps to update this as you go.

## Set The Config

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-randomcat",
      options: { apiKey: "", limit: "" }
    }
  ]
};
```

## Get API key

https://thecatapi.com/

## Set Cat Limit

How many cats do you want? Or need!?

(The limit on the API is 100)
