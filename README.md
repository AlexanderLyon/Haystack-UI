# Haystack UI
[![npm](https://img.shields.io/npm/v/haystack-ui.svg?style=flat-square)](https://www.npmjs.com/package/haystack-ui)
[![npm](https://img.shields.io/npm/dt/haystack-ui.svg?style=flat-square)](https://www.npmjs.com/package/haystack-ui)

## Overview
Haystack UI is a React component that allows you to easily insert a search field into your website. It's based on the functionality of fuzzy-search plugin [Haystack](https://github.com/AlexanderLyon/Haystack "Haystack"), but with a built-in interface.

<p align="center">
  <img src="https://raw.githubusercontent.com/AlexanderLyon/Haystack-UI/HEAD/assets/Sample.jpg" alt="Haystack UI Themes" width="500" height="auto"/>
</p>

## Installation
Using npm:
```shell
npm i haystack-ui
```

Import Haystack UI component:
```javascript
import { HaystackUI } from 'haystack-ui';
```

Render component:
```html
<HaystackUI <options> />
```

## Props
Haystack UI options

#### Required:
| Option      | Default     | Description |
| ----------- | ----------- | ----------- |
| `source` (*array*) | null | Pool of data to pull suggestions from |

#### Optional:
| Option      | Default     | Description |
| ----------- | ----------- | ----------- |
| `theme` (*string*) | light | Color scheme ("light", "dark", or "ghost") |
| `placeholder` (*string*) | "Search" | Input placeholder text |
| `showSuggestions` (*boolean*) | true | Whether or not to show suggestion drop-down |
| `inlineSuggestions` (*boolean*) | false | Displays an autocompleted suggestion on the same line as input |
| `suggestionLimit` (*number*) | 4 | Maximum number of suggestions shown in drop-down |
| `submitLocation` (*string*) | "#" | URL of the file that will process GET method. Your search string will be received as "query" |
| `caseSensitive` (*boolean*) | false | Whether or not search is case sensitive |
| `flexibility` (*number*) | 1 | "Fuzziness" of suggestions. The lower the number, the more strict your suggestions will be |
| `stemming` (*boolean*) | false | Reduces tokens in a query to their base words |
| `exclusions` (*string*) | null | Add a string or regex to ignore in query |
| `ignoreStopWords` *boolean* | false | Ignore common stop words such as the, a, in, etc. |


## License

[MIT](https://github.com/AlexanderLyon/Haystack-UI/blob/master/LICENSE "MIT License")

