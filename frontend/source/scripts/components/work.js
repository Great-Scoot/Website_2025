import React from 'react';

import {breakpointIsLargeish} from './helpers.js';

const Work = (props) => {
    const work = {};

    // Props
    const {config, children, parent, stage} = props;

    // Functions
    const getActiveClass = () => {
        let classes = '';

        if (typeof parent.state.activeIndex === 'number') {
            classes += 'shrink';

            if (parent.state.activeIndex === config.index) {
                classes += ' active';
            } else if (parent.state.hoverIndex !== config.index) {
                classes += ' desaturate';
            }
        }

        return classes;
    };

    const getHoverClasses = () => {
        if (typeof parent.state.hoverIndex === 'number' && parent.state.hoverIndex !== config.index && parent.state.activeIndex !== config.index) {
            return 'desaturate';
        } else {
            return '';
        }
    };

    const handleClick = () => {
        parent.methods.updateActiveIndex(config.index);
        stage.methods.pages.updateSectionScrollTarget({page: config.page, section: config.section});
    };

    const handleHover = (e) => {        
        if (e.type === 'mouseenter') {
            parent.methods.updateHoverIndex(config.index);
        } else if (e.type === 'mouseleave') {
            parent.methods.updateHoverIndex(null);
        }
    };

    const getColumnClasses = () => {
        let classes = 'col-12';

        if (typeof parent.state.activeIndex === 'number') {
            if (config.index === parent.state.activeIndex && breakpointIsLargeish(stage.state.breakpoint)) {
                classes += ' order-first';
            } else {
                classes += ' col-md-6';
            }
        } else {
            classes += ' col-md-6';
        }

        return classes;
    };

    return (
        <div className={getColumnClasses()}>
            <button 
                id={config.id} 
                className={`workButton ${config.classes} ${getHoverClasses()} ${getActiveClass()}`} 
                onMouseEnter={handleHover} 
                onMouseLeave={handleHover}
                onClick={handleClick}
                type='button'
            >
                <div className='workText'>
                    <h4 className='workTitle'>{config.title}</h4>
                    {(() => {
                        if (config.subtitle) {
                            return <h6 className='workSubTitle'>{config.subtitle}</h6>;
                        }
                    })()}
                </div>
            </button>
            <div className={`workContent ${config.index === parent.state.activeIndex ? 'active' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Work;