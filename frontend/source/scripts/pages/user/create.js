import React from 'react';
import UserForm from './components/userform';

const Create = (props) => {
    return (
        <div id='create'>
            <h2>Create an Account</h2>
            <UserForm mode='create' {...props} />
        </div>
    );
};

export default Create;