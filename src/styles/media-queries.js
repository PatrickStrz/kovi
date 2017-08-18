import {css} from 'styled-components'

const sizes = {
	xs: 48,
	sm: 62,
	md: 62,
  lg: 75
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label]}em) {
			${css(...args)}
		}
	`
	return acc
}, {})


/*

Example of use:

const Content = styled.div`
	height: 3em;
	width: 3em;
	background: papayawhip;

	Now we have our methods on media and can use them instead of raw queries

	${media.desktop`background: dodgerblue;`}
	${media.tablet`background: mediumseagreen;`}
	${media.phone`background: palevioletred;`}
`

*/
