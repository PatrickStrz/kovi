# React Style Guide

1. Enclose variables in es7 property initializers (class body) with arrow functions
so that values are set when the variables are used.
2. Define style objects in the render method to prevent dynamic styles from
having stale values.
3. Omit 'px' when styling.
  i.e)
  ```
  //bad:
  {marginBottom: '15px'}
  
  //good:
  {marginBottom: 15}
  ```
