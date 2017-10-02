# React Style Guide

## Styling:

### styled components
- Use styled-components library for styling to reinforce component architecture.
- For composed components define 1 off components above default component
declaration.
- For styled-components that are repeated, factor them out into their own file
in the `ui-kit` directory.
- For components that are used for positioning or layouts, use `Box` in the name
for clarity. i.e) `CommentBox`. Avoid using the word container as it is reserved
for data fetching components and will make files much harder to understand.
### Inline styles

- Only use when nessessary, otherwise use styled components library.

- Omit 'px'
  i.e)
  ```
  //bad:
  {marginBottom: '15px'}

  //good:
  {marginBottom: 15}
  ```
### CSS files
Lowest amount of usage, only use when absolutely necessary, such as extending
styles of components from external libraries.

### Global CSS / Theming
Global style systems are in `styles` directory for easy theme changing, and
to minimize bugs that arise from value definitions across the entire codebase
- All colors are to be defined in `styles/theme/colors`. one-off color values
in components are not permitted, they must be defined and exported from the `colors`
file.
- Z-index values should only be defined in `styles/z-index`.
- Animation keyframes should only defined in `styles/animations/keyframes`
- Shadows should only be defined in `styles/shadows`.
- No one-off plain css media queries, either use the custom `media`` ` template literal for
styled components (`styles/media-queries`), or `react-media` library +
`styles/screen-sizes` for cases where it is necessary to pass screen size changes
as a prop.

### Other CSS
- styled components are vendor prefixed so don't worry about vendors.
- Use flexbox for positioning.

## Binding Callbacks

Do not bind in props or use arrow functions in props to avoid
creating a new function on every render. Instead use arrow functions when
defining class properties to preserve 'this'.

[Article explaining why](https://medium.freecodecamp.org/why-arrow-functions-and-bind-in-reacts-render-are-problematic-f1c08b060e36?source=email-cb596b73fd9a-1504008041017-digest.reader------0-38&sectionName=top)

 ```
 //bad

<ChildComponent onClick={( ) => this.handleClick()}>

//bad

<ChildComponent onClick={this.handleClick.bind(this)}>

//good

class Parent extends Component{
  handleClick = () => {
  	console.log(’handling click’)
  }
	render(){
    return(
    	<ChildComponent  onClick={this.handleClick}/>
    )
  }
}
 ```

 ## Imports

 Only use absolute imports in components, relative imports make it cumbersome to
 change project structure.
