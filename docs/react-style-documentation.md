# React Style Guide

## Binding Callbacks

Do not bind in props or use arrow functions in props to avoid
creating a new function on every render. Instead use arrow functions when defining
class properties to preserve 'this'.

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

## Inline styles

- Only use when nessessary, otherwise use styled components library.

- Omit 'px'
  i.e)
  ```
  //bad:
  {marginBottom: '15px'}

  //good:
  {marginBottom: 15}
  ```
