import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paragraph from '../../components/Paragraph'
import AlbumThumb from '../../components/AlbumThumb'
import Item from '../../components/ListSongItem'
import Loading from '../../components/Loading'
import { getData } from '../../utils/api'

import './index.styl'

class SongDetail extends Component {
  constructor() {
    super()
    this.state = {
      album: {},
      isLoading: true
    }
  }
  componentDidMount() {
    getData(`https://api.spotify.com/v1/albums/${this.props.albumId}`, this.props.token)
      .then(data => this.setState({
        album: data,
        isLoading: false
      }))
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />
    }
    const { back } = this.props
    const { album } = this.state
    return (
      <section className='detail-song'>
        <Paragraph onClick={back} className='back white'>
          voltar
        </Paragraph>

        <div className='detail-song-block'>
          <div className="detail-image-block">
            <AlbumThumb
              id={album.id}
              name={album.name}
              image={album.images[1].url}
            />
          </div>

          <div className="list-songs">
            {album.tracks.items.map((track, index) => {
              const ms = track.duration_ms
              const min = Math.floor((ms/1000/60) << 0)
              const sec = Math.floor((ms/1000) % 60)
              return (
                <Item key={track.id} name={track.name} number={index + 1} duration={`${min}: ${sec < 10 ? sec + '0' : sec}`} />
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
})

export default connect(mapStateToProps)(SongDetail)
