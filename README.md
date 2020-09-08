# GeneticAlgorithms

Website containing a genetic algorithm engine that can work with different selection, mutation, and cross methods, as well as multiple stop criteria.

The point of the engine is to select the best equipment/height setup for a RPG character.

## Demo website

A hosted version of the website can be found at https://bensas.github.io/genetic_algorithms/

## Building/running the site

**Requirements:**
- Node Package Manager (npm)

**Steps:**

1) Clone the repo: ```git clone https://github.com/Bensas/GeneticAlgorithms```

2) Enter the directory: ```cd GeneticAlgorithms```

3) Install dependencies: ```npm install```

4) Add dataset files in the ```dist/datasets``` folder (if there isn't one, you should create it) 

5) Compile typescript/run development server: ```npm run serve```

The website can be found in http://localhost:8080/dist/ :)

**To run Mocha/Chai tests:**

1) Run ```npm test```
2) Have a hot chocolate :) 
