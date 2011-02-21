task :default => :compile

packages = {
  "player" => [
    "DocumentState.coffee",
    "Chronolog.coffee",
    "Timeline.coffee",
    "graphbuilder.coffee",
    "player.coffee"
  ],
  "story" => [
    "DocumentState.coffee",
    "story.coffee",
    "treegraph.coffee"
  ]
}

desc "Compile the coffescript files"
task :compile do
  packages.each do |package, files|
    paths = files.map{ |f| "public/scripts/#{f}" }
    `coffee -o public/javascripts/ --join --compile #{paths.join(" ")}`
    `mv public/javascripts/concatenation.js public/javascripts/#{package}.js`
  end
end

