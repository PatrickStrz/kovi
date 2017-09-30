import React from 'react';
import {LoaderList} from 'ui-kit'
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const exampleLoader = <div>Loading...</div>
  const list = renderer.create(
    <LoaderList length={3} loader={exampleLoader} />
  ).toJSON();
  expect(list).toMatchSnapshot();
});
