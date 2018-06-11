import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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

  handleSubmit = (e) => {
    e.preventDefault()
    const url = `https://api.spotify.com/v1/search?q=${this.state.value}&type=album`
    this.setState({
      isLoading: true
    })
    getData(url, this.props.token)
      .then(data => this.setState(prevState => {
        let customSongList
        if (data.albums !== undefined) {
          customSongList = data.albums.items
        } else {
          customSongList = false
        }
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

  result = () => {
    if (this.state.customSongList.length === 0 && this.state.query.length > 0) {
      return (
        <ResultBlock
          title={`Não foi encontrado nenhum resultado para sua Busca por "${this.state.query}"`}
          handleClick={this.detailPageCall}
        />
      )
    }
    if (this.state.customSongList.length === 0 && this.state.query.length === 0) {
      return false
    }
    return (
      <ResultBlock
        title={`Resultados encontrados para "${this.state.query}"`}
        data={this.state.customSongList}
        handleClick={this.detailPageCall}
      />
    )
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

        {this.result()}
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

const mapStateToProps = state => ({
  token: state.token,
})

export default connect(mapStateToProps)(Home)
