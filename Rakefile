task :default => :compile

player = [
  "DocumentState.coffee",
  "Chronolog.coffee",
  "Timeline.coffee",
  "graphbuilder.coffee",
  "player.coffee"
]
story = []

desc "Compile the coffescript files"
task :compile do
  paths = player.map{ |f| "public/scripts/#{f}" }
  `coffee -o public/javascripts/ --join --compile #{paths.join(" ")}`
end

