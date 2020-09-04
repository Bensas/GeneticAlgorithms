import { Individual } from "./individual";

export class Population {
  individuals: Individual[];

  // constructor();
  constructor(startingPopulation: Individual[]){
    this.individuals = startingPopulation;
  }
}