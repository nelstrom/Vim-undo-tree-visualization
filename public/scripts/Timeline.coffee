class Timeline
  constructor: (config) ->
    @chronologs = config.chronologs
    @coordinates = config.coordinates.split(",")
    Timeline.instances.push(this)

  @instances: []
  @currentTrackIndex: 0

  @currentTrack: ->
    @instances[@currentTrackIndex]

  @currentChronolog: ->
    Chronolog.active()

  @advance: (method) ->
    if method == 'chronological'
      activeChronolog = Chronolog.active()
      activeTrack = Timeline.currentTrack()
      if activeTrack.chronologs.indexOf(activeChronolog.next()) < 0
        Timeline.switchTracks()
      Chronolog.advance()

  @reverse: (method) ->
    if method == 'chronological'
      activeChronolog = Chronolog.active()
      activeTrack = Timeline.currentTrack()
      if activeTrack.chronologs.indexOf(activeChronolog.prev()) < 0
        Timeline.switchTracks()
      Chronolog.reverse()

  @switchTracks: ->
    if @currentTrackIndex == 0
      @currentTrackIndex = 1
    else
      @currentTrackIndex = 0

  @reset: ->
    @instances = []

window.Timeline = Timeline
