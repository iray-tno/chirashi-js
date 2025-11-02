import 'normalize.css';

import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/command-line/prism-command-line.css';

import './src/global/default.css';

// FontAwesome SSR fix: Import CSS directly and disable auto-injection
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import wrapRootElement from './src/gatsbyRoot/wrapRootElement';

export {
    wrapRootElement,
};
