import React from 'react'
import Paragraph from '../Paragraph'

import './index.styl'

const AlbumThumb = ({ id, name, image, artists, handleClick }) => (
  <div className='album-thumb' onClick={() => handleClick( id )}>
    <div className='image-block'>
      <img src={image} alt={name} />
    </div>

    <Paragraph className='white small'>
      {name}
    </Paragraph>

    <Paragraph className='white gray small'>
      {artists && artists.map(artist => (
        <span key={artist.name}>{artist.name} </span>
      ))}
    </Paragraph>
  </div>
)

export default AlbumThumb
