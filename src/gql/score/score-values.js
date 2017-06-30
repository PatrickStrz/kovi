
// score values should always be defined in z-index.js
// allows us to change score values of each action in one place and prevents bugs
// arising from inconsistent value. Do not edit existing entries in the levels
// system, only add new entries if necessary


// Score value system:
// name attribute used in community Aggregate query to determine total
// temporary solution until able to increment community aggregate score
// on the server
// --------------------------------------------------
const levels = {
  one: {value: 50, name: 'FIFTY'},
  two: {value: 100, name: 'HUNDRED' },
  // 3: {value: 150, name: 'ONEFIFTY' },
}

// Score system Applications
//Allows for dynamic community total queries using the name attribute
//of each score level
// Accessing values for mutations:
// APPLICATION_NAME.value  i.e) CHALLENGE_CREATE_SCORE.value
//Accessing name for queries: APPLICATION_NAME.name
// --------------------------------------------------

export const CHALLENGE_CREATE_SCORE = levels.one
