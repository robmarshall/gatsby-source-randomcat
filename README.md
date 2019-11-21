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

## Using the Cats

Example repo: https://github.com/robmarshall/gatsby-randomcat-frontend

Once the plugin is set up and API linked, the cat data can be accessed with the following query:

```
allRandomCat {
  nodes {
    id
    url
    width
    height
  }
}
```

### Example in a page

```js
import React from "react"
import { useStaticQuery, graphql } from 'gatsby'

const CatPage = () => {

  const { allRandomCat } = useStaticQuery(
    graphql`
      query {
        allRandomCat {
          nodes {
            id
            url
            width
            height
          }
        }
      }
    `
  )

  return (
    <>
      {
        allRandomCat.nodes.map(img => {
          return (
            <img style={{float: 'left'}}key={img.id} src={img.url} width={img.width ? `${img.width}px` : null} height={img.height ? `${img.height}px` : null} alt="" />
          )
        })
      }
    </>
  )
}

export default CatPage
```
