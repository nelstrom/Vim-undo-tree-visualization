class Timeline
  constructor: (config) ->
    @coordinates = config.coordinates
    Timeline.instances.push(this)

  next: ->
    myIndex = Timeline.instances.indexOf(this)
    Timeline.instances[myIndex+1]

  prev: ->
    myIndex = Timeline.instances.indexOf(this)
    Timeline.instances[myIndex-1]

  @instances: []

  @reset: ->
    @instances = []

window.Timeline = Timeline

