import {css} from 'styled-components'

// Shadows should always be defined in this file.
// allows us to change shadows in the entire app by changing 1 file.
// arising from arbitrary z-index values. Do not edit the shadow scale! Only add application
// scoped shadow constants.

// Shadow Scale
// --------------------------------------------------
const shadows = {
  level1: '',
  level2: css`box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`,
  level3: '',
}

// Shadow Applications
// --------------------------------------------------

export const PROFILE_CARD_SHADOW = shadows.level2
export const MORE_INFO_SHADOW = shadows.level2
export const SCORE_SECTION_SHADOW = shadows.level2
export const PRODUCT_CARD_SHADOW = shadows.level2
export const IMAGE_BOX_SHADOW = shadows.level2
