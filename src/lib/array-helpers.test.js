import {removeValueFromList} from './array-helpers'

test('removeValueFromList should remove given value from list', ()=>{
  const startList = [1,49,34,3]
  const value = 49
  const expected = [1,34,3]
  const result = removeValueFromList(value, startList)
  expect(result).toEqual(expected)
})

test('removeValueFromList should not mutate the existing array', ()=>{
  const startList = [1,49,34,3]
  const value = 49
  const expected = [1,34,3]
  const result = removeValueFromList(value, startList)
  expect(result).not.toBe(expected)
})

test('removeValueFromList returns existing list if value is not in list', ()=>{
  const startList = [1,49,34,3]
  const value = 50
  const expected = [1,49,34,3]
  const result = removeValueFromList(value, startList)
  expect(result).toEqual(expected)
})
