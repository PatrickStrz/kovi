// Z-index values should always be defined in z-index.js
// allows us to at a glance determine relative layers of our application and prevents bugs
// arising from arbitrary z-index values. Do not edit the z-index scale! Only add application
// scoped z-index values.

// Z-Index Scale
// --------------------------------------------------
const z = {
  index1: 100,
  index2: 200,
  index3: 300,
  index4: 400,
  index5: 500,
  index6: 600,
  index7: 700,
  index8: 800,
  index9: 900,
  index10: 1000,
}

// Z-Index Applications
// --------------------------------------------------
export const SCOREBOARD_Z_INDEX = z.index1 //Scoreboard.js
export const HEADER_Z_INDEX = z.index2
export const DIALOG_Z_INDEX = z.index9 //Dialog.js - so dialog always stays on top.
