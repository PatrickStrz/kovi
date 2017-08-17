# Styling and UI

## Styled-Components Library
- Using [styled components library](https://www.styled-components.com) to have
the benefits of inline styles while writing real css. Also helps reinforce reusable
component architecture. CSS is automatically vendor prefixed.
- Use styled components wherever possible.
- Keep styled components small, handling one concern only. Create a new file in
ui-kit for any component that will be reused throughout the application.
- Use 'local' styled components that are not exported for composed components that
require smaller one-off pieces.

## Inline styles/ CSS
1. Only Use inline styles for material-ui library components.
2. Only use CSS classes when absolutely necessary. I.e) overriding or supplying
a css class when using components from external libraries.

## Material-UI
1. Using [http://www.material-ui.com/](url) library for certain components, but
replacing with custom elements.
2. Using a custom theme `styles/theme/mui-theme` for components.
3. When it is necessary to override the mui-theme:
    - If possible use the style props documented at [http://www.material-ui.com/](url)
    - For components that
do not have the necessary style props, create a new mui-theme and
wrap the component in a new theme provider. i.e)
`
import {muiThemeBottom} from 'styles/theme/mui-theme-bottom-bar'
<MuiThemeProvider muiTheme={muiThemeBottom}>
  <BottomNavigationItem>
</MuiThemeProvider>`
4. colors imported from `styles/theme/colors.js`

##Colors
1. All colors are stored in `styles/theme/colors.js`
2. DO NOT use one of colors within components, define all colors in
`styles/theme/colors.js`
3. all material-ui colors are listed in colors.js as 1 object and are imported
into mui-theme for use.

##Z-Index
1. Z-index values should always be defined in `z-index.js`
allows us to at a glance determine relative layers of our application and
prevents bugs arising from arbitrary z-index values. Do not edit the z-index
scale! Only add application scoped z-index values.

**todo: decide on UI-color-pattern, I.e) primary for buttons ...
