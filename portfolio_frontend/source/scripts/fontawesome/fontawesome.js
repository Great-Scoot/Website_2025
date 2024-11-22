// Font-Awesome
import {library} from '@fortawesome/fontawesome-svg-core';

// Import FAS icons
import {
    faArrowTurnDown as fasArrowTurnDown,
    faArrowTurnUp as fasArrowTurnUp,
    faAt as fasAt,
    faBars as fasBars,
    faCheck as fasCheck,
    faChevronLeft as fasChevronLeft,
    faChevronRight as fasChevronRight,
    faCircleInfo as fasCircleInfo,
    faCircleNotch as fasCircleNotch,
    faCode as fasCode,
    faDiagramProject as fasDiagramProject,
    faEnvelope as fasEnvelope,
    faEye  as fasEye,
    faHome as fasHome,
    faListCheck as fasListCheck,
    faLink as fasLink,
    faLock as fasLock,
    faRotateLeft as fasRotateLeft,
    faRotateRight as fasRotateRight,
    faTriangleExclamation as fasTriangleExclamation,
    faUser as fasUser,
    faUsers as fasUsers,
    faUserMinus as fasUserMinus,
    faUserPlus as fasUserPlus,
    faUserTie as fasUserTie,
    faVideo as fasVideo,
    faXmark as fasXmark
} from '@fortawesome/free-solid-svg-icons';

/* Import FAR icons
import {
    faSomething as farSomething,
} from '@fortawesome/free-regular-svg-icons';
*/

/* Import FAB icons */
import {
    faGithub as fabGithub,
    faLinkedin as fabLinkedin
} from '@fortawesome/free-brands-svg-icons';


// Add only the icons I need to the bundle...
library.add(
    // Regular icons
    fasArrowTurnDown,
    fasArrowTurnUp,
    fasAt,
    fasBars,
    fasCheck,
    fasChevronLeft,
    fasChevronRight,
    fasCircleInfo,
    fasCircleNotch,
    fasCode,
    fasDiagramProject,
    fasEnvelope,
    fasEye,
    fasHome,
    fasListCheck,
    fasLink,
    fasLock,
    fasRotateLeft,
    fasRotateRight,
    fasTriangleExclamation,
    fasUser,
    fasUsers,
    fasUserMinus,
    fasUserPlus,
    fasUserTie,
    fasVideo,
    fasXmark,
    // Brand icons
    fabGithub,
    fabLinkedin
);