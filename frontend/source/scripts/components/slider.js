import {breakpointIsSmallish, elementIsVisibleInViewport, toCapitalCase} from './helpers.js';

import React, {useEffect, useRef, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Slide = (props) => {
    const slide = {};

    // Props
    const {index, slideObject, slider, grandParent, stage} = props;

    // Refs
    const slideRef      = useRef(null);
    const slideImageRef = useRef(null);

    // State
    const [active,  setActive]  = useState(index === slider.state.currentIndex);
    const [loaded,  setLoaded]  = useState(false);
    const [rotated, setRotated] = useState(false);

    slide.state = {
        active,
        loaded,
        rotated
    };

    // Methods
    slide.methods = {
        updateActive: () => {
            setActive(index === slider.state.currentIndex);
        },
        updateLoaded: (loaded) => {
            setLoaded(loaded || false);
        },
        updateRotated: (rotate) => {
            setRotated(typeof rotate === 'boolean' ? rotate : !rotated);
        }
    };

    // Functions
    const getPercentLeft = () => {
        let percentLeft = 0;
        
        const spacing = slider.state.displayMode === 'tight' ? 25 : 100;        
        const offsetIndex = index - slider.state.currentIndex;

        let isPrevious = false;
        let isNext = false;

        if (slider.config.slidesArray.length > 1) {
            isNext = offsetIndex === 1 || -1 * offsetIndex === slider.config.slidesArray.length - 1;
        }

        if (slider.config.slidesArray.length > 2) {
            isPrevious = offsetIndex === -1 || offsetIndex === slider.config.slidesArray.length - 1;
        }

        if (isPrevious) {
            percentLeft = -1 * spacing;
        } else if (isNext) {
            percentLeft = 1 * spacing;
        } else if (slider.state.displayMode === 'loose' && offsetIndex > 0) {
            percentLeft = offsetIndex * spacing;
        }

        return `${percentLeft}%`;
    };

    const handleClick = () => {
        if (slideObject.type === 'card' && active && breakpointIsSmallish(stage.state.breakpoint)) {
            slide.methods.updateRotated();
        }
    };

    const handleHover = (e) => {
        // If hovering over active slide, pause autoplay.
        if (active && slider.config.progressBar) {
            slider.methods.updateAutoplay(e.type);
        }
    };

    const loadImage = () => {
        /* Notes: 
            - This function applies the background-image.
        */
        const load = () => {
            slideImageRef.current.style.backgroundImage = `url(${slideObject.imageURL})`;
            slide.methods.updateLoaded(true);
        };

        // If not loaded...
        if (slideRef.current && !loaded) {
            // Figure out if it should load...
            const rect = slideRef.current.getBoundingClientRect();

            // If slide has width and height (isn't hidden)...
            if (rect.width > 0 && rect.height > 0) {
                // If is current slide or is visible in viewport...
                if (index === slider.state.currentIndex || slideRef.current.style.left !== '0%' && elementIsVisibleInViewport(slideRef.current, true)) {
                    // Load.
                    setTimeout(() => {
                        load();
                    }, stage.globals.transitions.durations.fast);
                }
            }
        }
    };

    // Hooks

    // Update active and unrotate whenever current slide is changed.
    useEffect(() => {
        slide.methods.updateActive();

        if (slideObject.type === 'card' && rotated) {
            slide.methods.updateRotated(false);
        }
    }, [slider.state.currentIndex]);

    // Lazy load images only when in view.
    useEffect(() => {
        setTimeout(() => {
            loadImage();
        }, stage.globals.transitions.durations.fast);

        // When done scrolling...
        let scrollTimeout;

        const handleScroll = (e) => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(loadImage, stage.globals.transitions.durations.slow);
        };

        // When done resizing...
        let windowResizeTimeout;

        const handleWindowResize = (e) => {
            clearTimeout(windowResizeTimeout);
            windowResizeTimeout = setTimeout(loadImage, stage.globals.transitions.durations.slow);
        };

        // Add and reset event listeners as needed...
        document.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleWindowResize);

        return () => {
            document.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [loaded, slider.state.currentIndex, slider.state.displayMode, grandParent.state.active]);

    return (
        <div ref={slideRef} 
            className={`slide imageBorder ${active ? 'active' : ''} ${rotated ? 'rotated' : ''}`} 
            style={{left: getPercentLeft()}}
            onMouseEnter={handleHover} 
            onMouseLeave={handleHover}
        >
            {(() => {
                if (slideObject.type === 'image') {
                    return (
                        <div ref={slideImageRef} className={`slideImage ${loaded ? 'loaded' : ''}`}></div>
                    );
                } else if (slideObject.type === 'card') {
                    return (
                        <div className={`slideCard ${active ? 'active' : ''} ${rotated ? 'rotated' : ''}`}>
                            <div className='slideCardFront' onClick={handleClick}>
                                <div ref={slideImageRef} className={`SCFImage ${loaded ? 'loaded' : ''}`}></div>
                                <button className='SCFCaption btn' onClick={handleClick} type='button'>
                                    {slideObject.title ?    <span className='SCFTitle'>{slideObject.title}</span>       : ''}
                                    {slideObject.subtitle ? <span className='SCFSubTitle'>{slideObject.subtitle}</span> : ''}
                                </button>
                            </div>
                            <div className='slideCardBack' onClick={handleClick}>{slideObject.previewComponent}</div>
                        </div>
                    );
                }
            })()}
        </div>
    );
};

const ProgressBar = (props) => {
    const progressBar = {};

    // Props
    const {slider, stage} = props;

    // Refs
    progressBar.refs = {
        progressBar: useRef(null)
    };

    // State
    const [progress, setProgress] = useState(0);

    // Hooks

    // Start progress bar
    useEffect(() => {
        let progressTimeout;

        if (slider.state.autoplay) {
            progressTimeout = setTimeout(() => {
                setProgress(100);
            }, stage.globals.transitions.durations.fast);
        }

        return () => {
            clearTimeout(progressTimeout);
            setProgress(0);
        };
    }, [slider.state.autoplay, slider.state.currentIndex]);

    return (
        <div ref={progressBar.refs.progressBar} 
            className='sliderProgressBar' 
            style={{
                width: `${progress}%`, 
                transition: `width ${progress === 100 ? slider.config.autoplayInterval : 0}s linear`
            }}
        ></div>
    );
};

const SliderControl = (props) => {
    const sliderControl = {};

    // Props
    const {direction, slider, stage} = props;

    // Functions
    const handleClick = (props) => {
        slider.methods.updateCurrentIndex(direction);
    };

    return (
        <button 
            ref={(() => {
                if (direction === 'previous')  {return slider.refs.controls.previous}
                else if (direction === 'next') {return slider.refs.controls.next}
            })()} 
            className={`sliderControl sliderControl${toCapitalCase(direction)} btn btn-outline-primary`} 
            onClick={handleClick} 
            type='button'
        >
            <FontAwesomeIcon 
                icon={['fas', (() => {
                    if (direction === 'previous')  {return 'fa-chevron-left'}
                    else if (direction === 'next') {return 'fa-chevron-right'}
                })()]} 
                className='noMarginRight' 
            />
        </button>
    );
};

const Slider = (props) => {
    const slider = {};
    
    /* Notes:
        - config:
            - autoplay: true or false
            - autoplayInterval: seconds
            - controls: true or false
            - progressBar: true or false
    */

    // Props
    const {config, parent, stage} = props;

    slider.config = config;

    // Refs
    slider.refs = {
        // Children
        controls: {
            previous: useRef(null),
            next:     useRef(null)
        }
    };

    // State
    const [autoplay,     setAutoplay]     = useState(config.autoplay);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayMode,  setDisplayMode]  = useState('tight');

    // State object (for organization and passing to children).
    slider.state = {
        autoplay,
        currentIndex, 
        displayMode
    };

    // Methods (for organization and passing to children).
    slider.methods = {
        updateAutoplay: (eventType) => {
            setAutoplay(eventType === 'mouseenter' ? false : config.autoplay);
        },
        updateCurrentIndex: (direction) => {
            let targetIndex = currentIndex;

            if (direction === 'previous') {
                targetIndex--;
            } else if (direction === 'next') {
                targetIndex++;
            }

            if (config.slidesArray[targetIndex]) {
                setCurrentIndex(targetIndex);
                if (parent && parent.methods && parent.methods.updateSyncIndex) {
                    parent.methods.updateSyncIndex(targetIndex);
                }
            } else if (targetIndex === -1) {
                setCurrentIndex(config.slidesArray.length - 1);
                if (parent && parent.methods && parent.methods.updateSyncIndex) {
                    parent.methods.updateSyncIndex(config.slidesArray.length - 1);
                }
            } else if (targetIndex === config.slidesArray.length) {
                setCurrentIndex(0);
                if (parent && parent.methods && parent.methods.updateSyncIndex) {
                    parent.methods.updateSyncIndex(0);
                }
            }
        },
        updateDisplayMode: () => {
            setDisplayMode(['xs', 'sm'].indexOf(stage.state.breakpoint) > -1 ? 'tight' : 'loose');
        }
    };

    // Hooks

    // Update displayMode relative to the current breakpoint
    useEffect(() => {
        slider.methods.updateDisplayMode();
    }, [stage.state.breakpoint]);

    // Autoplay
    useEffect(() => {
        let autoplayInterval;

        if (autoplay) {            
            autoplayInterval = setInterval(() => {
                slider.methods.updateCurrentIndex('next');
            }, config.autoplayInterval * 1000);
        }

        return () => clearInterval(autoplayInterval);
    }, [autoplay, currentIndex]);

    return (
        <div id={config.id} className={`slider ${displayMode}`}>
            <div className='slides'>
                {config.slidesArray.map((slideObject, index) => {
                    return <Slide key={slideObject.title} index={index} slideObject={slideObject} slider={slider} grandParent={parent} stage={stage} />
                })}
            </div>
            {(() => {
                if (config.autoplay && config.progressBar) {
                    return <ProgressBar slider={slider} stage={stage} />;
                } 
            })()}
            {(() => {
                if (config.controls) {
                    return (
                        <div className='sliderControls'>
                            <SliderControl direction='previous' slider={slider} stage={stage} />
                            <SliderControl direction='next'     slider={slider} stage={stage} />
                        </div>
                    );
                } 
            })()}
        </div>
    );
}

const SliderPreview = (props) => {
    const sliderPreview = {};

    // Props
    const {slidesArray, parent, stage} = props;

    if (slidesArray.length > 0) {
        return (
            <div className='sliderPreview'>
                {slidesArray[parent.state.syncIndex] ? slidesArray[parent.state.syncIndex].previewComponent : ''}
            </div>
        );
    } else {
        return '';
    }
};

export {
    Slider,
    SliderPreview
};