import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const FooterSocialButton = (props) => {
    const footerSocialButton = {};

    // Props
    const {id, icon, href} = props;

    return (
        <a id={id} className='footerSocialButton hoverScaleBg' href={href} target="_blank">
            <FontAwesomeIcon icon={icon} className='noMarginRight' />
        </a>
    );
};

const FooterNavButton = (props) => {
    const footerNavButton = {};

    // Props
    const {id, route, pseudoSections, section, content, stage, footer} = props;

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    // Functions
    const getClasses = () => {
        let classes = 'footerNavButton hoverScaleBg btn ';

        // If: Route button...
        if (pseudoSections && pseudoSections.indexOf(stage.state.pages.activeSection.id) > -1) {
            classes += 'active';
        } else if (section && section === stage.state.pages.activeSection.id) { // Else: Section button...
            classes += 'active';
        }

        return classes;
    };

    const handleClick = () => {
        // Reset #navBrandSection indicator
        stage.methods.pages.updateActiveSection({id: null, label: null, colorClass: null});

        // If: Route is different than current page, navigate.
        if (route && route !== location.pathname) {
            navigate(route);
        }

        // If: Specific section defined, scroll.
        if (section) {
            stage.methods.pages.updateSectionScrollTarget({page: route.replace(/\//g, ''), section: section});
        } else { // Else: Scroll to top.
            stage.methods.pages.updateSectionScrollTarget({page: location.pathname.replace(/\//g, ''), section: 'top'});
        }
    };

    return (
        <button 
            id={id}
            className={getClasses()}
            onClick={handleClick}
            aria-current={route === location.pathname ? 'page' : 'false'}
            type='button'
        >
            <span className='FNBContent'>{content}</span>
        </button>
    );
}


const Footer = (props) => {
    const footer = {};

    // Props
    const {stage} = props;

    // Hooks
    const navigate = useNavigate();

    // Functions
    const navigateHome = () => { // Similar function in navigation.js
        navigate('/portfolio');
        stage.methods.pages.updateSectionScrollTarget({page: 'portfolio', section: 'top'});
    }

    return (
        <footer id='footer'>
            <div id='footerConstrainment'>
                <div className='row'>
                    <div id='footerColumnBrand' className='footerCol col-12 col-md-3'>
                        <img id='footerSignature' className='signature' src={'/images/me/signature.png'} onClick={navigateHome} alt='Scott Zehner' />
                    </div>
                    <div id='footerColumnPortfolio' className='footerCol col-6 col-md-3'>
                        <ul className='footerNavMenu'>
                            {/* Portfolio */}
                            <li>
                                <FooterNavButton id='FNBPortfolio' route='/portfolio' pseudoSections={['hero', 'goToProfile']} content='Portfolio' stage={stage} footer={footer} />
                            </li>
                            <li>
                                <FooterNavButton id='FNBLatestWork' route='/portfolio' section='latestWork' content='Latest Work' stage={stage} footer={footer} />
                            </li>
                            <li>
                                <FooterNavButton id='FNBPreviousWork' route='/portfolio' section='previousWork' content='Previous Work' stage={stage} footer={footer} />
                            </li>
                        </ul>
                    </div>
                    <div id='footerColumnAbout' className='footerCol col-6 col-md-3'>
                        <ul className='footerNavMenu'>
                            {/* About */}
                            <li>
                                <FooterNavButton id='FNBAbout' route='/about' pseudoSections={['profile', 'seeMyWork']} content='Profile' stage={stage} footer={footer} />
                            </li>
                            <li>
                                <FooterNavButton id='FNBResume' route='/about' section='resume' content='Resume' stage={stage} footer={footer} />
                            </li>
                            <li>
                                <FooterNavButton id='FNBContact' route='/about' section='contact' content='Contact' stage={stage} footer={footer} />
                            </li>
                        </ul>
                    </div>
                    <div id='footerColumnSocial' className='footerCol col-12 col-md-3'>
                        <h4 id='FCSHeading' className='d-none d-md-block'>Follow Me:</h4>
                        <div id='FCSBackground'>
                            <FooterSocialButton id='FSBLinkedIn' icon={['fab', 'fa-linkedin']} href='https://www.linkedin.com/in/szehner7/' />
                            <FooterSocialButton id='FSBGitHub'   icon={['fab', 'fa-github']}   href='https://github.com/Great-Scoot' />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;