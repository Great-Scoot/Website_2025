import React, {useEffect, useState} from 'react';

import {Slider, SliderPreview} from '../../components/slider.js';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const WebcastDescription = (props) => {
    const webcastDescription = {};

    // Props
    const {mode, slideObject, stage} = props;

    return (
        <div className='workDescription backgroundBlueBurst'>
            {slideObject.title ? <h4 className='WDHeading'>{slideObject.title}</h4> : ''}
            {slideObject.external_url_date 
                ? <p className='WDParagraph'>
                    {new Date(`${slideObject.external_url_date}`).toLocaleString('en-US', {
                        year:   'numeric', 
                        month:  'numeric', 
                        day:    'numeric', 
                        hour:   'numeric', 
                        minute: 'numeric'
                    })}
                  </p> 
                : ''
            }
            {slideObject.external_url && new Date().getTime() < new Date(`${slideObject.expiration_date}`).getTime()
                ? <a className='WDButton btn btn-outline-primary btnCyan' href={slideObject.external_url} target='_blank'>
                    <FontAwesomeIcon icon={['fas', 'fa-link']} />View Webcast
                  </a>
                : ''}
        </div>
    );
};

const Webcasting = (props) => {
    // Vars
    const webcasting = {};

    // Props
    const {config, parent, pages, stage} = props;

    // State
    const [active,      setActive]      = useState(false);
    const [slidesArray, setSlidesArray] = useState([]);
    const [syncIndex,   setSyncIndex]   = useState(0);

    // State object (for organization and passing to children).
    webcasting.state = {
        active,
        slidesArray,
        syncIndex
    };

    // Methods (for organization and passing to children).
    webcasting.methods = {
        updateActive: () => {
            setActive(config.index === parent.state.activeIndex);
        },
        updateSlidesArray: (slidesArray) => {
            setSlidesArray(slidesArray);
        },
        updateSyncIndex: (index) => {
            setSyncIndex(index || 0);
        }
    };

    // Functions
    const getSlidesArray = (mode) => {
        const webcastingSlidesArray = webcasting.state.slidesArray;

        // Prepare slidesArray to be returned
        for (let i = 0, l = webcastingSlidesArray.length; i < l; i++) {
            webcastingSlidesArray[i].previewComponent = <WebcastDescription mode={mode} slideObject={webcastingSlidesArray[i]} stage={stage} />;
        }

        return webcastingSlidesArray;
    };

    // Hooks

    // Update whether or not this component is 'active'.
    useEffect(() => {
        webcasting.methods.updateActive();
    }, [parent.state.activeIndex]);

    // Update webcasting.state.slidesArray when page.state.sliderItems updates.
    useEffect(() => {
        if (webcasting.state.slidesArray.length === 0) {
            webcasting.methods.updateSlidesArray(pages.methods.getSliderItemsBySliderName('webcastingSlider', 'order'));
        }
    }, [pages.state.sliderItems]);

    return (
        <div id='webcasting'>
            <div className='row g-0'>
                <div className='col-12 col-md-6'>
                    {pages.state.sliderItems.length > 1 ? ( // Conditionally render <Slider />
                        <Slider 
                            config={{
                                id: 'webcastingSlider', 
                                autoplay: false, 
                                autoplayInterval: false, 
                                controls: true, 
                                progressBar: false,
                                slidesArray: getSlidesArray('slideCardBack')
                            }} 
                            parent={webcasting}
                            pages={pages} 
                            stage={stage} 
                        />
                    ) : (
                        <div className='sliderLoading'>Loading...</div>
                    )}
                </div>
                <div className='col-12 col-md-6'>
                    {pages.state.sliderItems.length > 1 ? ( // Conditionally render <Slider />
                        <SliderPreview slidesArray={getSlidesArray('slidePreviewRight')} parent={webcasting} stage={stage} />
                    ) : (
                        <div className='sliderLoading'>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Webcasting;