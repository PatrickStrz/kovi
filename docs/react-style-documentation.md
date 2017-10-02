# React Style Guide

## Styling:

### styled components
- Use styled-components library for styling to reinforce component architecture.
- For composed components define 1 off components above default component
declaration.

### Inline styles
- Only use inline styles when necessary, otherwise use styled components library.

### CSS files
Lowest amount of usage, only use when absolutely necessary, such as extending
styles of components from external libraries.

### Global CSS / Theming
Global style systems are in `styles` directory for easy theme changing, and
to minimize bugs that arise from value definitions across the entire codebase

** Check out `styling` docs for detailed documentation.


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
