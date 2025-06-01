/** Required imports. Order of imports need to be preserved. */
import './lib/base.js';
import './lib/encryption.js';
import './lib/object.js';
import './lib/session.js';
import './lib/string.js';
import './lib/web.js';

import './app.js';
import './router.js';

/** Common files/components, that need to be loaded on any route request. */
import './components/custom-notification/custom-notification.js';
import './components/custom-button/custom-button.js';