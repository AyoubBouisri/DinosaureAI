function nextGen(sketch, currentGen) {
    calculateFitness(currentGen);

    let nextGen = [];
    for (let i = 0; i < sketch.dinoPop; i++) {
        let child = pick(currentGen, sketch);

        nextGen.push(child);
    }


    return nextGen;

}


function pick(currentGen, sketch) {
    let index = 0;
    let r = sketch.random(1);

    while (r > 0) {
        r = r - currentGen[index].fitness;
        index++;
    }
    index--;

    return currentGen[index].copy();


}

// calculates the fitness of every bird in the current generation
function calculateFitness(current) {
    let sum = 0;


    for (let dino of current) {
        //pow 2
        dino.score = dino.score * dino.score;
        sum += dino.score;
    }

    for (let dino of current) {
        dino.fitness = dino.score / sum;
    }

}

function mutation(x) {
    if (Math.random(1) < 0.1) {
        let offset = Math.random(-1, 1);
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}