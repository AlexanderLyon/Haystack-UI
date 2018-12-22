# Haystack UI

## Overview:
Haystack UI is a React component that allows you to easily insert a search field into your website. It's based on the functionality of fuzzy-search plugin [Haystack](https://github.com/AlexanderLyon/Haystack "Haystack"), but with a built-in interface.

## Instructions:

#### Include Haystack UI bundle
```html
<script src="HaystackUI.bundle.js" type="text/javascript"></script>
```

#### Add the following element wherever you'd like to insert the search field
```html
<span id="HaystackUIContainer"></span>
```

#### Initialize Haystack UI
```javascript
const haystackApp = new HaystackUI( options ).init();
```

## Options:

`theme` *string* -- Color scheme ("light", "dark", or "ghost")

`placeholder` *string* -- Input placeholder text

`showSuggestions` *boolean* -- Whether or not to show suggestion drop-down

`inlineSuggestions` *boolean* -- Displays an autocompleted suggestion on the same line as input

`suggestionLimit` *number* -- Maximum number of suggestions shown in drop-down

`submitLocation` *string* -- URL of the file that will process GET method. Your search string will be received as "query"

`source` *array* -- Pool of data to pull suggestions from

`caseSensitive` *boolean* -- Whether or not search is case sensitive

`flexibility` *number* -- "Fuzziness" of suggestions. The lower the number, the more strict your suggestions will be

`stemming` *boolean* -- Experimental, only removes "s" from end of words for now

`exclusions` *string* -- Add a string or regex to ignore in query

`ignoreStopWords` *boolean* -- Ignore common stop words such as the, a, in, etc.



## License

[MIT](https://github.com/AlexanderLyon/Haystack-UI/blob/master/LICENSE "MIT License")

