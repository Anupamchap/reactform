import React, { Component } from 'react';
import '../css/Applcantform.css'

const validEmailRegex =
    RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

class Applicantform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            country: null,
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                country: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 5
                        ? 'First Name must be 5 characters long!'
                        : '';
                break;
            case 'lastName':
                errors.lastName =
                    value.length < 5
                        ? 'Last Name must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'country':
                errors.country =
                    value.length < 3
                        ? 'Country name must be 3 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    validateForm = (errors) => {
        console.log(errors)
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => (val.length > 0) && (valid = false)

        );

        return valid;
    }


    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        if (this.state.firstName && this.state.lastName && this.state.email && this.state.country) {


            if (this.validateForm(this.state.errors)) {
                alert('Valid Form')
            } else {
                alert('Invalid Form')
            }
        }
        else {
            alert('Please enter all the details')
        }
    }







    render() {
        return (
            <div className='applicationform'>
                <div className='formwrapper'>
                    <h2>Application form</h2>
                    <label>First Name:</label>
                    <input type='text' name='firstName' onChange={this.handleChange} /><br></br>
                    {this.state.errors.firstName.length > 0 &&
                        <span className='error'>{this.state.errors.firstName}</span>}

                    <label>Last Name:</label>
                    <input type='text' name='lastName' onChange={this.handleChange} /><br></br>
                    {this.state.errors.lastName.length > 0 &&
                        <span className='error'>{this.state.errors.lastName}</span>}

                    <label>Email:</label>
                    <input type='text' name='email' onChange={this.handleChange} /><br></br>
                    {this.state.errors.email.length > 0 &&
                        <span className='error'>{this.state.errors.email}</span>}

                    <label>Country:</label>
                    <input type='text' name='country' onChange={this.handleChange} /><br></br>
                    {this.state.errors.country.length > 0 &&
                        <span className='error'>{this.state.errors.country}</span>}

                    <input id="next" type='button' value="Submit" onClick={this.handleSubmit}></input>
                </div>
            </div>
        );
    }
}

export default Applicantform;