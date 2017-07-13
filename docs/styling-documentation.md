# Styling and UI
## Inline styles/ CSS
1. Use inline styles
2. Only use CSS classes when necessary. I.e) When using media queries to hide
elements based on screen size.
## Material-UI
1. Using [http://www.material-ui.com/](url) library for components
2. Using a custom theme `lib/theme/mui-theme` for components.
3. When it is necessary to override the mui-theme:
    - If possible use the style props documented at [http://www.material-ui.com/](url)
    - For components that
do not have the necessary style props, create a new mui-theme and
wrap the component in a new theme provider. i.e)
`
import {muiThemeBottom} from 'lib/theme/mui-theme-bottom-bar'
<MuiThemeProvider muiTheme={muiThemeBottom}>
  <BottomNavigationItem>
</MuiThemeProvider>`
4. colors imported from `lib/theme/colors.js`

##Colors
1. All colors are stored in `lib/theme/colors.js`
2. DO NOT use one of colors within components, define all colors in
`lib/theme/colors.js`
3. all material-ui colors are listed in colors.js as 1 object and are imported
into mui-theme for use.

##Z-Index
1. Z-index values should always be defined in `z-index.js`
allows us to at a glance determine relative layers of our application and
prevents bugs arising from arbitrary z-index values. Do not edit the z-index
scale! Only add application scoped z-index values.

**todo: decide on UI-color-pattern, I.e) primary for buttons ...
