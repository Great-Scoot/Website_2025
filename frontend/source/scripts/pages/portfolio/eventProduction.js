import {breakpointIsLargeish} from '../../components/helpers.js';

import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Slider} from '../../components/slider.js';

const EventProduction = (props) => {
    const eventProduction = {};

    // Props
    const {config, parent, pages, stage} = props;

    // Hooks
    const navigate = useNavigate();

    // Refs
    eventProduction.refs = {
        image: useRef(null)
    };

    // State
    const [active, setActive] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // State object (for organization and passing to children).
    eventProduction.state = {
        active,
        loaded
    };

    // Methods (for organization and passing to children).
    eventProduction.methods = {
        updateActive: () => {
            setActive(config.index === parent.state.activeIndex);
        },
        updateLoaded: (loaded) => {
            setLoaded(loaded || false);
        }
    };

    // Functions
    const handleClick = () => {
        navigate('/about');
        stage.methods.pages.updateSectionScrollTarget({page: 'about', section: 'contact'});
    };

    const loadImage = () => {
        if (!loaded && active && breakpointIsLargeish(stage.state.breakpoint)) {
            eventProduction.refs.image.current.style.backgroundImage = 'url(/static/images/other/mixer.jpg)';
            eventProduction.refs.image.current.classList.add('loaded');
            eventProduction.methods.updateLoaded(true);
        }
    };

    // Hooks

    // Update whether or not this component is 'active'.
    useEffect(() => {
        eventProduction.methods.updateActive();
    }, [parent.state.activeIndex]);

    // Load mixer image
    useEffect(() => {
        loadImage();
    }, [active, stage.state.breakpoint]);

    return (
        <div id='eventProduction'>
            <div id='eventProductionDescription' className='workDescription backgroundBlueBurst'>
                <div className='row g-0'>
                    <div className='col-12 col-md-6'>
                        <h4 className='WDHeading'>Event Production</h4>
                        <p className='WDParagraph'>For over 10 years, I've produced many live corporate events. I've mixed live audio and video, operated cameras, configured live streams, worked in control rooms and broadcast trucks, and occasionally I've done these tasks all at once.</p>
                        <p className='WDParagraph'>Pictured below are many of the corporations that have trusted me to ensure the technical execution of their events. These events include investor days, share holder meetings, town halls, medical conferences, and more.</p>
                        <p className='WDParagraph'>I'm also well-versed in streaming these events to a variety of platforms, such as YouTube, Facebook, Brightcove, Yammer, Kontiki, and Chorus Call.</p>
                    </div>
                    <div className='d-none d-md-block col-md-6'>
                        <div id='EPImage' ref={eventProduction.refs.image} className='imageBorder'></div>
                    </div>
                    <div className='col-12'>
                        <div id='EPSliderBackground'>
                            {pages.state.sliderItems.length > 1 ? ( // Conditionally render <Slider />
                                <Slider 
                                    config={{
                                        id: 'eventProductionSlider', 
                                        autoplay: true, 
                                        autoplayInterval: 4, 
                                        controls: false, 
                                        progressBar: false,
                                        slidesArray: pages.methods.getSliderItemsBySliderName('eventProductionSlider')
                                    }} 
                                    parent={eventProduction}
                                    pages={pages}
                                    stage={stage} 
                                />
                            ) : (
                                <div className='sliderLoading'>Loading...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventProduction;