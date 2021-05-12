export interface Class {
  psychoactive: string[];
  chemical: string[];
}

export interface Substance {
  name: string;
  class: Class;
  featured: boolean;
}

export interface Effect {
  name: string;
  url: string;
}

export interface Tolerance {
  zero: string;
  half: string;
  full: string;
}

export interface Light {
  min: number;
  max: number;
}

export interface Common {
  min: number;
  max: number;
}

export interface Strong {
  min: number;
  max: number;
}

export interface Dose {
  units: string;
  threshold: number;
  light: Light;
  common: Common;
  strong: Strong;
  heavy: number;
}

export interface Onset {
  min: number;
  max: number;
  units: string;
}

export interface Comeup {
  min: number;
  max: number;
  units: string;
}

export interface Peak {
  min: number;
  max: number;
  units: string;
}

export interface Offset {
  min: number;
  max?: number;
  units: string;
}

export interface Afterglow {
  min: number;
  max?: any;
  units: string;
}

export interface Total {
  min: number;
  max: number;
  units: string;
}

export interface Duration {
  duration?: any;
  onset: Onset;
  comeup: Comeup;
  peak: Peak;
  offset: Offset;
  afterglow: Afterglow;
  total: Total;
}

export interface Roa {
  name: string;
  dose: Dose;
  duration: Duration;
  bioavailability?: any;
}

export interface FullSubstance {
  name: string;
  url: string;
  effects: Effect[];
  class: Class;
  tolerance: Tolerance;
  roas: Roa[];
  summary: string;
  addictionPotential: string;
  toxicity: string[];
  crossTolerances: string[];
  uncertainInteractions?: any;
  unsafeInteractions?: any;
  dangerousInteractions?: any;
}
