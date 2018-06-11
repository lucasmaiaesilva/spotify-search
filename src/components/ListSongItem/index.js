import React from 'react'

import './index.styl'

const ListSongItem = ({ name, number, duration }) => (
  <div className='list-song-item'>
    <span className="song white small">
      <span className='gray number'>{number}.</span>
      {name}
    </span>
    <span className="time gray small">
      {duration}
    </span>
  </div>
)

export default ListSongItem
