# Fall 2024, Week 3

This week, we'll be learning about:

* Comparison operators (<, >, ==)
* How to invoke methods
* How parameters are passed in to method invocations
* How to return early from a method

## Coding Challenge: Conway's Game of Life

For the coding challenge, we're going to implement
[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules), a classic example of a
simulation that demonstrates emergent behavior.

To start, go ahead and open up `index.html` in a browser,
and `steps_0_2.js` in your editor.

You have a method `isCellAliveNext(x,y)`, that is going to
be called by the code in the `helpers/` directory. This method
should, given coordinate `(x,y)` return true if that cell
will be alive in the next iteration of the game, and false
otherwise.

### Step 0:

For starters, let's add a simple implementation, where if the
cell is alive now, it will also be alive in the next iteration.

**Acceptance Criteria**: if you click the "random" button to
populate the board, and then click "start" to begin the simulation,
the board should stay exactly like it is (no changes).

### Step 1:

Let's leverage another helper method `getNumAliveNeighbors(x,y)`
to determine how many neighbors a cell has that are currently alive.

With that info, we'll update our logic to say:

> If a cell is currently alive, it should continue
to be alive only if it
has 2 or 3 neighbors that
are also alive

**Acceptance Criteria**: if you clear the board, then click on
the board to draw a 3x3 square of "alive" cells, then when the
simulation starts square should
go away, disappearing from the
middle out.

### Step 2:

Finally, let's update the logic to include the generation of
new "alive" cells:

> If a cell is currently dead, and it has exactly 3 alive
neighbors, then it becomes alive

**Acceptance Criteria**: that same 3x3 square starting point
should now produce an endless repeating sequence of rotating
lines

... and congrats! With that, you've implemented Conway's Game
of Life.

## Beyond Conway's Game...

So the original game as a grid of "cells", where the only values possible are:

* `true`: cell is alive
* `false`: cell is dead

But let's try taking it further. Pretend that now that each cell can have any value between -1 and 1:

* `0`: cell is empty
* `1`: cell is occupied by a strong "purple" bacteria
* `-1`: cell is occupied by a strong "green" bacteria
* `0.5`: cell is occupied by a weaker "purple" bacteria

Now we're going to encourage you to get creative, and implement a
new method that applies **your** rules for this new game of life variant.

### Step 3

Open `step_3.js`, and start off by changing the `authorName` at the top to your name.

Now if you refresh the page, you'll notice that the "random" button now produces a **very** different board than before, should be a field of greens and purples and shades in-between.

Check out the comments for some suggestions on convenience methods you
could leverage:

* How to make a random value, maybe you could add it / subtract it from the current value
* How to make a value that oscillates back and forth (sinusoidally)
* How to check the total values around a cell that are positive or negative like it is

And now: go forth and create a simulation! You might use these to simulate land / water forming in smooth regions, you might simulate two
different types of bacteria growing and fighting for control, your
imagination is the limit!
