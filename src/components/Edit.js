import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import config from 'react-global-configuration'

class Edit extends Component {
    constructor(props) {
        super()

        this.state = {
            id: props.match.params.id,
            title: '',
            body: '',
            toHome: false,
            url: config.get('url') + 'posts/' + props.match.params.id
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        let $this = this

        axios.get(this.state.url)
            .then(response => {
                $this.setState({
                    title: response.data.title,
                    body: response.data.body
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleBodyChange(event) {
        this.setState({
            body: event.target.value
        })
    }

    handleSubmit(e) {
        let $this = this

        axios.put($this.state.url, { title: this.state.title, body: this.state.body })
            .then(response => {
                console.log(response)

                $this.setState({
                    toHome: true
                })
            })
            .catch(error => {
                console.log(error)
            })

        e.preventDefault()
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to={{ pathname: '/', state: 'Post updated successfully.' }} />
        }
        return (
            <div className="container">
                <h2>Edit post <Link to="/" className="btn btn-primary" style={{ float: 'right' }}>Posts listing</Link></h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" className="form-control" placeholder="Enter title" name="title" onChange={this.handleTitleChange} value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea name="body" placeholder="Enter body" className="form-control" onChange={this.handleBodyChange} value={this.state.body}></textarea>
                    </div>
                    <button type="submit" className="btn btn-default">Update</button>
                </form>
            </div>
        )
    }
}

export default Edit;