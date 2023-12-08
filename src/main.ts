import { envs } from './env.config';
import Logger from './utils/logger';
import { UiService } from './services/ui_service';
import CxTagEngineNode, { Tag } from 'node-red-contrib-cx-tag-engine/nodes/cx_tag_engine';
// import nodeRed from 'node-red';

process.title = 'your_app_name';
const logger = new Logger(module);

start().catch(err => logger.error(err));

/**
 * Main entry point of the app.
 */
async function start() {

    logger.info('Initialisation of the app');
    logger.info('Using environment variables: ' + Object.keys(envs).join(', '));

    logger.info('Initialisation of UI Service');
    await UiService.initAsync();

    // listen to the tag emitted by the UI Service
    CxTagEngineNode.subscribeToTagChanges('[root]', 'asdf', (tag: Tag) => {
        logger.info('Tag received from UI Service: ' + tag.value);
    });

    setInterval(() => {
        const val = 'test' + Math.floor(Math.random() * 100);
        CxTagEngineNode.setTag('[root]', 'asdf1', val);
    }, 1000);

    // the rest of the program here
}
