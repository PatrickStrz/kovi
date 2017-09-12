
/*
 score values should always be defined in z-index.js
 allows us to change score values of each action in one place and prevents bugs
 arising from inconsistent value. Do not edit existing entries in the levels
 system, only add new entries if necessary

 Score value system:
 name attribute used in community Aggregate query to determine total
 temporary solution until able to increment community aggregate score
 on the server
 --------------------------------------------------
 Make sure not all numbers are ending with 0s (i.e 50,100,150) because
 last number of the score total will never change (always 0).
 It looks more intesting to have all digits of a number changing.
*/

export const levels = {
  //names cannot include numbers to use in query,
  one: {value: 55, name: 'fiftyfive'},
  //Haven't used these yet:
  two: {value: 105, name: 'hundredandfive'},
  three: {value: 200, name: 'twohundred' },
}

/*
  Score system Applications
  Allows for dynamic community total queries using the name attribute
  of each score level
  Accessing values for mutations:
  APPLICATION_NAME.value  i.e) CHALLENGE_CREATE_SCORE.value
  Accessing name for queries: APPLICATION_NAME.name
  --------------------------------------------------
*/


export const CHALLENGE_CREATE_SCORE = levels.one
/* accepts data from a query in the shape of:
"data": {
    "levelOne": {
      "count": 265
    },
    "level2": {
      "count": 2
    },
    "level3": {
      "count": 0
    }
*/


export const calculateTotalScore = (data) => {
  const level1Count = data[levels.one.name].count
  const level2Count = data[levels.two.name].count
  const level3Count = data[levels.three.name].count

  const level1Value = levels.one.value
  const level2Value = levels.two.value
  const level3Value = levels.three.value

  const CommunityTotal = (
    level1Count * level1Value +
    level2Count * level2Value +
    level3Count * level3Value
  )
  return(CommunityTotal)
}
