import React from 'react';
import UserForm from './components/userform';

const Reset = (props) => {
    return (
        <div id='reset'>
            <h2>Reset Password</h2>
            <UserForm mode='reset' {...props} />
        </div>
    );
};

export default Reset;