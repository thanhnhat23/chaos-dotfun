/**
 *
 * Reldens - ConfigManager
 *
 */

const { ConfigProcessor } = require('../processor');

class ConfigManager extends ConfigProcessor
{

    constructor()
    {
        super();
        this.client = {
            general: {
                users: {
                    allowRegistration: true,
                    allowGuest: true,
                    allowGuestUserName: true
                }
            },
            customClasses: {
                message: {
                    listeners: {}
                }
            },
            message: {
                listeners: {}
            }
        };
    }

}

module.exports.ConfigManager = ConfigManager;
