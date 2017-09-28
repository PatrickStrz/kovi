import {keyframes} from 'styled-components'

export const loadingOpacity = keyframes`
  0%   {opacity:1;}
  25%  {opacity:0.5;}
  50%  {opacity:0;}
  75%  {opacity:0.5}
  100% {opacity:1;}
`

export const bounceIn = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`

export const pulse = keyframes`
  0% {
    transform: scale(0.5);
  }
  30% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`

export const slideIn = keyframes`
  from {
    margin-left:100%;
    width:300%
  }

  to {
    margin-left:0%;
    width:100%;
  }
`

export const fadeOut = keyframes`
  0%   { opacity: 1; }
  100% { opacity: 0; }
`
