import {removeValueFromList, normalizeToFeed} from 'lib/array-helpers'

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

/* ---------------------- normalizeToFeed ---------------------- */

const feedData = {
    challenges:[
      "<Challenge>c-1</Challenge>",
      "<Challenge>c-2</Challenge>",
      "<Challenge>c-3</Challenge>",
      "<Challenge>c-4</Challenge>",
      "<Challenge>c-5</Challenge>"
    ],
    tasks:[
      "<Task>t-1</Task>",
      "<Task>t-2</Task>",
      "<Task>t-3</Task>",
      "<Task>t-4</Task>",
    ],
    actions: [
      "<Action>t-1</Action>",
      "<Action>t-2</Action>",
      "<Action>t-3</Action>",
    ]
  }

  const expectedFeedResult = [
      "<Challenge>c-1</Challenge>",
      "<Task>t-1</Task>",
      "<Action>t-1</Action>",
      "<Challenge>c-2</Challenge>",
      "<Task>t-2</Task>",
      "<Action>t-2</Action>",
      "<Challenge>c-3</Challenge>",
      "<Task>t-3</Task>",
      "<Action>t-3</Action>",
      "<Challenge>c-4</Challenge>",
      "<Task>t-4</Task>",
      "<Challenge>c-5</Challenge>"
  ]

test('normalizeToFeed should combine lists in expected shape', () => {
  const feed = normalizeToFeed(
    feedData.challenges,
    feedData.tasks,
    feedData.actions
  )
  expect(feed).toEqual(expectedFeedResult)
})

test('normalizeToFeed should combine lists in expected order', () => {
  const feed = normalizeToFeed(
    feedData.challenges,
    feedData.tasks,
    feedData.actions
  )
  expect(feed).toEqual(expectedFeedResult)
})
