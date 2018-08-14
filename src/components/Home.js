import React, { Component } from 'react'
import { Link } from "react-router-dom"

import axios from 'axios'
import config from 'react-global-configuration'

class Home extends Component {
  constructor(props) {
    super()

    // console.log(props.location.state)

    this.state = {
      posts: [],
      url: config.get('url') + 'posts',
      message: ''
    }
  }

  componentWillMount() {
    let $this = this

    if ($this.props.location.state) {
      $this.setState({
        message: $this.props.location.state
      })

      $this.props.history.push('')
    }

    axios.get(this.state.url)
      .then(response => {
        $this.setState({
          posts: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  alertMessage() {
    if (this.state.message) {
      return (
        <div className="alert alert-success">
          <strong>Success!</strong> {this.state.message}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Posts listing <Link to="/create" className="btn btn-primary" style={{ float: 'right' }}>Add new post</Link></h2>
        {this.alertMessage()}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, i) => (
              <tr key={i}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td><Link to={"/edit/" + post.id}>Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;