import React from 'react';
import UserForm from './components/userform';

const Login = (props) => {
    return (
        <div id='login'>
            <h2>Login</h2>
            <UserForm mode='login' {...props} />
        </div>
    );
};

export default Login;