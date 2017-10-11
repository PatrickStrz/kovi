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

/*
  using sketch spec for shadows: https://material.io/guidelines/resources/shadows.html#shadows-sketch
  key light = directional light, ambient light = soft light around each corner
  key light vs ambient light: https://material.io/guidelines/material-design/environment.html#
 */

const materialShadows = {
  dp1:  {
    key: css`box-shadow:
      0px 0px 2px 0px rgba(0,0,0,0.14), /* umbra */
      0px 2px 2px 0px rgba(0,0,0,0.12); /* penumbra */
    `,
    ambient: css`box-shadow:
      0px 1px 3px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
      0px 0px 2px 0px rgba(0,0,0,0.14), /* umbra */
      0px 2px 2px 0px rgba(0,0,0,0.12), /* penumbra */
      0px 1px 3px 0px rgba(0,0,0,0.20); /* ambient */
    `
  },
  dp2:  {
    key: css`box-shadow:
      0px 0px 4px 0px rgba(0,0,0,0.14),
      0px 3px 4px 0px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 1px 5px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
    0px 0px 4px 0px rgba(0,0,0,0.14),
    0px 3px 4px 0px rgba(0,0,0,0.12),
    0px 1px 5px 0px rgba(0,0,0,0.20);
    `
  },

  dp3:  {
    key: css`box-shadow:
      0px 3px 3px 0px rgba(0,0,0,0.14),
      0px 3px 4px 0px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 1px 8px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
    0px 3px 3px 0px rgba(0,0,0,0.14),
    0px 3px 4px 0px rgba(0,0,0,0.12),
    0px 1px 8px 0px rgba(0,0,0,0.20);
    `
  },

  dp4:  {
    key: css`box-shadow:
      0px 2px 4px 0px rgba(0,0,0,0.14),
      0px 4px 5px 0px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 1px 10px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
    0px 2px 4px 0px rgba(0,0,0,0.14),
    0px 4px 5px 0px rgba(0,0,0,0.12),
    0px 1px 10px 0px rgba(0,0,0,0.20);
    `
  },

  dp6:  {
    key: css`box-shadow:
      0px 6px 10px 0px rgba(0,0,0,0.14),
      0px 1px 18px 0px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 3px 5px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
    0px 6px 10px 0px rgba(0,0,0,0.14),
    0px 1px 18px 0px rgba(0,0,0,0.12),
    0px 3px 5px 0px rgba(0,0,0,0.20);
    `
  },

  dp8:  {
    key: css`box-shadow:
      0px 8px 10px 1px rgba(0,0,0,0.14),
      0px 3px 14px 3px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 4px 15px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
      0px 8px 10px 1px rgba(0,0,0,0.14),
      0px 3px 14px 3px rgba(0,0,0,0.12),
      0px 4px 15px 0px rgba(0,0,0,0.20);
    `
  },

  dp9:  {
    key: css`box-shadow:
      0px 9px 12px 1px rgba(0,0,0,0.14),
      0px 3px 16px 2px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 5px 6px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
    0px 9px 12px 1px rgba(0,0,0,0.14),
    0px 3px 16px 2px rgba(0,0,0,0.12),
    0px 5px 6px 0px rgba(0,0,0,0.20);
    `
  },

  dp12:  {
    key: css`box-shadow:
      0px 12px 17px 2px rgba(0,0,0,0.14),
      0px 5px 22px 4px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 7px 8px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
    0px 12px 17px 2px rgba(0,0,0,0.14),
    0px 5px 22px 4px rgba(0,0,0,0.12),
    0px 7px 8px 0px rgba(0,0,0,0.20);
    `
  },

  dp16:  {
    key: css`box-shadow:
      0px 16px 24px 2px rgba(0,0,0,0.14),
      0px 6px 30px 5px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 8px 10px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
      0px 16px 24px 2px rgba(0,0,0,0.14),
      0px 6px 30px 5px rgba(0,0,0,0.12),
      0px 8px 10px 0px rgba(0,0,0,0.20);
    `
  },

  dp24:  {
    key: css`box-shadow:
      0px 24px 38px 3px rgba(0,0,0,0.14),
      0px 9px 46px 8px rgba(0,0,0,0.12);
    `,
    ambient: css`box-shadow:
      0px 11px 15px 0px rgba(0,0,0,0.20);
    `,
    both: css`box-shadow:
      0px 24px 38px 3px rgba(0,0,0,0.14),
      0px 9px 46px 8px rgba(0,0,0,0.12),
      0px 11px 15px 0px rgba(0,0,0,0.20);
    `
  },
}

// Shadow Applications
// --------------------------------------------------

export const PROFILE_CARD_SHADOW = materialShadows.dp12.both
export const MORE_INFO_SHADOW = shadows.level2
export const SCORE_SECTION_SHADOW = shadows.level2
export const PRODUCT_CARD_SHADOW = shadows.level2
export const FEATURE_BOX_SHADOW = materialShadows.dp12.key
