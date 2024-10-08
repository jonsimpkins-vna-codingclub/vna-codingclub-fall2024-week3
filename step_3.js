
// Step 3:
// Initially, we were playing by Conway's rules
// but now it's time for you to set them.
//
// Go ahead and change the name to get started:
let authorName = 'Conway';

function getCellValueNextIteration(
    x, // x-coordinate of cell
    y, // y-coordinate of cell
    currentIteration, // The number representing which iteration we're on
) {

    // Get the value (-1 to 1) of the current cell
    let currentCellValue = getCurrentCellValue(x,y);

    // TODO: this is a boring implementation, it just keeps the
    // board the same from iteration to iteration
    return currentCellValue;

    // Here are a bunch of helper methods you might want to use:

    // Gets the total "friendly" value near the current cell
    // (e.g. the total positive value if the current cell is positive)
    // let friendlyStrength = getFriendlyStrength(x,y);

    // Gets the total "enemy" value near the current cell
    // (e.g. the total negative value if the current cell is positive)
    // let enemyStrength = getEnemyStrength(x,y);

    // Get a random value between -1 and 1
    // let randomValue = getRandomValue();

    // Get a number that ping-pongs between -1 and 1,
    // repeating every 30 iterations
    //let sinusoidalValue = getSinusoidalValue(currentIteration, 30);
}