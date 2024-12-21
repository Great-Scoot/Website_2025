import React, {useEffect} from 'react';

const Maintenance = (props) => {
    const maintenance = {};

    // Props
    const {page, title, pages, stage} = props;

    // Hooks

    // Update #navBrandSection when component mounts.
    useEffect(() => {
        stage.methods.pages.updateActiveSection(stage.globals.pages.maintenance.sections.maintenance);
    }, []);

    return (
        <div id='maintenance' ref={stage.refs.pages.maintenance.sections.maintenance}>
            <div id='MText'>
                <h2>Maintenance</h2>
                <p>{stage.state.systemConfiguration.maintenance_mode ? 'This website is being updated. Please check back soon.' : 'Website updates have been completed. Thank you.'}</p>
                <span id='MTextSmall'>Photo by <a href="https://unsplash.com/@bigmck56?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Trevor McKinnon</a> on <a href="https://unsplash.com/photos/wL3-nvcELpc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
            </div>
        </div>
    );
};

export default Maintenance;