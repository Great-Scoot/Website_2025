import React, {useEffect} from 'react';

const Error = (props) => {
    const error = {};

    // Props
    const {page, title, pages, stage} = props;

    // Hooks

    // Update #navBrandSection when component mounts.
    useEffect(() => {
        stage.methods.pages.updateActiveSection(stage.globals.pages.error.sections.error);
    }, []);

    return (
        <div id='error' ref={stage.refs.pages.error.sections.error}>
            <div id='EText'>
                <h2>Error ({stage.state.statusCode})</h2>
                <p>Well...here we are. How'd we end up here? Who knows...</p>
                <span id='ETextSmall'>Photo by <a href="https://unsplash.com/@bigmck56?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Trevor McKinnon</a> on <a href="https://unsplash.com/photos/wL3-nvcELpc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
            </div>
        </div>
    );
};

export default Error;