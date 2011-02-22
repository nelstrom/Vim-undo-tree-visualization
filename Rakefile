task :default => :concatenate

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
task :concatenate do
  packages.each do |package, files|
    paths = files.map{ |f| "public/scripts/#{f}" }
    `coffee -o public/javascripts/ --join --compile #{paths.join(" ")}`
    `mv public/javascripts/concatenation.js public/javascripts/#{package}-concatenated.js`
  end
end

desc "Minify js packages with Google closure"
task :minify => :concatenate do
  packages.each do |package, files|
    `java -jar closure-compiler/compiler.jar --js public/javascripts/#{package}.js --js_output_file public/javascripts/#{package}-minified.js`
  end
end

desc "Merge with raphael.js"
task :merge => :minify do
  packages.each do |package, files|
    `cat public/javascripts/raphael.min.js public/javascripts/#{package}.minified.js > public/javascripts/raphael-#{package}.min.js`
  end
end
