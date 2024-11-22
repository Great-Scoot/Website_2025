import React, {useEffect, useState} from 'react';

import {Slider, SliderPreview} from '../../components/slider.js';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TheMediaFrame = (props) => {
    const theMediaFrame = {};

    // Props
    const {mode, stage} = props;

    return (
        <div className='theMediaFrame workDescription backgroundBlueBurst'>
            <h4 className='WDHeading'>The Media Frame</h4>
            <p className='WDParagraph'>"The Media Frame" is a digital content sharing web application. It includes many features such as live and on-demand streaming, slide sharing, multi-language support, chat, surveys, and more.</p>
            <p className='WDParagraph'>I developed the front-end of this application working alongside a small team of back-end developers. The application follows mobile-friendly design principals, meets the latest accessibility standards, supports large audiences (live), and includes high availability.</p>
            <p className='WDParagraph'>In 2022, the application was used to host approximately 3000 webcasts (850k+ hits annually) for clientele in a variety of industries.</p>
            <a className='WDButton btn btn-outline-primary btnCyan' href='https://services.choruscall.com/links/themediaframe/' target='_blank'>
                <FontAwesomeIcon icon={['fas', 'fa-link']} />View Demo
            </a>
        </div>
    );
};

const TheMediaBuilder = (props) => {
    const theMediaBuilder = {};

    // Props
    const {mode, stage} = props;

    return (
        <div className='theMediaBuilder workDescription backgroundBlueBurst'>
            <h4 className='WDHeading'>The Media Builder</h4>
            <p className='WDParagraph'>This application is used to create webcasts for approximately 2500+ unique clients and is operated by a global team of web and multi-media professionals (100+ individuals).</p>
            <p className='WDParagraph'>I developed the front-end of this application working alongside a small team of back-end developers. It provides Chorus Call's operators with the tools necessary for creating, configuring, and customizing webcasts as needed.</p>
            <p className='WDParagraph'>In developing this application, and "The Media Frame", I estimate that I've written over 20,000 lines of code in many languages, such as HTML, CSS, JavScript (including React), PHP, JSP, and more.</p>
        </div>
    );
};

const Mosaic = (props) => {
    const mosaic = {};

    // Props
    const {mode, stage} = props;

    return (
        <div className='mosaic workDescription backgroundBlueBurst'>
            <h4 className='WDHeading'>Mosaic Community Church</h4>
            <p className='WDParagraph'>Mosaic Community Church is a church and non-profit community development center located in Jeannette, PA. The organization offers tutoring, a weekly "Kids and Youth Club", and strives to open a farm-to-table cafe.</p>
            <p className='WDParagraph'>I developed this website alongside another individual. My efforts included creating much of the visual content (pictures and videos), as well as much of the written content.</p>
            <p className='WDParagraph'>The website was built using SquareSpace.</p>
            <a className='WDButton btn btn-outline-primary btnCyan' href='https://www.mosaicjeannette.com/' target='_blank'>
                <FontAwesomeIcon icon={['fas', 'fa-link']} />View Website
            </a>
        </div>
    );
}; 

const WebDev = (props) => {
    // Vars
    const webDev = {};

    // Props
    const {config, parent, stage} = props;

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
        const slidesArray = [
            {
                title: 'The Media Frame', 
                subtitle: 'Webcasting by Chorus Call', 
                imageURL: '/images/sliders/webDev/The-Media-Frame.jpg', 
                type: 'card'
            },
            {
                title: 'The Media Builder', 
                subtitle: 'Webcasting by Chorus Call', 
                imageURL: '/images/sliders/webDev/The-Media-Builder.jpg', 
                type: 'card'
            },
            {
                title: 'Mosaic Community Church', 
                subtitle: 'Jeannette, PA', 
                imageURL: '/images/sliders/webDev/Mosaic.jpg', 
                type: 'card'
            },
        ];

        const componentsArray = [
            <TheMediaFrame   mode={mode} stage={stage} />,
            <TheMediaBuilder mode={mode} stage={stage} />,
            <Mosaic          mode={mode} stage={stage} />
        ];

        // Prepare slidesArray to be returned
        for (let i = 0, l = slidesArray.length; i < l; i++) {
            const slideObject = slidesArray[i];

            if (slideObject) {
                // Push the associated component (by index) into slidesArray.previewComponent
                slideObject.previewComponent = componentsArray[i];
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
                        stage={stage} 
                    />
                </div>
                <div className='col-12 col-md-6'>
                    <SliderPreview slidesArray={getSlidesArray('slidePreviewRight')} parent={webDev} stage={stage} />
                </div>
            </div>
        </div>
    );
};

export default WebDev;