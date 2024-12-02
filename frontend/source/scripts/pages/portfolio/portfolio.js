import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Slider} from '../../components/slider.js';
import Work from '../../components/work.js';

import WebDev from './webDev.js';
import Webcasting from './webcasting.js';
import EventProduction from './eventProduction.js';

const Hero = (props) => {
    const hero = {};

    // Props
    const {portfolio, stage} = props;

    // Slides array
    const slidesArray = [
        {title: 'Code',    imageURL: '/static/images/sliders/hero/Code.jpg',    type: 'image'},
        {title: 'S&T',     imageURL: '/static/images/sliders/hero/S&T.jpg',     type: 'image'},
        {title: 'Conagra', imageURL: '/static/images/sliders/hero/Conagra.jpg', type: 'image'},
        {title: 'AAM',     imageURL: '/static/images/sliders/hero/AAM.jpg',     type: 'image'},
        {title: 'Regions', imageURL: '/static/images/sliders/hero/Regions.jpg', type: 'image'},
        {title: 'Red',     imageURL: '/static/images/sliders/hero/Red.jpg',     type: 'image'}
    ];

    // State
    const [active, setActive] = useState(true);

    // State object (for organization and passing to children).
    hero.state = {
        active
    };

    // Functions
    const handleHeroButtonClick = () => {
        stage.methods.pages.updateSectionScrollTarget({page: 'portfolio', section: 'latestWork'});
    };

    return (
        <div id='hero' ref={stage.refs.pages.portfolio.sections.hero} className='section sectionDarkened'>
            <div className='row'>
                <div className='col-12 col-md-6 order-md-1'>
                    <div id='heroCard' className='card backgroundBlueBurst'>
                        <img id='HeroCardHeaderImage' className='imageBorder' src={'/static/images/me/profile_square_alt_small.jpg'} alt='Scott Zehner' />
                        <div id='heroCardBody' className='card-body'>
                            <h4 className='card-title'>Summary</h4>
                            <p className='card-text'>Dedicated developer, project leader, and creative producer. Well versed in application development, content creation, and audio-visual engineering. Contributed to thousands of successful projects for many satisfied clients.</p>
                            <button id='heroButton' className='btn btn-outline-primary btnCyan' onClick={handleHeroButtonClick} type='button'>
                                <FontAwesomeIcon icon={['fas', 'fa-arrow-turn-down']} className='fa-flip-horizontal' />See my work
                            </button>
                        </div>
                    </div>
                </div>
                <div className='d-none d-md-block col-md-6 order-0'>
                    <Slider 
                        config={{
                            id: 'heroSlider',
                            autoplay: true, 
                            autoplayInterval: 12, 
                            controls: true, 
                            progressBar: true,
                            slidesArray: slidesArray 
                        }} 
                        parent={hero} 
                        stage={stage} 
                    />
                </div>
            </div>
        </div>
    );
};

const LatestWork = (props) => {
    const latestWork = {};

    // Props
    const {portfolio, stage} = props;

    // State
    const [activeIndex, setActiveIndex] = useState(null);
    const [hoverIndex,  setHoverIndex]  = useState(null);

    // State object (for organization and passing to children).
    latestWork.state = {
        activeIndex,
        hoverIndex
    };

    // Methods (for organization and passing to children).
    latestWork.methods = {
        updateActiveIndex: (newIndex) => {
            if (typeof newIndex === 'number' && newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            } else {
                setActiveIndex(null);
            }
        },
        updateHoverIndex: (newIndex) => {
            if (typeof newIndex === 'number' && newIndex !== hoverIndex) {
                setHoverIndex(newIndex);
            } else {
                setHoverIndex(null);
            }
        }
    };

    return (
        <div id='latestWork' ref={stage.refs.pages.portfolio.sections.latestWork} className='section'>
            <h4 id='latestWorkHeading' className='sectionHeading'>Latest Work</h4>
            <div id='latestWorkContent'>
                <div id='latestWorkRow' className='row g-0'>
                    {(() => {
                        const config = {
                            index: 0,
                            id: 'webDevWork',
                            classes: 'pink',
                            title: 'Web Development',
                            subtitle: 'Applications and Websites',
                            page: 'portfolio',
                            section: 'latestWork'
                        };

                        return (
                            <Work config={config} parent={latestWork} stage={stage}>
                                <WebDev config={config} parent={latestWork} stage={stage} />
                            </Work>
                        );
                    })()}
                    {(() => {
                        const config = {
                            index: 1,
                            id: 'webcastingWork',
                            classes: 'yellow',
                            title: 'Webcasting',
                            subtitle: 'Live and On Demand Streaming',
                            page: 'portfolio',
                            section: 'latestWork'
                        };

                        return (
                            <Work config={config} parent={latestWork} stage={stage}>
                                <Webcasting config={config} parent={latestWork} stage={stage} />
                            </Work>
                        );
                    })()}
                    {(() => {
                        const config = {
                            index: 2,
                            id: 'onSiteWork',
                            classes: 'green',
                            title: 'Event Production',
                            subtitle: 'Audio/Visual Engineering',
                            page: 'portfolio',
                            section: 'latestWork'
                        };

                        return (
                            <Work config={config} parent={latestWork} stage={stage}>
                                <EventProduction config={config} parent={latestWork} stage={stage} />
                            </Work>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
};

const PreviousWork = (props) => {
    const previousWork = {};

    // Props
    const {portfolio, stage} = props;

    return (
        <div id='previousWork' ref={stage.refs.pages.portfolio.sections.previousWork} className='section sectionDarkened'>
            <h4 id='previousWorkHeading' className='sectionHeading'>Previous Work</h4>
            <div id='previousWorkContent'>
                <div id='previousWorkRow' className='row g-0'>
                    <div className='col-12'>
                        <div id='PWDescription' className='workDescription backgroundBlueBurst'>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <div id='PWYouTubeContainer' className='YouTubeContainer'>
                                        <iframe id='PWShowReel' width='100%' height='100%' src='https://www.youtube.com/embed/iAwZmRfLRVc' title='YouTube video player' allow='autoplay; encrypted-media;' allowFullScreen></iframe>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <h4 className='WDHeading'>Video Production</h4>
                                    <p className='WDParagraph'>Previously, I've worked as a Cameraman and Video Editor. I've helped produce over 50 videos including broadcast commercials, web videos, instructional content, and social media content.</p>
                                    <p className='WDParagraph'>As a Cameraman, I've filmed in-studio and on-location, using single and multi-camera workflows, including advanced sound and lighting designs, as well as cinema-quality cameras and supporting gear.</p>
                                    <p className='WDParagraph'>As a Video Editor, I've designed and animated motion graphics (2D and 3D), created virtual sets, composed videos with green screen footage, and published content to a variety of locations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GoToProfile = (props) => {
    const goToProfile = {};

    // Props
    const {portfolio, stage} = props;

    // Hooks
    const navigate = useNavigate();

    // Functions
    const navigateContact = () => {
        navigate('/about');
        stage.methods.pages.updateSectionScrollTarget({page: 'about', section: 'top'});
    }

    const scrollUp = () => {
        stage.methods.pages.updateSectionScrollTarget({page: 'portfolio', section: 'top'});
    };

    return (
        <div id='goToProfile' ref={stage.refs.pages.portfolio.sections.goToProfile} className='section sectionDarkened'>
            <button className='btn btn-outline-primary btnCyan' onClick={navigateContact} type='button'>
                <FontAwesomeIcon icon={['fas', 'fa-user']} />About Me
            </button>
            <button className='btn btn-outline-primary btnBlue' onClick={scrollUp} type='button'>
                <FontAwesomeIcon icon={['fas', 'fa-arrow-turn-up']} className='fa-flip-horizontal' />Back to Top
            </button>
        </div>
    );
};


const Portfolio = (props) => {
    const portfolio = {};

    // Props
    const {stage} = props;

    // Hooks

    // Update #navBrandSection on scroll
    useEffect(() => {
        let lastScrollPosition = window.scrollY;

        // Shorthand
        const shortRefs = {
            hero:         stage.refs.pages.portfolio.sections.hero.current,
            latestWork:   stage.refs.pages.portfolio.sections.latestWork.current,
            previousWork: stage.refs.pages.portfolio.sections.previousWork.current,
            goToProfile:   stage.refs.pages.portfolio.sections.goToProfile.current
        };

        const handleScroll = (e) => {
            lastScrollPosition = window.scrollY;

            // Update activeSection...
            for (const key in shortRefs) {
                const value = shortRefs[key];

                // Compare scroll position to mid point of each section...
                if (lastScrollPosition < value.offsetTop - stage.globals.navigation.navHeight + value.offsetHeight / 2) {
                    // If activeSection should be updated...
                    if (stage.state.pages.activeSection.id !== key) {
                        // Update it.
                        stage.methods.pages.updateActiveSection(stage.globals.pages.portfolio.sections[key]);
                    }
                    break;
                }
            }
        }

        // Add, call, and reset event listener as needed...
        document.addEventListener('scroll', handleScroll); handleScroll();
        return () => document.removeEventListener('scroll', handleScroll);
    }, [stage.state.pages.activeSection]);

    return (
        <div id='portfolio'>
            <Hero         portfolio={portfolio} stage={stage} />
            <LatestWork   portfolio={portfolio} stage={stage} />
            <PreviousWork portfolio={portfolio} stage={stage} />
            <GoToProfile  portfolio={portfolio} stage={stage} />
        </div>
    );
};

export default Portfolio;