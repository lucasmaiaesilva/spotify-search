import React, { Component, Fragment } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import PrivateRoute from './components/PrivateRoute'
import Home from './screens/Home'
import SongDetail from './screens/SongDetail'
import Login from './screens/Login'
import { setToken } from './actions'

class App extends Component {
  constructor() {
    super()
    this.state = {
      token: null
    }
  }

  async componentWillMount() {
    if (location.hash !== '') {
      const token = queryString.parse(location.hash)
      await this.props.dispatch(setToken(token))
    }
  }
  render() {
    const { location } = this.props
    if (this.props.token && location.pathname !== '/app') {
      return <Redirect to={{
        pathname: '/app',
        state: { token: this.props.token }
      }} />
    }
    return (
      <Fragment>
        <Switch>
          <PrivateRoute path='/app' condition={this.props.token} component={Home} exact />
          <Route path="/" component={Login} exact />
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  updateToken: state.updateToken
})

export default withRouter(connect(mapStateToProps)(App))
