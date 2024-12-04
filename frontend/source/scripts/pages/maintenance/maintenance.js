import React, {useEffect} from 'react';

const Maintenance = (props) => {
    const maintenance = {};

    // Props
    const {stage} = props;

    // Hooks

    // Update #navBrandSection on scroll
    useEffect(() => {
        let lastScrollPosition = window.scrollY;

        // Shorthand
        const shortRefs = {
            maintenance: stage.refs.pages.maintenance.sections.maintenance.current,
        };

        const handleScroll = (e) => {
            lastScrollPosition = window.scrollY;

            // Update activeSection...
            for (const key in shortRefs) {
                const value = shortRefs[key];

                // Compare scroll position to mid point of each section...
                if (lastScrollPosition < value.offsetTop - stage.globals.navigation.navHeight + value.offsetHeight / 2) {
                    // If activeSection should be updated...
                    if (stage.state.pages.activeSection.id !== key) {
                        // Update it.
                        stage.methods.pages.updateActiveSection(stage.globals.pages.maintenance.sections[key]);
                    }
                    break;
                }
            }
        }

        // Add, call, and reset event listener as needed...
        document.addEventListener('scroll', handleScroll); handleScroll();
        return () => document.removeEventListener('scroll', handleScroll);
    }, [stage.state.pages.activeSection]);

    return (
        <div id='maintenance' ref={stage.refs.pages.maintenance.sections.maintenance}>
            <div id='MText'>
                <h2>Maintenance</h2>
                <p>This website is being updated. Please check back later.</p>
                <span id='MTextSmall'>Photo by <a href="https://unsplash.com/@bigmck56?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Trevor McKinnon</a> on <a href="https://unsplash.com/photos/wL3-nvcELpc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
            </div>
        </div>
    );
};

export default Maintenance;