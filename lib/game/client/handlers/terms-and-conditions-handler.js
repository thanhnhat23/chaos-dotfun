/**
 *
 * Reldens - TermsAndConditionsHandler
 *
 */

const { GameConst } = require('../../constants');
const { Logger } = require('@reldens/utils');

class TermsAndConditionsHandler
{

    constructor(gameManager)
    {
        this.gameManager = gameManager;
        this.gameDom = this.gameManager.gameDom;
        this.linkContainer = this.gameManager.gameDom.getElement(GameConst.SELECTORS.TERMS.LINK_CONTAINER);
    }

    activateTermsAndConditions()
    {
        if(!this.linkContainer){
            return false;
        }
        let termsAndConditionsUrl = this.gameManager.appServerUrl+GameConst.ROUTE_PATHS.TERMS_AND_CONDITIONS;
        let params = (new URL(this.gameDom.getDocument().location)).searchParams;
        let language = params.get('lang', '');
        if('' !== language){
            termsAndConditionsUrl+= '?lang='+language;
        }
        this.gameDom.getJSON(termsAndConditionsUrl, (err, response) => {
            if(err){
                Logger.error('TermsAndConditionsHandler - request failed.', err);
                return false;
            }
            if(!response){
                Logger.error('TermsAndConditionsHandler - empty response.');
                return false;
            }
            if(!response.body || !response.heading || !response.checkboxLabel || !response.link){
                return false;
            }
            let selectors = GameConst.SELECTORS.TERMS;
            this.gameDom.updateContent(selectors.HEADING, response.heading);
            this.gameDom.updateContent(selectors.BODY, response.body);
            this.gameDom.updateContent(selectors.ACCEPT_LABEL, response.checkboxLabel);
            this.gameDom.updateContent(selectors.LINK, response.link);
            let termsLink = this.gameDom.getElement(selectors.LINK);
            let termsContainer = this.gameDom.getElement(selectors.BOX);
            termsLink?.addEventListener('click', (e) => {
                e.preventDefault();
                termsContainer?.classList.remove(GameConst.CLASSES.HIDDEN);
            });
            this.gameDom.getElement(selectors.CLOSE)?.addEventListener('click', () => {
                termsContainer?.classList.add(GameConst.CLASSES.HIDDEN);
            });
            let register = this.gameDom.getElement(GameConst.SELECTORS.REGISTER_FORM);
            if(register){
                let errorBlock = this.gameDom.getElement(GameConst.SELECTORS.RESPONSE_ERROR, register);
                let acceptTermsCheckbox = this.gameDom.getElement(selectors.ACCEPT);
                let acceptLabel = this.gameDom.getElement(selectors.ACCEPT_LABEL);
                if(acceptTermsCheckbox){
                    acceptTermsCheckbox.addEventListener('click', () => {
                        if(acceptTermsCheckbox.checked && errorBlock){
                            errorBlock.innerHTML = '';
                        }
                    });
                }
                if(acceptTermsCheckbox && acceptLabel){
                    acceptLabel.addEventListener('click', () => {
                        if(acceptTermsCheckbox.checked && errorBlock){
                            errorBlock.innerHTML = '';
                        }
                    });
                }
            }
            this.linkContainer?.classList.remove(GameConst.CLASSES.HIDDEN);
        });
    }

}

module.exports.TermsAndConditionsHandler = TermsAndConditionsHandler;
