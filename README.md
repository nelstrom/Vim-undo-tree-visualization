To compile the coffee script, run this:

    cd public
    coffee --watch  --compile treegraph.coffee

Each time you make a change to treegraph.coffee, the treegraph.js file will be automatically recompiled.

If you want to look at treegraph.coffee and treegraph.js side by side in Vim, open both in split windows (vertical works for me). Make the treegraph.js file active, then run this:

    :setlocal ar

This means you won't be pestered with a prompt each time the treegraph.js file is recompiled.

When doing TDD with coffeescript for implementation and test file, watch and compile more than one file at a time like this (execute this from public/ directory):

    coffee --watch  --compile scripts/DocumentState.coffee scripts/treegraph.coffee scripts/story.coffee scripts/player.coffee scripts/Timeline.coffee scripts/Chronolog.coffee jasmine/spec/DocumentStateSpec.coffee  jasmine/spec/ChronologSpec.coffee  jasmine/spec/TimelineSpec.coffee 


Open the test file:

    open file:///Users/drew/code/vim-tree-viz/public/jasmine/DocumentStateSpecRunner.html

Useful links:

* [CoffeeScript][]
* [Raphael][]

[CoffeeScript]: http://jashkenas.github.com/coffee-script/
[Raphael]: http://raphaeljs.com/reference.html
