import React from 'react';
import {useNavigate} from 'react-router-dom';

const NotFound = (props) => {
    const notFound = {};

    // Props
    const {stage} = props;

    // Hooks
    const navigate = useNavigate();

    // Functions
    const navigateHome = () => { // Similar function in navigation.js
        navigate('/portfolio');
        stage.methods.pages.updateSectionScrollTarget({page: 'portfolio', section: 'top'});
    }

    return (
        <div id='notFound'>
            <div id='NFText'>
                <h2>Page not found</h2>
                <p>The page you were looking for doesn't exist. To visit the home page, <button id='NFNavHome' className='btn btn-link' onClick={navigateHome} type='button'>click here</button>.</p>
                Photo by <a href="https://unsplash.com/@bigmck56?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Trevor McKinnon</a> on <a href="https://unsplash.com/photos/wL3-nvcELpc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </div>
        </div>
    );
};

export default NotFound;