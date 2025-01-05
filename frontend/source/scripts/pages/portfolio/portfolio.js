import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Slider} from '../../components/slider.js';
import Work     from '../../components/work.js';

import WebDev from './webDev.js';
import Webcasting from './webcasting.js';
import EventProduction from './eventProduction.js';

const Hero = (props) => {
    const hero = {};

    // Props
    const {portfolio, pages, stage} = props;

    // State
    const [active,      setActive]      = useState(true);
    const [slidesArray, setSlidesArray] = useState([]);

    // State object (for organization and passing to children).
    hero.state = {
        active,
        slidesArray
    };

    // Methods (for organization and passing to children).
    hero.methods = {
        updateSlidesArray: (slidesArray) => {
            setSlidesArray(slidesArray);
        }
    };

    // Functions
    const handleHeroButtonClick = () => {
        stage.methods.pages.updateSectionScrollTarget({page: 'portfolio', section: 'latestWork'});
    };

    // Hooks

    // Update hero.state.slidesArray when page.state.sliderItems updates.
    useEffect(() => {
        if (hero.state.slidesArray.length === 0) {
            hero.methods.updateSlidesArray(pages.methods.getSliderItemsBySliderName('heroSlider', 'order'));
        }
    }, [pages.state.sliderItems]);

    return (
        <div id='hero' ref={stage.refs.pages.portfolio.sections.hero} className='section sectionDarkened'>
            <div className='row'>
                <div className='col-12 col-md-6 order-md-1'>
                    <div id='heroCard' className='card backgroundBlueBurst'>
                        <img id='HeroCardHeaderImage' className='imageBorder' src={'/static/images/me/profile_square_alt_small.jpg'} alt='Scott Zehner' />
                        <div id='heroCardBody' className='card-body'>
                            <h4 className='card-title'>Summary</h4>
                            <p className='card-text'>Dedicated developer, project leader, and creative producer. Well versed in web application development, UX/UI design, audio-visual engineering, streaming, and conferencing. Contributed to thousands of successful projects for many satisfied clients.</p>
                            <button id='heroButton' className='btn btn-outline-primary btnCyan' onClick={handleHeroButtonClick} type='button'>
                                <FontAwesomeIcon icon={['fas', 'fa-arrow-turn-down']} className='fa-flip-horizontal' />See my work
                            </button>
                        </div>
                    </div>
                </div>
                <div className='d-none d-md-block col-md-6 order-0'>
                    {pages.state.sliderItems.length > 1 ? ( // Conditionally render <Slider />
                        <Slider
                            config={{
                                id: 'heroSlider',
                                autoplay: true,
                                autoplayInterval: 12,
                                controls: true,
                                progressBar: true,
                                slidesArray: hero.state.slidesArray
                            }}
                            parent={hero}
                            pages={pages}
                            stage={stage}
                        />
                    ) : (
                        <div className='sliderLoading'>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const LatestWork = (props) => {
    const latestWork = {};

    // Props
    const {portfolio, pages, stage} = props;

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
                                <WebDev config={config} parent={latestWork} pages={pages} stage={stage} />
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
                                <Webcasting config={config} parent={latestWork} pages={pages} stage={stage} />
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
                                <EventProduction config={config} parent={latestWork} pages={pages} stage={stage} />
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
    const {portfolio, pages, stage} = props;

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
    const {portfolio, pages, stage} = props;

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
    const {page, title, pages, stage} = props;

    // Hooks

    // Update #navBrandSection on scroll
    useEffect(() => {
        const sectionRefs = {
            hero:         stage.refs.pages.portfolio.sections.hero.current,
            latestWork:   stage.refs.pages.portfolio.sections.latestWork.current,
            previousWork: stage.refs.pages.portfolio.sections.previousWork.current,
            goToProfile:  stage.refs.pages.portfolio.sections.goToProfile.current
        };

        // Add, call, and reset event listener...
        const handleScroll = pages.methods.createScrollHandler(sectionRefs);
        document.addEventListener('scroll', handleScroll); handleScroll();
        return () => document.removeEventListener('scroll', handleScroll);
    }, [stage.state.pages.activeSection]);

    return (
        <div id='portfolio'>
            <Hero         portfolio={portfolio} pages={pages} stage={stage} />
            <LatestWork   portfolio={portfolio} pages={pages} stage={stage} />
            <PreviousWork portfolio={portfolio} pages={pages} stage={stage} />
            <GoToProfile  portfolio={portfolio} pages={pages} stage={stage} />
        </div>
    );
};

export default Portfolio;