
// Method that, given a coordinate (x,y) on the board,
// should return true if the cell is alive in the next round,
// and return false if the cell is dead in the next round
function isCellAliveNext(x, y) {

    // Check if the cell is currently alive or dead
    let currentlyAlive = isCellAliveNow(x,y);

    // Step 0:
    // If the cell is currently dead, return false
    // If the cell is currently alive, return true
    // 
    // If you do this correctly, then everything
    // alive should stay alive, and the animation
    // should be nice and boring

    // Step 1:
    // Update: if the cell is currently alive,
    // then return true only if it has 2 or 3 neighbors.
    //
    // There's a method getNumAliveNeighbors(x,y) that will return
    // the number of alive neighbors touching cell (x,y)
    // (it will give you back a number between 0 and 8)

    // let numNeighbors = getNumAliveNeighbors(x,y);

    // Step 2:
    // Update: if the cell is currently dead,
    // then return true only if it has exactly 3 neighbors.
    //
    // Congrats! After this step, you've implemented
    // the logic of Conway's Game of Life!
}