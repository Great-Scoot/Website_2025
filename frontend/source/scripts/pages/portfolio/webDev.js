import React, {useEffect, useState} from 'react';

import {Slider, SliderPreview} from '../../components/slider.js';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const WebDevPreview = (props) => {
    const webDevPreview = {};

    // Props
    const {sliderItem, mode, pages, stage} = props;

    return (
        <div className='webDevPreview workDescription backgroundBlueBurst'>
            <h4 className='WDPHeading'>{sliderItem.title}</h4>
            <p className='WDPParagraph'>{sliderItem.description ? sliderItem.description : 'Uh oh! Description not found.'}</p>
            {(() => {
                if (sliderItem.external_url && sliderItem.external_url_text) {
                    return (
                        <a className='WDPButton btn btn-outline-primary btnCyan' href={`${sliderItem.external_url}`} target='_blank'>
                            <FontAwesomeIcon icon={['fas', 'fa-link']} />{sliderItem.external_url_text}
                        </a>
                    );
                }
            })()}
        </div>
    );
}; 

const WebDev = (props) => {
    // Vars
    const webDev = {};

    // Props
    const {config, parent, pages, stage} = props;

    // State
    const [active,    setActive]    = useState(false);
    const [syncIndex, setSyncIndex] = useState(0);

    // State object (for organization and passing to children).
    webDev.state = {
        active,
        syncIndex
    };

    // Methods (for organization and passing to children).
    webDev.methods = {
        updateActive: () => {
            setActive(config.index === parent.state.activeIndex);
        },
        updateSyncIndex: (index) => {
            setSyncIndex(index || 0);
        }
    };

    // Functions
    const getSlidesArray = (mode) => {
        const slidesArray = pages.methods.getSliderItemsBySliderName('webDevSlider');

        // Prepare slidesArray to be returned
        for (let i = 0, l = slidesArray.length; i < l; i++) {
            const sliderItem = slidesArray[i];

            if (sliderItem) {
                // Add the "previewComponent"...
                sliderItem.previewComponent = <WebDevPreview sliderItem={sliderItem} mode={mode} pages={pages} stage={stage} />;
            }
        }

        return slidesArray;
    };

    // Hooks

    // Update whether or not this component is 'active'.
    useEffect(() => {
        webDev.methods.updateActive();
    }, [parent.state.activeIndex]);

    return (
        <div id='webDev'>
            <div className='row g-0'>
                <div className='col-12 col-md-6'>
                    {pages.state.sliderItems.length > 1 ? ( // Conditionally render <Slider />
                        <Slider 
                            config={{
                                id: 'webDevSlider', 
                                autoplay: false, 
                                autoplayInterval: false, 
                                controls: true, 
                                progressBar: false,
                                slidesArray: getSlidesArray('slideCardBack')
                            }} 
                            parent={webDev} 
                            pages={pages}
                            stage={stage} 
                        />
                    ) : (
                        <div className='sliderLoading'>Loading...</div>
                    )}
                </div>
                <div className='col-12 col-md-6'>
                    {pages.state.sliderItems.length > 1 ? ( // Conditionally render <SliderPreview />
                        <SliderPreview slidesArray={getSlidesArray('slidePreviewRight')} parent={webDev} stage={stage} />
                    ) : (
                        <div className='sliderLoading'>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebDev;