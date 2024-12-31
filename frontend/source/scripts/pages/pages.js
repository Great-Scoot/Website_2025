import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Portfolio   = React.lazy(() => import(/* webpackChunkName: "portfolio" */   './portfolio/portfolio.js'));
const About       = React.lazy(() => import(/* webpackChunkName: "about" */       './about/about.js'));
const Error       = React.lazy(() => import(/* webpackChunkName: "error" */       './error/error.js'));
const Maintenance = React.lazy(() => import(/* webpackChunkName: "maintenance" */ './maintenance/maintenance.js'));
const NotFound    = React.lazy(() => import(/* webpackChunkName: "not-found" */   './notfound/notfound.js'));

const Pages = (props) => {
    const pages = {};

    // Props
    const {page, title, stage} = props;

    // Methods (for organization and passing to children).
    pages.methods = {
        // Used to update #navBrandSection for some, not all, pages.
        createScrollHandler: (sectionRefs) => (e) => {
            const scrollPosition = window.scrollY;

            // Loop through sectionRefs...
            for (const sectionKey in sectionRefs) {
                const sectionValue = sectionRefs[sectionKey];
        
                // If scroll position less than section's distance from top, plus half the section's height, minus fixed navHeight...
                if (scrollPosition < (sectionValue.offsetTop + (sectionValue.offsetHeight / 2) - stage.globals.navigation.navHeight)) {
                    // Check if sectionKey is not current activeSection...
                    if (sectionKey !== stage.state.pages.activeSection.id) {
                        // Update activeSection.
                        stage.methods.pages.updateActiveSection(stage.globals.pages[page].sections[sectionKey]);
                    }
                    break;
                }
            }
        }
    }

    // Functions
    const navigate = useNavigate();

    const navigateError = () => { // Similar function in navigation.js
        navigate('/error');
        stage.methods.pages.updateSectionScrollTarget({page: 'error', section: 'top'});
    }

    const navigateMaintenance = () => { // Similar function in navigation.js
        navigate('/maintenance');
        stage.methods.pages.updateSectionScrollTarget({page: 'maintenance', section: 'top'});
    }

    // Hooks

    // Update page title and activate page...
    useEffect(() => {
        document.title = title;
        stage.methods.pages.updateActivePage(page);
    });

    // When active page updated...
    useEffect(() => {
        // Check status code
        if (stage.state.statusCode != 200) {
            stage.methods.updateHideClass();
            navigateError();
        } else {
            // Ignore null state...
            if (page == stage.state.pages.activePage) {
                
                // Fetch System Config if not first active page...
                if (!stage.state.pages.isFirstActivePage) {
                    fetch('/api/system-configuration?format=json')
                        .then(response => response.json())
                        .then(systemConfigurationObject => {
                            stage.methods.updateSystemConfiguration(systemConfigurationObject);
                    });

                    fetch(`/api/slider-items?page_name=${page}`)
                        .then(response => response.json())
                        .then(sliderItemsArray => {
                            stage.methods.pages.updateSliderItems(sliderItemsArray.length > 1 ? sliderItemsArray : []);
                    });
                }

                // Set isFirstActivePage to false.
                stage.methods.pages.updateIsFirstActivePage();
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
    }, [stage.state.systemConfiguration]);

    // Handle Slider Items
    useEffect(() => {
        if (stage.state.pages.sliderItems) {
            // Log it...
            console.log(stage.state.pages.sliderItems);
        }

    }, [stage.state.pages.sliderItems]);

    return (
        <div id='page'>
            {(() => {
                switch(page) {
                    case 'portfolio':   return <Portfolio   pages={pages} {...props} />; break;
                    case 'about':       return <About       pages={pages} {...props} />; break;
                    case 'error':       return <Error       pages={pages} {...props} />; break;
                    case 'maintenance': return <Maintenance pages={pages} {...props} />; break;
                    default:            return <NotFound    pages={pages} {...props} />;
                };
            })()}
        </div>
    );
};

export default Pages;