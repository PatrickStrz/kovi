// Z-index values should always be defined in z-index.js
// allows us to at a glance determine relative layers of our application and prevents bugs
// arrising from arbitrary z-index values. Do not edit the z-index scale! Only add application
// scoped z-index values.

// Z-Index Scale
// --------------------------------------------------
const z = {
  Index1: 100,
  Index2: 200,
  Index3: 300,
  Index4: 400,
  Index5: 500,
  Index6: 600,
  Index7: 700,
  Index8: 800,
  Index9: 900,
  Index10: 1000,
}

// Z-Index Applications
// --------------------------------------------------
export const HEADER_Z_INDEX = z.Index1
