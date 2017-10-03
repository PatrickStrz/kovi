export const removeValueFromList = (value,list)=> {
  const removeIndex = list.indexOf(value)
  if (removeIndex !== -1){
    return [...list.slice(0, removeIndex), ...list.slice(removeIndex+1)]
  }
  else{
    return [...list]
  }
}

/* normalizeToFeed takes an indefinite number of arrays and returns
  1 list in the following order:
  [ array1[0],array2[0],array3[0],[array1[1],array2[1],array3[1], array1[2]... ]

  example of use -->
  const challenges:[<c>1</c>,<c>2</c>,<c>3</c>]
  const tasks = [<t>1</c>,<t>2</c>]
  normalizeToFeed(challenges,tasks)
  > [<c>1</c>,<t>1</c>,<c>2</c>,<t>2</c>,<c>3</c>]
*/
export const normalizeToFeed = (...lists) => {
  const listLengths = lists.map(list => list.length)
  const longestListLength = Math.max(...listLengths)
  const feed = []
  for (let i = 0; i < longestListLength; i++){
    lists.forEach(list => list[i] && feed.push(list[i]))
  }; /* semi colon necessary here for loop to execute.
  only use for <= es5 features */
  return feed
}
