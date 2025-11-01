// FontAwesome SSR fix: Disable auto-injection of CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import wrapRootElement from './src/gatsbyRoot/wrapRootElement';

export {
    wrapRootElement,
};
