import React from 'react'
import { connect } from 'react-redux'

import './index.styl'

const Login = (props) => (
  <section className='login-section'>
    <button onClick={props.updateToken}>Entrar com o Spotify</button>
  </section>
)

const mapStateToProps = state => ({
  updateToken: state.updateToken,
})

export default connect(mapStateToProps)(Login)
