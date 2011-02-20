class Timeline
  constructor: (config) ->
    @coordinates = config.coordinates.split(",")
    Timeline.instances.push(this)

  next: ->
    myIndex = Timeline.instances.indexOf(this)
    Timeline.instances[myIndex+1]

  prev: ->
    myIndex = Timeline.instances.indexOf(this)
    Timeline.instances[myIndex-1]

  @instances: []
  @currentTrackIndex: 0

  @currentTrack: ->
    @instances[@currentTrackIndex]

  @reset: ->
    @instances = []

window.Timeline = Timeline

