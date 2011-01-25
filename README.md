To compile the coffee script, run this:

    cd public
    coffee --watch  --compile treegraph.coffee

Each time you make a change to treegraph.coffee, the treegraph.js file will be automatically recompiled.

If you want to look at treegraph.coffee and treegraph.js side by side in Vim, open both in split windows (vertical works for me). Make the treegraph.js file active, then run this:

    :setlocal ar

This means you won't be pestered with a prompt each time the treegraph.js file is recompiled.
