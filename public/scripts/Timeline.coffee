class Timeline
  constructor: (config) ->
    @chronologs = config.chronologs
    @coordinates = config.coordinates.split(",")
    Timeline.instances.push(this)

  activeChronologIndex: ->
    @chronologs.indexOf(Chronolog.active())

  next: ->
    @chronologs[@activeChronologIndex()+1]

  prev: ->
    @chronologs[@activeChronologIndex()-1]

  @instances: []
  @currentTrackIndex: 0

  @currentTrack: ->
    @instances[@currentTrackIndex]

  @currentChronolog: ->
    Chronolog.active()

  @advance: (method) ->
    activeTrack = Timeline.currentTrack()
    if method == 'track'
      nextChronolog = activeTrack.next()
      if nextChronolog?
        nextChronolog.activate()
    else if method == 'chronological'
      activeChronolog = Chronolog.active()
      if activeTrack.chronologs.indexOf(activeChronolog.next()) < 0
        Timeline.switchTracks()
      Chronolog.advance()

  @reverse: (method) ->
    activeTrack = Timeline.currentTrack()
    if method == 'track'
      prevChronolog = activeTrack.prev()
      if prevChronolog?
        prevChronolog.activate()
    else if method == 'chronological'
      activeChronolog = Chronolog.active()
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
