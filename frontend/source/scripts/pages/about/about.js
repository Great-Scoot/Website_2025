import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Profile = (props) => {
    const profile = {};

    // Props
    const {about, stage} = props;

    return (
        <div id='profile' ref={stage.refs.pages.about.sections.profile} className='section sectionDarkened'>
            <div className='row'>
                <div className='col-12'>
                    <div id='profileCard' className='card backgroundBlueBurst'>
                        <img id='PCHeaderImage' className='imageBorder' src={'/static/images/me/profile_square_alt_large.jpg'} alt='Scott Zehner' />
                        <div id='PCBodyOne' className='card-body'>
                            <h4 id='PCBOTitle'    className='card-title'>Scott Zehner</h4>
                            <h6 id='PCBOSubTitle' className='card-text'>Developer / Designer / Producer</h6>
                        </div>
                        <div id='PCBodyTwo' className='card-body'>
                            <h4 id='PCBTTitle' className='card-title d-none d-md-inline-block'>About Me</h4>
                            <p className='card-text'>By day, I develop software for company which provides audio-visual conferencing products and services. I also produce approximately 235+ webcasts annually for a variety of corporations and organizations. By night, I can often be found in the kitchen cooking something tasty or playing piano.</p>
                            <h4 className='card-title'>Interests</h4>
                            <p className='card-text'>My interests include coaching youth soccer and supporting community development through my involvement with Mosaic Community Church (Jeannette, PA). I also enjoy making my own hot sauce from scratch as well as sourdough bread.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Resume = (props) => {
    const resume = {};

    // Props
    const {about, stage} = props;

    return (
        <div id='resume' ref={stage.refs.pages.about.sections.resume} className='section'>
            <h4 id='resumeHeading' className='sectionHeading'>Resume</h4>
            <div id='resumeContent'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <a id='resumeButton' className='btn' href='https://drive.google.com/file/d/1-oD_CbE1AB_giC_EKVDh1SXuGlV560jK/view?usp=sharing' target='_blank'>
                            <div id='resumeButtonText'>
                                <h4><FontAwesomeIcon icon={['fas', 'fa-link']} className='fa-flip-horizontal' />View Resume</h4>
                            </div>
                        </a>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div id='resumeCard' className='card backgroundBlueBurst'>
                            <div id='resumeCardBody' className='card-body'>
                                <h4 className='card-title'>Experience</h4>
                                <p className='card-text'>I've been in the digital communications and media production business for thirteen years. My passion for software development, design, and media production continue to push me forward. I am an experienced, creative, and hard working professional who can tackle any project that comes my way.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Contact = (props) => {
    const contact = {};

    // Props
    const {about, stage} = props;

    return (
        <div id='contact' ref={stage.refs.pages.about.sections.contact} className='section sectionDarkened'>
            <h4 id='contactHeading' className='sectionHeading'>Contact</h4>
            <iframe id='contactForm' src='https://docs.google.com/forms/d/e/1FAIpQLSd1CcuLmggMMEA6YNIyKh9qiN-_gYW3AeXrU2OLRuR3StwbGQ/viewform?embedded=true'>Loading...</iframe>
        </div>
    );
};

const SeeMyWork = (props) => {
    const seeMyWork = {};

    // Props
    const {about, stage} = props;

    // Hooks
    const navigate = useNavigate();

    // Functions
    const navigateHero = () => {
        navigate('/portfolio');
        stage.methods.pages.updateSectionScrollTarget({page: 'portfolio', section: 'top'});
    }

    const scrollUp = () => {
        stage.methods.pages.updateSectionScrollTarget({page: 'about', section: 'top'});
    };

    return (
        <div id='seeMyWork' ref={stage.refs.pages.about.sections.seeMyWork} className='section sectionDarkened'>
            <button className='btn btn-outline-primary btnCyan' onClick={navigateHero} type='button'>
                <FontAwesomeIcon icon={['fas', 'fa-diagram-project']} />See my Work
            </button>
            <button className='btn btn-outline-primary btnBlue' onClick={scrollUp} type='button'>
                <FontAwesomeIcon icon={['fas', 'fa-arrow-turn-up']} className='fa-flip-horizontal' />Back to Top
            </button>
        </div>
    );
};

const About = (props) => {
    const about = {};

    // Props
    const {page, title, pages, stage} = props;

    // Hooks

    // Update #navBrandSection on scroll
    useEffect(() => {
        const sectionRefs = {
            profile:   stage.refs.pages.about.sections.profile.current,
            resume:    stage.refs.pages.about.sections.resume.current,
            contact:   stage.refs.pages.about.sections.contact.current,
            seeMyWork: stage.refs.pages.about.sections.seeMyWork.current
        };

        // Add, call, and reset event listener...
        const handleScroll = pages.methods.createScrollHandler(sectionRefs);
        document.addEventListener('scroll', handleScroll); handleScroll();
        return () => document.removeEventListener('scroll', handleScroll);
    }, [stage.state.pages.activeSection]);

    return (
        <div id='about'>
            <Profile   about={about} stage={stage} />
            <Resume    about={about} stage={stage} />
            <Contact   about={about} stage={stage} />
            <SeeMyWork about={about} stage={stage} />
        </div>
    );
};

export default About;