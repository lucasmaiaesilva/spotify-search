import React from 'react'

const Paragraph = ({ children, ...rest }) => <p {...rest}>{children}</p>

export default Paragraph
