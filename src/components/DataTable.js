import React, { Component } from 'react'
import { Link } from "react-router-dom"

import axios from 'axios'
import config from 'react-global-configuration'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class DataTable extends Component {
  constructor(props) {
    super()

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

  addEditButton(cell, row) {
    return <Link to={"/edit/" + row.id}>Edit</Link>;
  }

  render() {
    return (
      <div className="container">
        <h2>Posts listing <Link to="/create" className="btn btn-primary" style={{ float: 'right' }}>Add new post</Link></h2>
        {this.alertMessage()}
        <BootstrapTable
          data={this.state.posts}
          bordered={ true }
          pagination>
          <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
          <TableHeaderColumn dataField='body'>Body</TableHeaderColumn>
          <TableHeaderColumn dataField='edit' dataFormat={ this.addEditButton.bind(this) }>Action</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default DataTable;