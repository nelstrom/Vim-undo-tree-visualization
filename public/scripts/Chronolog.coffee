class Chronolog
  constructor: (config) ->
    @coordinates = config.coordinates
    Chronolog.instances.push(this)

  @instances: []

window.Chronolog = Chronolog
