---
title: Configurations ~ Style
layout: doc
---

# Style config

As seen in the [Style](/guide/style/intuition.md) section of this documentation, Tulipe is shipped with multiple levels of styling allowing developers to be more or less free about the design of their DApp frontends.
The style level selected by your DApp as well as other styling configurations can be configured into the `style` key of the [`tulipe.config.js` file](/guide/configurations/intuition).

The `style` key must be filled with an object. It looks like that :
```js
export const tulipeConfig = {
  style: {
    // Styling configs
  }
}
```

## Available style levels
4 levels of styles are available :
- **`unstylized`**: Tulipe doesn't add any style, you're totally free about the design of your frontend
- **`reset`**: Tulipe only applies a global CSS reset / normalizer. This allows to safely design a frontend that will remain consistent between different browsers.
- **`minimal`**: `reset` + every components are stylized in a minimal way, making them readable but not pretty. Its a recommended starting point for unsure developers.
- **`opinionated`**: `minimal` + every components are stylized in a detailed way and you can play with some CSS vars to modify colors, fonts, borders, etc. Useful for fast frontend development.

If the style level is not explicitly defined it defaults to `minimal`.

## Set the style level
In order to indicates to Tulipe which style level to use for your DApp, you have to use the `level` key of the `style` object. It must be filled with one of the levels' names mentionned above : `unstylized|reset|minimal|opinionated`.

Here is for example how we set the style level to `opinionated` :
```js
export const tulipeConfig = {
  style: {
    level: "opinionated",
  }
}
```
