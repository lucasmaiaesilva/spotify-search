import React from 'react'
import { Link } from 'react-router-dom'
import Paragraph from '../Paragraph'
import AlbumThumb from '../AlbumThumb'

import './index.styl'

const ResultBlock = ({ title, data, handleClick }) => (
  <section className='result-block'>
    <Paragraph className='medium white'>
      {title}
    </Paragraph>

    <div className='album-thumb-list'>
      {data && data.map(album => (
        <AlbumThumb
          key={album.id}
          id={album.id}
          name={album.name}
          image={album.images[1].url}
          artists={album.artists}
          handleClick={handleClick}
        />
      ))}
    </div>
  </section>
)

export default ResultBlock
