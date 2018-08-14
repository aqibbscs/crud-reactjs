import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'
import config from 'react-global-configuration'

class Create extends Component {
    constructor(props) {
        super()

        this.state = {
            url: config.get('url') + 'posts',
            title: '',
            body: '',
            toHome: false
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        axios.post($this.state.url, { title: this.state.title, body: this.state.body, userId: 1 })
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
            return <Redirect to={{ pathname: '/', state: 'Post created successfully.' }} />
        }

        return (
            <div className="container">
                <h2>Add new post <Link to="/" className="btn btn-primary" style={{ float: 'right' }}>Posts listing</Link></h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" className="form-control" placeholder="Enter title" name="title" onChange={this.handleTitleChange} value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea name="body" placeholder="Enter body" className="form-control" onChange={this.handleBodyChange} defaultValue={this.state.body}></textarea>
                    </div>
                    <button type="submit" className="btn btn-default">Save</button>
                </form>
            </div>
        );
    }
}

export default Create;