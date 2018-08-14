import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import config from 'react-global-configuration'

class CreateWithValidation extends Component {
    constructor(props) {
        super()

        this.state = {
            url: config.get('url') + 'posts',
            title: '',
            body: '',
            toHome: false,
            formErrors: { title: '', body: '' },
            titleValid: false,
            bodyValid: false,
            formValid: false
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let bodyValid = this.state.passwordValid;

        switch (fieldName) {
            case 'title':
                titleValid = value.length >= 4;
                fieldValidationErrors.title = titleValid ? '' : ' is invalid';
                break;
            case 'body':
                bodyValid = value.length >= 6;
                fieldValidationErrors.body = bodyValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            titleValid: titleValid,
            bodyValid: bodyValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.titleValid && this.state.bodyValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleTitleChange(event) {
        let $this = this
        let title = event.target.value

        this.setState({
            title: title
        }, () => { $this.validateField('title', title) });
    }

    handleBodyChange(event) {
        let $this = this
        let body = event.target.value

        this.setState({
            body: body
        }, () => { $this.validateField('body', body) });
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
                <div className='formErrors'>
                    <ul>
                        {Object.keys(this.state.formErrors).map((fieldName, i) => {
                            if (this.state.formErrors[fieldName].length > 0) {
                                return (
                                    <li key={i}>{fieldName} {this.state.formErrors[fieldName]}</li>
                                )
                            } else {
                                return '';
                            }
                        })}
                    </ul>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={'form-group ' + this.errorClass(this.state.formErrors.title)}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" className="form-control" placeholder="Enter title" name="title" onChange={this.handleTitleChange} value={this.state.title} />
                    </div>
                    <div className={'form-group ' + this.errorClass(this.state.formErrors.body)}>
                        <label htmlFor="body">Body:</label>
                        <textarea name="body" placeholder="Enter body" className="form-control" onChange={this.handleBodyChange} defaultValue={this.state.body}></textarea>
                    </div>
                    <button type="submit" className="btn btn-default" disabled={!this.state.formValid}>Save</button>
                </form>
            </div>
        );
    }
}

export default CreateWithValidation;