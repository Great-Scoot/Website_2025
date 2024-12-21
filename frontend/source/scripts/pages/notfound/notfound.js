import React, {useEffect} from 'react';

const NotFound = (props) => {
    const notFound = {};

    // Props
    const {page, title, pages, stage} = props;

    // Hooks

    // Update #navBrandSection when component mounts.
    useEffect(() => {
        stage.methods.pages.updateActiveSection(stage.globals.pages.notFound.sections.notFound);
    }, []);

    return (
        <div id='notFound' ref={stage.refs.pages.notFound.sections.notFound}>
            <div id='NFText'>
                <h2>Page not found</h2>
                <p>This is not the page you were looking for.</p>
                <span id='NFTextSmall'>Photo by <a href="https://unsplash.com/@bigmck56?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Trevor McKinnon</a> on <a href="https://unsplash.com/photos/wL3-nvcELpc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
            </div>
        </div>
    );
};

export default NotFound;