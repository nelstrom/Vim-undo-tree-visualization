class Chronolog
  constructor: (config) ->
    @coordinates = config.coordinates
    Chronolog.instances.push(this)

  next: ->
    myIndex = Chronolog.instances.indexOf(this)
    Chronolog.instances[myIndex+1]

  prev: ->
    myIndex = Chronolog.instances.indexOf(this)
    Chronolog.instances[myIndex-1]

  @instances: []

  @reset: ->
    @instances = []

window.Chronolog = Chronolog