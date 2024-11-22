import React from 'react';
import UserForm from './components/userform';

const Delete = (props) => {
    return (
        <div id='delete'>
            <h2>Delete Account</h2>
            <UserForm mode='delete' {...props} />
        </div>
    );
};

export default Delete;