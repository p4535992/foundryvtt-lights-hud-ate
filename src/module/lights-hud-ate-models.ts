export interface SenseData {
  id: string; // This is the unique id used for sync all the senses and conditions (please no strange character, no whitespace and all in lowercase...)
  name: string; // This is the unique name used for sync all the senses and conditions (here you cna put any dirty character you want)
  path: string; // This is the path to the property you want to associate with this sense e.g. data.skills.prc.passive
  img: string; // [OPTIONAL] Image to associate to this sense
  visionLevelMinIndex: number; // [OPTIONAL] check a min index for filter a range of sense can see these conditions, or viceversa conditions can be seen only from this sense
  visionLevelMaxIndex: number; // [OPTIONAL] check a max index for filter a range of sense can see these conditions, or viceversa conditions can be seen only from this sense
  conditionElevation: boolean; // [OPTIONAL] force to check the elevation between the source token and the target token, useful when using module like 'Levels'
  conditionTargets: string[]; // [OPTIONAL] force to apply the check only for these sources (you can set this but is used only from sense)
  conditionSources: string[]; // [OPTIONAL] force to apply the check only for these sources (you can set this but is used only from condition)
  effectCustomId: string; // [OPTIONAL] if you use the module 'DFreds Convenient Effects', you can associate a custom active effect by using the customId string of the DFred effect
}

export class LightHUDElement {
  id: string;
  name: string;
  img: string;
  lockRotation: boolean | null;
  dimLight: number | null;
  brightLight: number | null;
  lightColor: string | null;
  lightAlpha: number | null;
  lightAngle: number | null;
  lightAnimationType: string | null;
  lightAnimationSpeed: string | null;
  lightAnimationIntensity: string | null;
}

export class OptionSelectData {
  img: string;
  id: string;
  name: string;
}

export class VisionHUDElement {
  id: string;
  name: string;
  img: string;
  dimSight: number | null;
  brightSight: number | null;
  sightAngle: number | null;
}

export enum VisionHUDPreset {
  // additional generic
  NO_CHANGE = 'nochange',
  NONE = 'none',
  SELF = 'normal', // this is not a error is a retrocompatibility feature
  NORMAL = 'normal',
  // additional dnd5e and pf2e
  DARKVISION = 'darkvision',
  SEE_INVISIBLE = 'seeinvisible',
  BLIND_SIGHT = 'blindsight',
  TREMOR_SENSE = 'tremorsense',
  TRUE_SIGHT = 'truesight',
  DEVILS_SIGHT = 'devilssight',
  PASSIVE_STEALTH = '_ste',
  PASSIVE_PERCEPTION = '_prc',
  // additional PF2E
  GREATER_DARKVISION = 'greaterdarkvision',
  LOW_LIGHT_VISION = 'lowlightvision',
  BLINDED = 'blinded',
  // additional LIGHT HUD
  DARKVISION_30 = 'darkvision30',
  DARKVISION_60 = 'darkvision60',
  DARKVISION_90 = 'darkvision90',
  DARKVISION_120 = 'darkvision120',
  DARKVISION_150 = 'darkvision150',
  DARKVISION_180 = 'darkvision180',
  EYES_OF_NIGHT = 'eyesofnight',
}

export enum LightHUDPreset {
  NO_CHANGE = 'nochange',
  NONE = 'none',
  CANDLE = 'candle',
  LAMP = 'lamp',
  LANTERN_BULLSEYE = 'lantern-bullseye',
  LANTERN_HOODED_DIM = 'lantern-hooded-dim',
  LANTERN_HOODED_BRIGHT = 'lantern-hooded-bright',
  LIGHT = 'light',
  TORCH = 'torch',
  MOON_TOUCHED = 'moon-touched',
}

export class LightDataHud {
  icon: string;
  name: string;
  applied: boolean;
  disabled: boolean;
  suppressed: boolean;
  isTemporary: boolean;
  passive: boolean;
  img: boolean;
  vid: boolean;
  type: boolean;
  itemid: string;
  itemname: string;
  effectid: string;
  effectname: string;
  tokenid: string;
  actorid: string;
  // ADDED FOR DFRED PANEL
  remainingSeconds: number;
  turns: number;
  isExpired: boolean;
  label: string;
  _id: string;
  flags: any;
}

export class LightDataDialog {
  actorId: string;
  tokenId: string;
  itemId: string;
  effectId: string;
  actorName: string;
  tokenName: string;
  itemName: string;
  effectName: string;
  isApplied: boolean;
}

export enum LightHUDNoteFlags {
  // SUPPORT NO FORM
  INITIAL_DATA = 'initial-data',
  HUD_ENABLED = 'hud-enabled',

  // SUPPORT
  ENABLE = 'enable',
  APPLY_AS_ATL_ATE = 'apply-as-atl-ate',

  // BASIC SETTINGS
  LOCK_ROTATION = 'lock-rotation',
  VISION_TYPE = 'vision-type',
  LIGHT_SOURCE = 'light-source',

  // ADVANCED SETTINGS

  NAME = 'name',
  DURATION = 'duration',
  HEIGHT = 'height',
  WIDTH = 'width',
  SCALE = 'scale',
  SIGHT_DIM = 'dim-sight',
  SIGHT_BRIGHT = 'bright-sight',
  SIGHT_ANGLE = 'sight-angle',
  LIGHT_DIM = 'dim',
  LIGHT_BRIGHT = 'bright',
  LIGHT_ANGLE = 'angle',
  LIGHT_COLOR = 'color',
  LIGHT_ALPHA = 'alpha',
  ANIMATION_TYPE = 'animation-type',
  ANIMATION_SPEED = 'animation-speed',
  ANIMATION_REVERSE = 'animation-reverse',
  ANIMATION_INTENSITY = 'animation-intensity',
  // VERY ADVANCED SETTINGS
  LIGHT_COLORATION = 'light-coloration',
  LIGHT_LUMINOSITY = 'light-luminosity',
  LIGHT_GRADUAL = 'light-gradual',
  LIGHT_SATURATION = 'light-saturation',
  LIGHT_CONTRAST = 'light-contrast',
  LIGHT_SHADOWS = 'light-shadows',
}
