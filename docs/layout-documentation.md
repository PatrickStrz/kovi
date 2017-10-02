# Layout documentation
- Top level Layouts( layout for an entire page, i.e) left panel + center panel + right panel
) are to be created in
`components/layouts` and used in views by passing in react elements as props.
This allows for centralized layouts that are very easy to change and reuse.
- To view colored borders of layout components for easier development, pass in
showLines prop.
- Every layout is nested within Site.js ( Site component contains navigation bars)
