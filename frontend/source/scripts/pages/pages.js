import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Portfolio   from './portfolio/portfolio.js';
import About       from './about/about.js';

import Error       from './error/error.js';
import Maintenance from './maintenance/maintenance.js';
import NotFound    from './notfound/notfound.js';

const Pages = (props) => {
    const pages = {};

    // Props
    const {page, title, stage} = props;

    // Hooks
    const navigate = useNavigate();

    // Functions
    const getComponent = () => {
        switch(page) {
            case 'Portfolio':   return <Portfolio   {...props} />; break;
            case 'About':       return <About       {...props} />; break;
            case 'Error':       return <Error       {...props} />; break;
            case 'Maintenance': return <Maintenance {...props} />; break;
            default:            return <NotFound    {...props} />;
        };
    };

    const navigateError = () => { // Similar function in navigation.js
        navigate('/error');
        stage.methods.pages.updateSectionScrollTarget({page: 'error', section: 'top'});
    }

    const navigateMaintenance = () => { // Similar function in navigation.js
        navigate('/maintenance');
        stage.methods.pages.updateSectionScrollTarget({page: 'maintenance', section: 'top'});
    }

    // Update page title and activate page...
    useEffect(() => {
        document.title = title;
        stage.methods.pages.updateActivePage(title);
    });

    // When active page updated...
    useEffect(() => {
        // Check status code
        if (stage.state.statusCode != 200) {
            stage.methods.updateHideClass();
            navigateError();
        } else {
            // Fetch System Config
            if (title == stage.state.pages.activePage) {
                fetch('/api/system-configuration?format=json')
                .then(response => response.json())
                .then(systemConfigurationObject => {
                    stage.methods.updateSystemConfiguration(systemConfigurationObject);
                    stage.methods.forceRender();
                });
            }
        }

    }, [stage.state.pages.activePage]);

    // Handle System Config
    useEffect(() => {
        if (stage.state.systemConfiguration) {
            // Log it...
            console.log(stage.state.systemConfiguration);
            
            // Navigate...
            if (stage.state.systemConfiguration.maintenance_mode) {
                navigateMaintenance();
            }
        }

        stage.methods.updateHideClass();
    }, [stage.state.forceRender]);

    return (
        <div id='page'>
            {getComponent()}
        </div>
    );
};

export default Pages;