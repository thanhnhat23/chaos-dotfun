/**
 *
 * Reldens - AnimationEngine
 *
 * Objects flow:
 *
 * When you create an NpcObject this can/should be set as "interactive", after the validation
 * if(this.isInteractive){
 * This will activate the onpointerdown event so when you click on the object it will send the action
 * ObjectsConst.OBJECT_INTERACTION
 * Along with its own ID and type.
 * The server will pick up this information and validate it on the NpcObject.executeMessageActions method, and return
 * a UI message to open a UI dialog box, updated with the information coming in the message.
 * See RoomEvents.initUi method.
 *
 */

const { Logger, sc } = require('@reldens/utils');
const { ObjectsConst } = require('../constants');
const { GameConst } = require('../../game/constants');
const { ActionsConst } = require('../../actions/constants');

class AnimationEngine
{

    constructor(gameManager, props, currentPreloader)
    {
        this.currentPreloader = currentPreloader;
        this.currentAnimation = false;
        this.gameManager = gameManager;
        this.enabled = props.enabled || false;
        this.key = props.key;
        this.id = props.id;
        this.asset_key = props.asset_key || props.key;
        this.assetPath = props.assetPath || '/assets/custom/sprites/';
        this.type = props.type || false;
        this.ui = props.ui || false;
        this.targetName = props.targetName;
        this.frameRate = props.frameRate || false;
        this.frameStart = props.frameStart || 0;
        this.frameEnd = props.frameEnd || 0;
        this.x = props.x || 0;
        this.y = props.y || 0;
        this.repeat = isNaN(props.repeat) ? -1 : props.repeat;
        this.hideOnComplete = props.hideOnComplete || false;
        if(!this.gameManager.createdAnimations){
            this.gameManager.createdAnimations = {};
        }
        // @NOTE: you cannot combine destroyOnComplete with repeat = -1, because an animation with infinite
        // repetitions will never trigger the complete event.
        this.destroyOnComplete = props.destroyOnComplete || false;
        this.autoStart = props.autoStart || false;
        this.layerName = props.layerName || false;
        this.positionFix = props.positionFix || false;
        this.zeroPad = props.zeroPad || false;
        this.prefix = props.prefix || false;
        this.isInteractive = props.isInteractive || false;
        this.highlightOnOver = Boolean(sc.get(
            props,
            'highlightOnOver',
            this.gameManager.config.getWithoutLogs('client/ui/animations/highlightOnOver', true)
        ));
        this.highlightColor = sc.get(
            props,
            'highlightColor',
            this.gameManager.config.getWithoutLogs('client/ui/animations/highlightColor', '0x00ff00')
        );
        this.restartTime = sc.get(props, 'restartTime', false);
        this.calculateAnimPosition();
        // @NOTE: having this here we will get the animations generated for each object instance, so normally you would
        // get duplicated animations for any respawn "multiple" object, BUT, at the same time, you could have an
        // animation for a specific instance ID, we need to keep this here and check if the animation already exists on
        // the preloader list to avoid generate it again.
        if(sc.hasOwn(props, 'animations')){
            this.createObjectAnimations(props.animations);
        }
    }

    updateObjectAndSpritePositions(x, y)
    {
        this.sceneSprite.x = x;
        this.sceneSprite.y = y;
        this.x = x;
        this.y = y;
        this.calculateAnimPosition();
    }

    calculateAnimPosition()
    {
        this.animPos = {x: this.x, y: this.y};
        if(!this.positionFix){
            return;
        }
        if(sc.hasOwn(this.positionFix, 'x')){
            this.animPos.x = this.x + this.positionFix.x;
        }
        if(sc.hasOwn(this.positionFix, 'y')){
            this.animPos.y = this.y + this.positionFix.y;
        }
    }

    updateObjectDepth()
    {
        let objectNewDepth = this.y + this.sceneSprite.height;
        this.sceneSprite.setDepth(objectNewDepth);
        return objectNewDepth;
    }

    createAnimation()
    {
        if(!this.enabled){
            Logger.error('Animation disabled: '+this.key);
            return;
        }
        let currentScene = this.gameManager.activeRoomEvents.getActiveScene();
        if(!currentScene){
            Logger.error('Active scene not found.');
            return;
        }
        let animationData = {start: this.frameStart, end: this.frameEnd};
        if(this.prefix !== false){
            animationData.prefix = this.prefix;
        }
        if(this.zeroPad !== false){
            animationData.zeroPad = this.zeroPad;
        }
        if(!this.currentPreloader.anims.textureManager.list[this.asset_key]){
            Logger.warning('Asset not found in preloader.', this.asset_key, animationData);
            this.currentPreloader.load.spritesheet(this.asset_key, this.assetPath+this.asset_key, animationData);
            this.currentPreloader.load.once('complete', async () => {
                this.createAnimation();
            });
            return;
        }
        let frameNumbers = this.currentPreloader.anims.generateFrameNumbers(this.asset_key, animationData);
        let createData = {
            key: this.key,
            frames: frameNumbers,
            frameRate: this.frameRate,
            repeat: this.repeat,
            hideOnComplete: this.hideOnComplete
        };
        this.currentAnimation = this.gameManager.createdAnimations[this.key];
        if(!this.currentAnimation){
            Logger.debug('Creating animation: '+this.key);
            this.currentAnimation = this.currentPreloader.anims.create(createData);
        }
        this.currentPreloader.objectsAnimations[this.key] = this.currentAnimation;
        this.gameManager.createdAnimations[this.key] = this.currentAnimation;
        let spriteX = this.positionFix ? this.animPos.x : this.x;
        let spriteY = this.positionFix ? this.animPos.y : this.y;
        // this is where the animation is actually been created and stored:
        this.sceneSprite = currentScene.physics.add.sprite(spriteX, spriteY, this.asset_key);
        if(this.autoStart){
            this.sceneSprite.anims.play(this.key, true);
        }
        this.enableInteraction(currentScene);
        this.enableAutoRestart();
        this.automaticDestroyOnComplete();
        // @NOTE: sprites depth will be set according to their Y position, since the same was applied on the
        // players sprites and updated as they move the depth is fixed automatically and the objects will get
        // above or below the player.
        this.sceneSprite.setDepth(this.y + this.sceneSprite.body.height);
        currentScene.objectsAnimations[this.key] = this;
        this.gameManager.events.emitSync('reldens.createAnimationAfter', {animationEngine: this});
        return this.sceneSprite;
    }

    automaticDestroyOnComplete()
    {
        if(!this.destroyOnComplete){
            return;
        }
        this.sceneSprite.on('animationcomplete', () => {
            this.currentAnimation?.destroy();
            this.sceneSprite.destroy();
        }, this);
    }

    enableAutoRestart()
    {
        if(!this.restartTime){
            return;
        }
        this.sceneSprite.on('animationcomplete', () => {
            setTimeout(() => {
                // if the animation was used to change the scene this won't be available on the user who run it.
                if(!this.sceneSprite.anims){
                    return;
                }
                this.sceneSprite.anims.restart();
                this.sceneSprite.anims.pause();
            }, this.restartTime);
        },
        this);
    }

    enableInteraction(currentScene)
    {
        if(!this.isInteractive){
            return;
        }
        this.sceneSprite.setInteractive({useHandCursor: true}).on('pointerdown', (e) => {
            // @NOTE: we avoid running the object interactions while any UI element is open, if we click on the UI the
            // elements in the background scene should not be executed.
            if(GameConst.SELECTORS.CANVAS !== e.downElement.nodeName){
                return false;
            }
            // @TODO - BETA - CHECK - TempId is a temporal fix for multiple objects case.
            let tempId = (this.key === this.asset_key) ? this.id : this.key;
            let dataSend = {
                act: ObjectsConst.OBJECT_INTERACTION,
                id: tempId,
                type: this.type
            };
            this.gameManager.activeRoomEvents.send(dataSend);
            if(!this.targetName){
                return false;
            }
            let previousTarget = Object.assign({}, currentScene.player.currentTarget);
            let thisTarget = {id: tempId, type: ObjectsConst.TYPE_OBJECT};
            currentScene.player.currentTarget = thisTarget;
            this.gameManager.gameEngine.showTarget(this.targetName, thisTarget, previousTarget);
            // Auto-attack on enemy click: if the clicked object is an enemy and a default action is configured,
            // send the action immediately using the current target.
            if(ObjectsConst.TYPE_ENEMY === this.type){
                let defaultActionKey = this.gameManager.config.get('client/ui/controls/defaultActionKey') || 'physical_attack';
                this.gameManager.activeRoomEvents.send({
                    act: ActionsConst.ACTION,
                    target: currentScene.player.currentTarget,
                    type: defaultActionKey
                });
            }
        });
        if(this.highlightOnOver){
            this.sceneSprite.on('pointerover', () => {
                this.sceneSprite.setTint(this.highlightColor);
            });
            this.sceneSprite.on('pointerout', () => {
                this.sceneSprite.clearTint();
            });
        }
    }

    runAnimation()
    {
        if(!this.sceneSprite){
            Logger.error('Current animation not found: '+this.key);
            return;
        }
        this.sceneSprite.anims.play(this.key, true);
    }

    getPosition()
    {
        return {x: this.x, y: this.y};
    }

    createObjectAnimations(animations)
    {
        if(!animations){
            return;
        }
        let animationsKeys = Object.keys(animations);
        if(0 === animationsKeys.length){
            return;
        }
        for(let i of animationsKeys){
            if(this.gameManager.createdAnimations[i]){
                this.currentPreloader.objectsAnimations[i] = this.gameManager.createdAnimations[i];
                continue;
            }
            if(sc.hasOwn(this.currentPreloader.objectsAnimations, i)){
                // @TODO - BETA - Clean up, can objectsAnimations be removed?
                continue;
            }
            let animData = animations[i];
            let frameNumbers = this.currentPreloader.anims.generateFrameNumbers(
                (animData['asset_key'] || this.asset_key), {
                    start: animData['start'] || this.frameStart,
                    end: animData['end'] || this.frameEnd
                }
            );
            let createData = {
                key: i,
                frames: frameNumbers,
                frameRate: animData['frameRate'] || this.frameRate,
                repeat: animData['repeat'] || this.repeat,
                hideOnComplete: animData['hideOnComplete'] || this.hideOnComplete,
                asset_key: animData['asset_key'] || this.asset_key
            };
            this.currentPreloader.objectsAnimations[i] = this.currentPreloader.anims.create(createData);
            this.gameManager.createdAnimations[i] = this.currentPreloader.objectsAnimations[i];
        }
    }

}

module.exports.AnimationEngine = AnimationEngine;
