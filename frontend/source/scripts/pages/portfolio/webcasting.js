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
            {slideObject.externalURLDate ? <p className='WDParagraph'>{slideObject.externalURLDate}</p> : ''}
            {slideObject.externalURL 
                ? <a className='WDButton btn btn-outline-primary btnCyan' href={slideObject.externalURL} target='_blank'>
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
    const [active,    setActive]    = useState(false);
    const [syncIndex, setSyncIndex] = useState(0);

    // State object (for organization and passing to children).
    webcasting.state = {
        active,
        syncIndex
    };

    // Methods (for organization and passing to children).
    webcasting.methods = {
        updateActive: () => {
            setActive(config.index === parent.state.activeIndex);
        },
        updateSyncIndex: (index) => {
            setSyncIndex(index || 0);
        }
    };

    // Functions
    const getSlidesArray = (mode) => {
        const slidesArray = [
            {
                title: 'HPE Securities Analyst Meeting 2023', 
                subtitle: false, 
                expirationDate: new Date('2024-10-19'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=370tVnvP&overrideActivation=33od0tE95446A',
                externalURLDate: 'October 19, 2023 at 2:30 PM EDT',
                imageURL: '/static/images/sliders/webcasting/HPE2.jpg', 
                type: 'card'
            },
            {
                title: 'Ford Media Call', 
                subtitle: false, 
                expirationDate: new Date('2024-09-29'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=1gh0EXkJ&overrideActivation=15o9h0O35165I',
                externalURLDate: 'September 29, 2023 at 1:00 PM EDT',
                imageURL: '/static/images/sliders/webcasting/Ford2.jpg', 
                type: 'card'
            },
            {
                title: 'Fiscal Year 2023 Investor Media Call', 
                subtitle: false, 
                expirationDate: new Date('2024-11-14'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=nsZMbwU0&overrideActivation=11uiO31138IsZ',
                externalURLDate: 'November 14, 2023 at 9:30 AM EST',
                imageURL: '/static/images/sliders/webcasting/TVA.jpg', 
                type: 'card'
            },
            {
                title: 'Vista Investor Day', 
                subtitle: false, 
                expirationDate: new Date('2024-09-26'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=1qXVM99E&overrideActivation=31h8XV683103J',
                externalURLDate: 'September 26, 2023 at 9:00 AM EDT',
                imageURL: '/static/images/sliders/webcasting/Vista.jpg', 
                type: 'card'
            },
            {
                title: 'Fourth Quarter 2023 Lowes Companies, Inc. Earnings Conference Call', 
                subtitle: false, 
                expirationDate: new Date('2025-02-27'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=lueZG7IL&overrideActivation=2okleZ670011J',
                externalURLDate: 'February 27, 2024 at 9:00 AM EST',
                imageURL: '/static/images/sliders/webcasting/Lowes.jpg', 
                type: 'card'
            },
            {
                title: 'Q3 FY 2024 Earnings Call', 
                subtitle: false, 
                expirationDate: new Date('2025-02-06'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=WGfuS1sz&overrideActivation=1sb6fuE49056A',
                externalURLDate: 'February 6, 2024 at 4:30 PM EST',
                imageURL: '/static/images/sliders/webcasting/ELF.jpg', 
                type: 'card'
            },
            {
                title: 'Luckin Coffee Fourth Quarter 2023 Earnings Conference Call', 
                subtitle: false, 
                expirationDate: new Date('2025-02-23'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=oFEekSTM&overrideActivation=2snjEe674333J',
                externalURLDate: 'February 23, 2024 at 8:00 AM EST',
                imageURL: '/static/images/sliders/webcasting/Luckin.jpg', 
                type: 'card'
            },
            {
                title: 'Smart Strategies for a Stronger Heart', 
                subtitle: false, 
                expirationDate: new Date('2025-03-28'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=QGFynZHn&overrideActivation=38ewFyE97798A',
                externalURLDate: 'March 28, 2024 at 12:00 PM EDT',
                imageURL: '/static/images/sliders/webcasting/UPMC.jpg', 
                type: 'card'
            },
            {
                title: 'Third Quarter Fiscal 2024 Financial Results Call', 
                subtitle: false, 
                expirationDate: new Date('2024-12-05'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=Zeac9rTL&overrideActivation=qedacO22165I',
                externalURLDate: 'December 5, 2023 at 5:00 PM EST',
                imageURL: '/static/images/sliders/webcasting/Yext.jpg', 
                type: 'card'
            },
            {
                title: 'Fourth Quarter 2023 Earnings', 
                subtitle: false, 
                expirationDate: new Date('2024-05-14'),
                externalURL: 'https://event.choruscall.com/mediaframe/webcast.html?webcastid=uSWjcYTx&overrideActivation=2uvpWj676709J',
                externalURLDate: 'February 14, 2024 at 9:00 AM EST',
                imageURL: '/static/images/sliders/webcasting/Danaos.jpg', 
                type: 'card'
            },
        ];

        // Prepare slidesArray to be returned
        for (let i = 0, l = slidesArray.length; i < l; i++) {
            slidesArray[i].previewComponent = <WebcastDescription mode={mode} slideObject={slidesArray[i]} stage={stage} />;
        }

        return slidesArray;
    };

    // Hooks

    // Update whether or not this component is 'active'.
    useEffect(() => {
        webcasting.methods.updateActive();
    }, [parent.state.activeIndex]);

    return (
        <div id='webcasting'>
            <div className='row g-0'>
                <div className='col-12 col-md-6'>
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
                </div>
                <div className='col-12 col-md-6'>
                    <SliderPreview slidesArray={getSlidesArray('slidePreviewRight')} parent={webcasting} stage={stage} />
                </div>
            </div>
        </div>
    );
};

export default Webcasting;