import React, { Component } from 'react'
import './sign-in.styles.scss';

import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';
import {auth ,  signInWithGoogle } from './../../firebase/firebase.utils';
class SignIn extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: ''
        };
      }
    
      handleSubmit = async event => {
        event.preventDefault();
    
        const { email, password } = this.state;
    
        try {
          await auth.signInWithEmailAndPassword(email, password);
          this.setState({ email: '', password: '' });
        } catch (error) {
          console.log(error);
        }
      };
    
      handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
    
    render() {
        return (
            <div className='sign-in'>
                <h2> Ialready have an account</h2>
                <span> sign in with your email & password </span>

                <form  onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        label='email'
                        required
                        handleChange ={this.handleChange}
                    />

                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        label='password' 
                        required
                        handleChange ={this.handleChange}
                    />
                    <div className='buttons'>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton
                        onClick={signInWithGoogle}
                        isGoogleSignIn
                    >
                        Sign in with Google
                    </CustomButton>
                    </div> 
                </form>
            </div>
        )
    }
}
export default SignIn; 