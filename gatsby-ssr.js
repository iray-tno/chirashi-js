// FontAwesome SSR fix: Disable auto-injection of CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import wrapRootElement from './apps/legacy-gatsby/src/gatsbyRoot/wrapRootElement';

export {
    wrapRootElement,
};
