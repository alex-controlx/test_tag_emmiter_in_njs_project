import EmbeddedNodeRed from '../classes/ui/embedded_nodered';

const SETTINGS_FILE_NAME = 'nodered.settings.js';

export class UiService {
    private static isInitialised = false;

    static async initAsync() {
        if (this.isInitialised) return; // execute this method only once

        const nodeRedApp = new EmbeddedNodeRed(SETTINGS_FILE_NAME);
        await nodeRedApp.start();

        this.isInitialised = true;
    }
}
