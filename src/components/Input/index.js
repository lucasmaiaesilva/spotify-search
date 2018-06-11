import React from 'react'

const Input = ({ handleChange, ...rest }) => (
  <input
    {...rest}
    onChange={handleChange}
  />  
)

export default Input
