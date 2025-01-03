import {breakpointIsLargeish} from '../../components/helpers.js';

import React, {useEffect, useRef, useState} from 'react';

import {Slider} from '../../components/slider.js';

const EventProduction = (props) => {
    const eventProduction = {};

    // Props
    const {config, parent, pages, stage} = props;

    // Hooks

    // Refs
    eventProduction.refs = {
        image: useRef(null)
    };

    // State
    const [active,      setActive]      = useState(false);
    const [loaded,      setLoaded]      = useState(false);
    const [slidesArray, setSlidesArray] = useState([]);
    const [syncIndex,   setSyncIndex]   = useState(0);

    // State object (for organization and passing to children).
    eventProduction.state = {
        active,
        loaded,
        slidesArray,
        syncIndex
    };

    // Methods (for organization and passing to children).
    eventProduction.methods = {
        updateActive: () => {
            setActive(config.index === parent.state.activeIndex);
        },
        updateLoaded: (loaded) => {
            setLoaded(loaded || false);
        },
        updateSlidesArray: (slidesArray) => {
            setSlidesArray(slidesArray);
        },
        updateSyncIndex: (index) => {
            setSyncIndex(index || 0);
        }
    };

    // Functions
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

    // Update eventProduction.state.slidesArray when page.state.sliderItems updates.
    useEffect(() => {
        if (eventProduction.state.slidesArray.length === 0) {
            eventProduction.methods.updateSlidesArray(pages.methods.getSliderItemsBySliderName('eventProductionSlider', 'random'));
        }
    }, [pages.state.sliderItems]);

    return (
        <div id='eventProduction'>
            <div id='eventProductionDescription' className='workDescription backgroundBlueBurst'>
                <div className='row g-0'>
                    <div className='col-12 col-md-6'>
                        <h4 className='WDHeading'>Event Production</h4>
                        <p className='WDParagraph'>For over 10 years, I've produced many live corporate events. I've mixed live audio and video, operated cameras, configured live streams, worked in control rooms and broadcast trucks, and occasionally I've done these tasks all at once.</p>
                        <p className='WDParagraph'>Pictured below are many of the corporations that have trusted me to ensure the technical execution of their events. These events include investor days, share holder meetings, town halls, medical conferences, and more.</p>
                        <p className='WDParagraph'>I'm also well-versed in streaming technology and have published live and on-demand content to many platforms, such as Chorus Call, Teams, Vimeo, Brightcove, Facebook, YouTube, Kontiki, and Yammer.</p>
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
                                        progressBar: true,
                                        slidesArray: eventProduction.state.slidesArray
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