import React, {useEffect} from 'react';

import Portfolio from './portfolio/portfolio.js';
import About     from './about/about.js';
// import Create    from './user/create.js';
// import Login     from './user/login.js';
// import Reset     from './user/reset.js';
// import Delete    from './user/delete.js';
import NotFound  from './notfound/notfound.js';

const Pages = (props) => {
    const pages = {};

    // Props
    const {page, title, stage} = props;

    // Functions
    const getComponent = () => {
        switch(page) {
            case 'Portfolio': return <Portfolio {...props} />; break;
            case 'About':     return <About     {...props} />; break;
            // case 'Create':    return <Create    {...props} />; break;
            // case 'Login':     return <Login     {...props} />; break;
            // case 'Reset':     return <Reset     {...props} />; break;
            // case 'Delete':    return <Delete    {...props} />; break;
            default:          return <NotFound  {...props} />;
        };
    };

    useEffect(() => {
        document.title = title;
    });

    return (
        <div id='page'>
            {getComponent()}
        </div>
    );
};

export default Pages;