import React from 'react'
import { shallow, mount } from 'enzyme'
import Input from './index'

const testData = {
  labelText: 'test',
  value: 'input test value',
  placeHolder: 'placeHolder test value'
}

it('render correctly', () => {
  const test = (
    <Input handleChange={() => {}} {...testData} />
  )
  expect(shallow(test)).toMatchSnapshot()
})

it('test event change', () => {
  const changeInput = jest.fn()
  const test = mount(<Input handleChange={changeInput} {...testData} />)
  test.find('input').simulate('change')
  expect(changeInput).toHaveBeenCalledTimes(1)
})
