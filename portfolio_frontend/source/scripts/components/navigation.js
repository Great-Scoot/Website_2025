import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const NavButton = (props) => {
    const navButton = {};

    // Props
    const {id, route, pseudoSections, section, icon, content, stage, navigation} = props;

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    // Functions
    const getClasses = () => {
        let classes = `navButton btn hoverScaleBg ${navigation.state.phase} `;

        // If: Route button...
        if (pseudoSections && pseudoSections.indexOf(stage.state.pages.activeSection.id) > -1) {
            classes += `active ${navigation.state.navButtons.navButtonHovered ? 'hideNavButtonShadow' : ''}`;
        } else if (section && section === stage.state.pages.activeSection.id) { // Else: Section button...
            classes += `active ${navigation.state.navButtons.navButtonHovered ? 'hideNavButtonShadow' : ''}`;
        }

        return classes;
    };

    const handleClick = () => {
        // Reset #navBrandSection indicator
        stage.methods.pages.updateActiveSection({id: null, label: null, colorClass: null});

        // If: Route is different than current page, navigate.
        if (route && route !== location.pathname) {
            navigate(route);
        }

        // If: Specific section defined, scroll.
        if (section) {
            stage.methods.pages.updateSectionScrollTarget({page: route.replace(/\//g, ''), section: section});
        } else { // Else: Scroll to top.
            stage.methods.pages.updateSectionScrollTarget({page: location.pathname.replace(/\//g, ''), section: 'top'});
        }

        // Close #navMenu
        navigation.methods.updatePhase('closed');
    };

    const handleHover = (e) => {
        const navMenu = navigation.refs.navMenu.current;

        // Update count of how many rows the <NavButtons /> wrap into...
        navigation.methods.updateNavMenuRows(Math.floor(navMenu.offsetHeight / navigation.refs.navButtons.NBPortfolio.current.offsetHeight));
        
        // Remove shadow effect if a <NavButton /> is hovered.
        if (e.type === 'mouseenter') {
            navMenu.style.height = navMenu.offsetHeight + 'px';
            navigation.methods.navButtons.updateNavButtonHovered(true);
        } else if (e.type === 'mouseleave') {
            navMenu.style.height = 'auto';
            navigation.methods.navButtons.updateNavButtonHovered(false);
        }
    };

    const handleRef = () => {
        navigation.refs.navButtons[id] = useRef(null);
        return navigation.refs.navButtons[id];
    }

    return (
        <button 
            id={id}
            ref={handleRef()}
            className={getClasses()} 
            onClick={handleClick} 
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            aria-current={route === location.pathname ? 'page' : 'false'}
            type='button'
        >
            <div className='NBShadow'>
                <div className='NBSRight'></div>
                <div className='NBSBottom'></div>
            </div>
            <div className='NBContent'>
                <FontAwesomeIcon icon={icon} className='noMarginRight' /><br />
                {content}
            </div>
        </button>
    );
}

const Navigation = (props) => {
    const navigation = {};

    // Props
    const {stage} = props;

    // Hooks
    const navigate = useNavigate();

    // Refs
    navigation.refs = {
        navBars: useRef(null),
        navMenu: useRef(null),
        navMenuBackground: useRef(null),
        navButtons: {}
    };

    // State: <Navigation />
    const [phase, setPhase] = useState('closed');
    const [showNavBackground, setShowNavBackground] = useState(false);
    const [navMenuRows, setNavMenuRows] = useState(undefined);

    // State: <NavButton />
    const [navButtonHovered, setNavButtonHovered] = useState(false);

    // State object (for organization and passing to children).
    navigation.state = {
        // <Navigation />
        phase,
        showNavBackground,
        navMenuRows,
        // Children
        navButtons: {
            navButtonHovered
        }
    };

    // Methods (for organization and passing to children).
    navigation.methods = {
        // <Navigation />
        updatePhase: (targetPhase) => {
            // Open or close #navMenu
            const transitionDuration = 500;

            if (!navigation.refs.navBars.current.disabled) {
                switch(targetPhase) {
                    case 'open':
                        if (phase === 'closed') {
                            setPhase('opening');
                            setTimeout(() => {setPhase('open');}, transitionDuration);
                        }
                    break;
                    case 'closed':
                        if (phase === 'open') {
                            setPhase('closing');
                            setTimeout(() => {setPhase('closed');}, transitionDuration);
                        }
                    break;
                }
            }
        },
        updateNavMenuRows: (rows) => {
            setNavMenuRows(rows || undefined);
        },
        // Children
        navButtons: {
            updateNavButtonHovered: (hover) => {
                setNavButtonHovered(hover || false);
            }
        }
    };

    // Functions
    const getClipPath = () => {
        if (navigation.refs.navBars.current && navigation.refs.navMenuBackground.current) {
            const rect = navigation.refs.navBars.current.getBoundingClientRect();
            return `circle(${['closed', 'closing'].indexOf(phase) > -1 ? '21px' : '150%'} at ${rect.left + 21}px ${rect.top + 21}px)`;
        }
    };

    const handleClickNavBars = () => {
        // Show or hide #navMenu
        switch(phase) {
            case 'closed': navigation.methods.updatePhase('open');   break;
            case 'open':   navigation.methods.updatePhase('closed'); break;
        }
    }

    const handleClickNavContact = () => {
        navigate('/about');
        stage.methods.pages.updateSectionScrollTarget({page: 'about', section: 'contact'});
        navigation.methods.updatePhase('closed');
    }

    const navigateHome = () => { // Similar function in footer.js
        navigate('/portfolio');
        stage.methods.pages.updateSectionScrollTarget({page: 'portfolio', section: 'top'});
        navigation.methods.updatePhase('closed');
    }

    // Hooks

    // Interaction events, related to #navMenu 
    useEffect(() => {
        // Prevent scrolling when #navMenu open
        document.body.classList.toggle('overflowHidden', ['opening', 'open', 'closing'].indexOf(phase) > -1);

        // Close #navMenu with Escape key
        const handleKeyUp = (e) => {
            if (e.key === 'Escape' && phase === 'open') {
                navigation.methods.updatePhase('closed');
            }
        }

        // Add and reset event listener as needed...
        document.addEventListener('keyup', handleKeyUp);
        return () => document.removeEventListener('keyup', handleKeyUp);
    }, [phase]);

    // Show #nav background if scroll position is greater than navHeight
    useEffect(() => {
        let lastScrollPosition = window.scrollY;

        const handleScroll = (e) => {
            lastScrollPosition = window.scrollY;

            if (lastScrollPosition > stage.globals.navigation.navHeight && !showNavBackground) {
                setShowNavBackground(true);
            } else if (lastScrollPosition <= stage.globals.navigation.navHeight && showNavBackground) {
                setShowNavBackground(false);
            }
        }

        // Add, call, and reset event listener as needed...
        document.addEventListener('scroll', handleScroll); handleScroll();
        return () => document.removeEventListener('scroll', handleScroll);
    }, [showNavBackground]);

    return (
        <nav id='navigation' className={`${phase} ${showNavBackground ?  'showNavBackground' : ''}`}>
            <div id='navConstrainment' className={`${showNavBackground ? 'showNavBackground' : ''}`}>
                <div id='navMenuBackground' 
                    ref={navigation.refs.navMenuBackground} 
                    className={`${phase} ${showNavBackground ? 'showNavBackground' : ''}`}
                    style={{clipPath: getClipPath()}}
                ></div>
                <h1 id='navBrand'>
                    <img id='navBrandImage' className='imageBorder' onClick={navigateHome} src={'/images/me/profile_square_alt_small.jpg'} alt='Scott Zehner' />
                    <div id='navBrandName'  onClick={navigateHome}>
                        {(() => {
                            if (['xs', 'sm'].indexOf(stage.state.breakpoint) > -1) {
                                return 'SZ';
                            } else {
                                return <img id='navSignature' className='signature' src={'/images/me/signature.png'} alt='Scott Zehner' />;
                            }
                        })()}
                    </div>
                    {(() => {
                        if (stage.state.pages.activeSection.label && stage.state.pages.activeSection.colorClass) {
                            return (
                                <>
                                    <div id='navBrandSectionWrapper'>
                                        <div id='navBrandSection' ref={stage.refs.navigation.navBrandSection} className={stage.state.pages.activeSection.colorClass}>
                                            &nbsp;<b>&middot;</b>&nbsp;{stage.state.pages.activeSection.label}
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })()}
                </h1>
                {(() => {
                    if (['sm', 'md', 'lg', 'xl', 'xxl'].indexOf(stage.state.breakpoint) > -1) {
                        return (
                            <button 
                                id='navContact' 
                                className={`btn hoverScaleBg ${showNavBackground ? 'showNavBackground' : ''}`} 
                                onClick={handleClickNavContact}
                                type='button' 
                                disabled={phase === 'opening' || phase === 'closing'}
                            >
                                <FontAwesomeIcon icon={['fas', 'fa-envelope']} className={stage.state.breakpoint === 'sm' ? 'noMarginRight' : ''} />
                                {stage.state.breakpoint !== 'sm' ? 'Contact' : ''}
                            </button>
                        );
                    }
                })()}
                <button 
                    id='navBars' 
                    ref={navigation.refs.navBars} 
                    className={`btn btnRound hoverScaleBg ${phase} ${showNavBackground ? 'showNavBackground' : ''}`} 
                    onClick={handleClickNavBars} 
                    type='button' 
                    disabled={phase === 'opening' || phase === 'closing'}
                >
                    <FontAwesomeIcon icon={['fas', (phase === 'closed' || phase === 'closing' ? 'fa-bars' : 'fa-xmark')]} className='noMarginRight' />
                </button>
                <ul id='navMenu' ref={navigation.refs.navMenu} className={`${phase} ${navMenuRows >= 3 ? 'navMenuLimitOverflow' : '' }`}>
                    {/* /portfolio */}
                    <li>
                        <NavButton id='NBPortfolio' route='/portfolio' pseudoSections={['hero', 'goToProfile']} icon={['fas', 'fa-diagram-project']} content='Portfolio' stage={stage} navigation={navigation} />
                    </li>
                    <li>
                        <NavButton id='NBLatestWork' route='/portfolio' section='latestWork' icon={['fas', 'fa-code']} content='Latest Work' stage={stage} navigation={navigation} />
                    </li>
                    <li>
                        <NavButton id='NBPreviousWork' route='/portfolio' section='previousWork' icon={['fas', 'fa-video']} content='Previous Work' stage={stage} navigation={navigation} />
                    </li>
                    {/* About */}
                    <li>
                        <NavButton id='NBProfile' route='/about' pseudoSections={['profile', 'seeMyWork']} icon={['fas', 'fa-circle-info']} content='Profile' stage={stage} navigation={navigation} />
                    </li>
                    <li>
                        <NavButton id='NBResume' route='/about' section='resume' icon={['fas', 'fa-user-tie']} content='Resume' stage={stage} navigation={navigation} />
                    </li>
                    <li>
                        <NavButton id='NBContact' route='/about' section='contact' icon={['fas', 'fa-envelope']} content='Contact' stage={stage} navigation={navigation} />
                    </li>
                    {/* /user */}
                    {/*
                    <li>
                        <NavButton id='NBUserCreate' route='/user/create' icon={['fas', 'fa-user-plus']} content='Create Account' stage={stage} navigation={navigation} />
                    </li>
                    <li>
                        <NavButton id='NBUserLogin' route='/user/login' icon={['fas', 'fa-user']} content='Login' stage={stage} navigation={navigation} />
                    </li>
                    <li>
                        <NavButton id='NBUserReset' route='/user/reset' icon={['fas', 'fa-rotate-right']} content='Reset Password' stage={stage} navigation={navigation} />
                    </li>
                    <li>
                        <NavButton id='NBUserDelete' route='/user/delete' icon={['fas', 'fa-user-minus']} content='Delete Account' stage={stage} navigation={navigation} />
                    </li>
                    */}
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;