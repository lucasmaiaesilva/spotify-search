import React from 'react'
import ReactLoading from 'react-loading'

import './index.styl'

const Loading = () => {
  return (
    <div className='loading-overlay'>
      <ReactLoading type='spokes' color='#999' height={100} width={100} />
    </div>
  )
}

export default Loading
