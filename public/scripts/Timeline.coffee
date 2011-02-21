class Timeline
  constructor: (config) ->
    @chronologs = config.chronologs
    @coordinates = config.coordinates.split(",")
    Timeline.instances.push(this)

  next: ->
    activeChronolog = Chronolog.active()
    currentIndex = @chronologs.indexOf(activeChronolog)
    nextChronolog = @chronologs[currentIndex+1]
    nextChronolog.activate()
    Chronolog.active()


  @instances: []
  @currentTrackIndex: 0

  @currentTrack: ->
    @instances[@currentTrackIndex]

  @currentChronolog: ->
    Chronolog.active()

  @advance: (method) ->
    activeChronolog = Chronolog.active()
    activeTrack = Timeline.currentTrack()
    if method == 'track'
      activeTrack.advance()
    else if method == 'chronological'
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
