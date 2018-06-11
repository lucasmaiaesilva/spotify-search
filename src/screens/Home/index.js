import React, { Component, Fragment } from 'react'
import Paragraph from '../../components/Paragraph'
import Input from '../../components/Input'
import ResultBlock from '../../components/ResultBlock/'
import SongDetail from '../SongDetail'
import { getData } from '../../utils/api'
import Loading from '../../components/Loading'

import './index.styl'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      customSongList: [],
      albumId: false,
      query: '',
      isLoading: false
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  getToken() {
    const { location } = this.props
    const { state } = location
    const { token } = state
    return token.access_token
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const accessToken = this.getToken()
    const url = `https://api.spotify.com/v1/search?q=${this.state.value}&type=album`
    this.setState({
      isLoading: true
    })
    getData(url, accessToken)
      .then(data => this.setState(prevState => {
        let customSongList
        if (data.albums !== undefined) {
          customSongList = data.albums.items
        } else {
          customSongList = false
        }
        console.log(customSongList)
        return {
          customSongList,
          query: prevState.value,
          value: '',
          isLoading: false,
          invalidQuery: false
        }
      }))
  }
  backButton = () => {
    this.setState({
      albumId: false
    })
  }

  detailPageCall = (albumId) => {
    this.setState({
      albumId
    })
  }

  search() {
    const { value } = this.state
    return (
      <Fragment>
        <Paragraph className='small white description-search'>
          Busque por artistas, álbuns ou músicas
        </Paragraph>
        <form onSubmit={this.handleSubmit}>
          <Input
            handleChange={this.handleChange}
            placeholder='Comece a escrever e digite enter...'
            value={value}
            className='input-search extra-big gray'
          />
        </form>

        {this.state.customSongList.length > 0 && this.state.query ? (
            <ResultBlock
              title={`Resultados encontrados para "${this.state.query}"`}
              data={this.state.customSongList}
              handleClick={this.detailPageCall}
            />
          ) : (
            <ResultBlock
              title={`Não foi encontrado nenhum resultado para sua Busca por "${this.state.query}"`}
              handleClick={this.detailPageCall}
            />
          )
        }
      </Fragment>
    )
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />
    }
    return (
      <section className='home-app'>
        <div className='container'>
          {this.state.albumId ? (
            <SongDetail
              back={this.backButton}
              albumId={this.state.albumId}

            />
          ) : (
            this.search()
          )}
        </div>
      </section> 
    )
  }
}

export default Home
