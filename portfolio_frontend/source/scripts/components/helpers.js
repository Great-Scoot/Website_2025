// Helper Functions
const breakpointIsSmallish = (breakpoint) => {
    return ['xs', 'sm'].indexOf(breakpoint) > -1;
};

const breakpointIsLargeish = (breakpoint) => {
    return ['md', 'lg', 'xl', 'xxl'].indexOf(breakpoint) > -1;
};

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const {top, right, bottom, left} = el.getBoundingClientRect();
    const {innerWidth, innerHeight} = window;

    return partiallyVisible
        ? ((top > 0 && top < innerHeight) ||
            (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

const toCapitalCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export {
    breakpointIsSmallish,
    breakpointIsLargeish,
    elementIsVisibleInViewport,
    toCapitalCase
};