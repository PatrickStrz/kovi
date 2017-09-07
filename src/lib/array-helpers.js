export const removeValueFromList = (value,list)=> {
  const removeIndex = list.indexOf(value)
  if (removeIndex !== -1){
    return [...list.slice(0, removeIndex), ...list.slice(removeIndex+1)]
  }
  else{
    return [...list]
  }
}
