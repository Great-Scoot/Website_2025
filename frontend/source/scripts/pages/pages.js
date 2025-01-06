import React, {useEffect, useState} from 'react';
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

    // State
    const [sliderItems, setSliderItems] = useState(systemData && systemData.sliderItems ? systemData.sliderItems : []);

    // State object (for organization and passing to children).
    pages.state = {
        sliderItems,
    }

    // Methods (for organization and passing to children).
    pages.methods = {
        // Used to update #navBrandSection for some (not all) pages.
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
                    // Don't check any more sections
                    break;
                }
            }
        },
        getSliderItemsBySliderName: (sliderName, sortBy='order', sortDirection='asc') => {
            if (sliderItems && sliderItems.length > 1) {
                let filteredItems = sliderItems.filter(item => item.slider.name === sliderName);
                let sortedFilteredItems = filteredItems;

                if (sortBy === 'order') {
                    sortedFilteredItems.sort((a, b) => {
                        const orderA = a.order || 0; // Default to 0
                        const orderB = b.order || 0;
                        return sortDirection === 'asc' ? orderA - orderB : orderB - orderA;
                    });
                } else if (sortBy === 'random') {
                    sortedFilteredItems.sort(() => Math.random() - 0.5);
                }

                return sortedFilteredItems;
            } else {
                return [];
            }
        },
        navigateAndScroll: (route, scrollTargetObject) => {
            navigate(route);
            stage.methods.pages.updateSectionScrollTarget(scrollTargetObject);
        },
        updateSliderItems: (sliderItemsArray) => {
            setSliderItems(sliderItemsArray);
        },
    }

    // Hooks
    const navigate = useNavigate(); // Must be used within context of <Router />

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
            pages.methods.navigateAndScroll('/error', {page: 'error', section: 'top'});
        } else {
            // Ignore null state...
            if (page == stage.state.pages.activePage) {
                
                // Fetch System Config
                if (!stage.state.pages.isFirstActivePage) {
                    fetch('/api/system-configuration?format=json')
                        .then(response => response.json())
                        .then(systemConfigurationObject => {
                            stage.methods.updateSystemConfiguration(systemConfigurationObject);
                    });
                }

                // Fetch Slider Items
                if (!stage.state.pages.isFirstActivePage || (pages.state.sliderItems.length <= 1 && !stage.state.systemConfiguration.maintenance_mode)) {
                    fetch(`/api/slider-items?page_name=${page}`)
                        .then(response => response.json())
                        .then(sliderItemsArray => {
                            pages.methods.updateSliderItems(sliderItemsArray.length > 1 ? sliderItemsArray : []);
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
            console.log(stage.state.systemConfiguration);
            
            // Navigate...
            if (stage.state.systemConfiguration.maintenance_mode) {
                pages.methods.navigateAndScroll('/maintenance', {page: 'maintenance', section: 'top'});
            }
        }

        stage.methods.updateHideClass();
    }, [stage.state.systemConfiguration]);

    // Handle Slider Items
    // useEffect(() => {
    //     if (pages.state.sliderItems) {
    //         console.log(pages.state.sliderItems);
    //     }

    // }, [pages.state.sliderItems]);

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