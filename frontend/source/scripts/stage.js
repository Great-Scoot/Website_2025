import React, {useEffect, useRef, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navigation from './components/navigation.js';
import Pages      from './pages/pages.js';
import Footer     from './components/footer.js';

const Stage = () => {
    const stage = {};

    // Globals
    stage.globals = {
        breakpoints: {
            xs:  {label: 'xs',  previous: 'xs', value: 0},
            sm:  {label: 'sm',  previous: 'xs', value: 576},
            md:  {label: 'md',  previous: 'sm', value: 768},
            lg:  {label: 'lg',  previous: 'md', value: 992},
            xl:  {label: 'xl',  previous: 'lg', value: 1200},
            xxl: {label: 'xxl', previous: 'xl', value: 1400}
        },
        navigation: {
            navHeight: 93.25 // Height (when #navBars closed) + margin bottom
        },
        pages: {
            portfolio: {
                sections: { // Not referenced in many cases. See <NavButton /> and <Portfolio />...
                    hero:         {id: 'hero',         label: 'Portfolio',     colorClass: 'teal'},
                    latestWork:   {id: 'latestWork',   label: 'Latest Work',   colorClass: 'cyan'},
                    previousWork: {id: 'previousWork', label: 'Previous Work', colorClass: 'purple'},
                    goToProfile:  {id: 'goToProfile',  label: 'About Me',      colorClass: 'pink'}
                }
            },
            about: {
                sections: { // Not referenced in many cases. See <NavButton /> and <About />...
                    profile:   {id: 'profile',   label: 'Profile',     colorClass: 'teal'},
                    resume:    {id: 'resume',    label: 'Resume',      colorClass: 'cyan'},
                    contact:   {id: 'contact',   label: 'Contact',     colorClass: 'purple'},
                    seeMyWork: {id: 'seeMyWork', label: 'See my Work', colorClass: 'pink'},
                }
            },
            error: {
                sections: {
                    error: {id: 'error', label: '', colorClass: 'teal'}
                }
            },
            maintenance: {
                sections: {
                    maintenance: {id: 'maintenance', label: '', colorClass: 'teal'}
                }
            },
            notFound: {
                sections: {
                    notFound: {id: 'notFound', label: '', colorClass: 'teal'}
                }
            }
        },
        transitions: {
            durations: {
                fast: 250,
                slow: 500
            }
        }
    };

    // Refs
    stage.refs = {
        navigation: {
            navBrandSection: useRef(null)
        },
        pages: {
            portfolio: {
                sections: {
                    hero:         useRef(null),
                    latestWork:   useRef(null),
                    previousWork: useRef(null),
                    goToProfile:  useRef(null)
                }
            },
            about: {
                sections: {
                    profile:   useRef(null),
                    resume:    useRef(null),
                    contact:   useRef(null),
                    seeMyWork: useRef(null)
                }
            },
            error: {
                sections: {
                    error: useRef(null)
                }
            },
            maintenance: {
                sections: {
                    maintenance: useRef(null)
                }
            },
            notFound: {
                sections: {
                    notFound: useRef(null)
                }
            }
        },
        stage: useRef(null)
    };

    // State: <Stage />
    const [breakpoint,     setBreakpoint]     = useState('xs');
    const [lastBreakpoint, setLastBreakpoint] = useState(breakpoint);

    const [forceRender,          setForceRender]         = useState(0);
    const [hideClass,            setHideClass]           = useState('');
    const [statusCode,           setStatusCode]          = useState(systemData && systemData.statusCode ? systemData.statusCode : 200);
    const [systemConfiguration,  setSystemConfiguration] = useState(systemData && systemData.systemConfiguration ? systemData.systemConfiguration : null);

    // State: <Pages />
    const [activePage,          setActivePage]          = useState(null);
    const [activeSection,       setActiveSection]       = useState({id: null, label: null, colorClass: null});
    const [sectionScrollTarget, setSectionScrollTarget] = useState({page: null, section: null});

    // State object (for organization and passing to children).
    stage.state = {
        // <Stage />
        breakpoint,
        lastBreakpoint,
        forceRender,
        hideClass,
        statusCode,
        systemConfiguration,
        pages: {
            activePage,
            activeSection,
            sectionScrollTarget
        }
    };

    // Methods (for organization and passing to children).
    stage.methods = {
        // <Stage />
        forceRender: () => {
            setForceRender(prev => prev + 1);
        },
        updateBreakpoint: (newBreakpoint) => {
            setLastBreakpoint(breakpoint || 'xs');
            setBreakpoint(newBreakpoint  || 'xs');
        },
        updateHideClass: () => {
            setHideClass(statusCode != 200 || (systemConfiguration && systemConfiguration.maintenance_mode) ? 'hideClass' : '');
        },
        updateSystemConfiguration: (systemConfigurationObject) => {
            setSystemConfiguration(systemConfigurationObject);
        },
        // Children
        pages: {
            updateActivePage: (pageTitle) => {
                setActivePage(pageTitle);
            },
            updateActiveSection: (sectionObject) => {
                setActiveSection(sectionObject);
            },
            updateSectionScrollTarget: (scrollTarget) => {
                setSectionScrollTarget(scrollTarget);
            }
        }
    };

    // Update breakpoint on window resize
    useEffect(() => {
        const handleWindowResize = (e) => {
            // If: Window width is greater than any of the breakpoints, set to 'xxl'.
            if (window.innerWidth > stage.globals.breakpoints.xxl.value) {
                stage.methods.updateBreakpoint('xxl');
            } else { // Else: Loop through breakpoints
                for (const key in stage.globals.breakpoints) {
                    const breakpointObject = stage.globals.breakpoints[key]; // Do not override 'breakpoint'.
    
                    // Once breakpoint found which is larger...
                    if (breakpointObject.value > window.innerWidth) {
                        const previousBreakpointObject = stage.globals.breakpoints[breakpointObject.previous];
    
                        // Update breakpoint if previous breakpoint is not currently set.
                        if (breakpoint !== previousBreakpointObject.label) {
                            stage.methods.updateBreakpoint(previousBreakpointObject.label);
                        }
                        break;
                    }
                }
            }
        }

        // Add, call, and reset event listener as needed...
        window.addEventListener('resize', handleWindowResize); handleWindowResize();
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [breakpoint]);

    // Trigger animation on #navBrandsSection
    useEffect(() => {
        if (stage.refs.navigation.navBrandSection.current) {
            // Add .animate, then remove
            stage.refs.navigation.navBrandSection.current.classList.add('animate');
            setTimeout(() => {
                if (stage.refs.navigation.navBrandSection.current) {
                    stage.refs.navigation.navBrandSection.current.classList.remove('animate');
                }
            }, stage.globals.transitions.durations.fast);
        }
    }, [activeSection]);

    // Scroll to the target section.
    useEffect(() => {
        if (sectionScrollTarget.page && sectionScrollTarget.section) {
            // If: Target is top of page...
            if (sectionScrollTarget.section === 'top') {
                window.scrollTo({
                    behavior: 'smooth',
                    top: 0
                });
            } else { // Else: Target is a specific section...
                window.scrollTo({
                    behavior: 'smooth',
                    top: stage.refs.pages[sectionScrollTarget.page].sections[sectionScrollTarget.section].current.offsetTop - stage.globals.navigation.navHeight
                });
            }

            // Unset...
            setSectionScrollTarget({page: null, section: null});
        }
    }, [sectionScrollTarget]);

    return (
        <div id='stage' ref={stage.refs.stage}>
            <Router>
                {/* NAV */}
                <Navigation stage={stage} />

                {/* CONTENT */}
                <Routes>
                    <Route exact path='/'>
                        <Route index               element={<Pages page='Portfolio' title='Portfolio' stage={stage} />} />
                        <Route exact path='/index' element={<Pages page='Portfolio' title='Portfolio' stage={stage} />} />
                    </Route>
                    <Route exact path='/portfolio'>
                        <Route index element={<Pages page='Portfolio' title='Portfolio' stage={stage} />} />
                    </Route>
                    <Route exact path='/about'>
                        <Route index element={<Pages page='About' title='About' stage={stage} />} />
                    </Route>
                    <Route exact path='/error'>
                        <Route index element={<Pages page='Error' title='Error' stage={stage} />} />
                    </Route>
                    <Route exact path='/maintenance'>
                        <Route index element={<Pages page='Maintenance' title='Maintenance' stage={stage} />} />
                    </Route>
                    <Route path="*" element={<Pages page='NotFound' title='Not Found' stage={stage} />} />
                </Routes>

                {/* FOOTER */}
                <Footer stage={stage} />
            </Router>
        </div>
    );
}

export default Stage;