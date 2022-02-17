import API from './api';
import CONSTANTS from './constants';
import { dialogWarning, i18n, warn } from './lib/lib';
import { SYSTEMS } from './systems';

export const game = getGame();
export const canvas = getCanvas();

/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
function getCanvas(): Canvas {
  if (!(canvas instanceof Canvas) || !canvas.ready) {
    throw new Error('Canvas Is Not Initialized');
  }
  return canvas;
}

/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
function getGame(): Game {
  if (!(game instanceof Game)) {
    throw new Error('Game Is Not Initialized');
  }
  return game;
}

export function getAPI(): API {
  return game[CONSTANTS.MODULE_NAME].API;
}

export const registerSettings = function (): void {
  game.settings.registerMenu(CONSTANTS.MODULE_NAME, 'resetAllSettings', {
    name: `${CONSTANTS.MODULE_NAME}.setting.reset.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.reset.hint`,
    icon: 'fas fa-coins',
    type: ResetSettingsDialog,
    restricted: true,
  });

  // const settings = defaultSettings();
  // for (const [name, data] of Object.entries(settings)) {
  //   game.settings.register(CONSTANTS.MODULE_NAME, name, <any>data);
  // }

  // for (const [name, data] of Object.entries(otherSettings)) {
  //     game.settings.register(CONSTANTS.MODULE_NAME, name, data);
  // }

  game.settings.register(CONSTANTS.MODULE_NAME, 'lights', {
    scope: 'world',
    config: false,
    //@ts-ignore
    default: SYSTEMS.DATA ? SYSTEMS.DATA.LIGHTS : [],
    type: Array,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'visions', {
    scope: 'world',
    config: false,
    //@ts-ignore
    default: SYSTEMS.DATA ? SYSTEMS.DATA.VISIONS : [],
    type: Array,
  });

  // ============================================================
  // OLD SETTINGS TO REMOVE PROBABLY
  // ===========================================================

  // game.settings.register(CONSTANTS.MODULE_NAME, 'position', {
  //   name: i18n(`${CONSTANTS.MODULE_NAME}.settings.position.name`),
  //   hint: i18n(`${CONSTANTS.MODULE_NAME}.settings.position.hint`),
  //   scope: 'world',
  //   config: true,
  //   type: String,
  //   default: 'left',
  //   choices: {
  //     left: i18n(`${CONSTANTS.MODULE_NAME}.settings.position.choice.left`),
  //     right: i18n(`${CONSTANTS.MODULE_NAME}.settings.position.choice.position.right`),
  //     top: i18n(`${CONSTANTS.MODULE_NAME}.settings.position.choice.position.top`),
  //     bottom: i18n(`${CONSTANTS.MODULE_NAME}.settings.position.choice.position.bottom`),
  //   },
  // });

  game.settings.register(CONSTANTS.MODULE_NAME, 'imageDisplay', {
    name: i18n(`${CONSTANTS.MODULE_NAME}.settings.imageDisplay.name`),
    hint: i18n(`${CONSTANTS.MODULE_NAME}.settings.imageDisplay.hint`),
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'imageOpacity', {
    name: i18n(`${CONSTANTS.MODULE_NAME}.settings.opacity.name`),
    hint: i18n(`${CONSTANTS.MODULE_NAME}.settings.opacity.hint`),
    scope: 'world',
    config: true,
    range: <any>{ min: 0, max: 100, step: 1 },
    type: Number,
    default: 50,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'rollItem', {
    name: i18n(`${CONSTANTS.MODULE_NAME}.settings.rollItem.name`),
    hint: i18n(`${CONSTANTS.MODULE_NAME}.settings.rollItem.hint`),
    config: true,
    scope: 'world',
    default: true,
    type: Boolean,
  });

  // DEPRECATED TO DANGEROUS

  // game.settings.register(CONSTANTS.MODULE_NAME, 'toggleDelete', {
  //   name: i18n(`${CONSTANTS.MODULE_NAME}.settings.toggleDelete.name`),
  //   hint: i18n(`${CONSTANTS.MODULE_NAME}.settings.toggleDelete.hint`),
  //   config: true,
  //   scope: 'world',
  //   default: false,
  //   type: Boolean,
  // });

  // ===================================================================

  game.settings.register(CONSTANTS.MODULE_NAME, 'debug', {
    name: `${CONSTANTS.MODULE_NAME}.setting.debug.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.debug.hint`,
    scope: 'client',
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'debugHooks', {
    name: `${CONSTANTS.MODULE_NAME}.setting.debugHooks.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.debugHooks.hint`,
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'systemFound', {
    name: `${CONSTANTS.MODULE_NAME}.setting.systemFound.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.systemFound.hint`,
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown', {
    name: `${CONSTANTS.MODULE_NAME}.setting.systemNotFoundWarningShown.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.systemNotFoundWarningShown.hint`,
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });
};

class ResetSettingsDialog extends FormApplication<FormApplicationOptions, object, any> {
  constructor(...args) {
    //@ts-ignore
    super(...args);
    //@ts-ignore
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.title`),
      content:
        '<p style="margin-bottom:1rem;">' +
        game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.content`) +
        '</p>',
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.confirm`),
          callback: async () => {
            await applyDefaultSettings();
            window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.cancel`),
        },
      },
      default: 'cancel',
    });
  }

  async _updateObject(event: Event, formData?: object): Promise<any> {
    // do nothing
  }
}

async function applyDefaultSettings() {
  const settings = defaultSettings(true);
  for (const [name, data] of Object.entries(settings)) {
    //@ts-ignore
    await game.settings.set(CONSTANTS.MODULE_NAME, name, data.default);
  }
}

function defaultSettings(apply = false) {
  return {
    // TODO
  };
}

export async function checkSystem() {
  if (!SYSTEMS.DATA) {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown')) return;

    await game.settings.set(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown', true);

    return Dialog.prompt({
      title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.nosystemfound.title`),
      content: dialogWarning(game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.nosystemfound.content`)),
      callback: () => {},
    });
  }

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'systemFound')) return;

  game.settings.set(CONSTANTS.MODULE_NAME, 'systemFound', true);

  if (game.settings.get(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown')) {
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.systemfound.title`),
      content: warn(game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.systemfound.content`), true),
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.systemfound.confirm`),
          callback: () => {
            applyDefaultSettings();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize('No'),
        },
      },
      default: 'cancel',
    }).render(true);
  }

  return applyDefaultSettings();
}
