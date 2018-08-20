import React from 'react';
import ReactDOM from 'react-dom';
import Author from './Author';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Author />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('simply do test',()=>{
  it('test success',()=>{
    expect(1+1).toBe(2);
  });
  it('test fails',()=>{
    expect(1+2).toBe(3);
  });
});
