import { Character } from "./character"
import { AllItems } from "./items/all-items";

export interface Configuration {
  crossMethod: (population: Character[]) => Character[],
  mutationMethod: (population: Character[]) => Character[],
  selectionMethod: (population: Character[]) => Character[],
  stopCriterion: (population: Character[]) => boolean,
  equipment: AllItems;
}