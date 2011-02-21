class Timeline
  constructor: (config) ->
    @chronologs = config.chronologs
    @coordinates = config.coordinates.split(",")
    Timeline.instances.push(this)

  activeChronologIndex: ->
    @chronologs.indexOf(Chronolog.active())

  activate: ->
    myIndex = Timeline.instances.indexOf(this)
    Timeline.currentTrackIndex = myIndex


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

  @advanceAndUpdateState: (method) ->
    DocumentState.reset()
    new DocumentState(Timeline.asDocumentState())
    @advance(method)
    new DocumentState(Timeline.asDocumentState())

  @reverseAndUpdateState: (method) ->
    DocumentState.reset()
    new DocumentState(Timeline.asDocumentState())
    @reverse(method)
    new DocumentState(Timeline.asDocumentState())

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

  @atStart: (method) ->
    activeChronolog = Chronolog.active()
    Chronolog.instances[0] == activeChronolog
    
  @atFinish: (method) ->
    activeChronolog = Chronolog.active()
    if method == 'track'
      activeTrack = Timeline.currentTrack()
      activeTrack.chronologs[activeTrack.chronologs.length-1] == activeChronolog
    else if method == 'chronological'
      Chronolog.instances[Chronolog.instances.length-1] == activeChronolog
    

  @switchTracks: ->
    if @currentTrackIndex == 0
      @currentTrackIndex = 1
    else
      @currentTrackIndex = 0

  @asDocumentState: ->
    configObject =
      timelineOriginal:
        points: @instances[0].coordinates.join(",")
      timelineRevised:
        points: @instances[1].coordinates.join(",")
      nodes: []
  
    for node in Chronolog.instances
      configObject.nodes.push
        position: node.coordinates
        state: if node.isActive() then 'on' else 'off'

    if Timeline.currentTrackIndex == 0
      configObject.timelineOriginal['active'] = true
    else
      configObject.timelineRevised['active'] = true

    configObject

  @reset: ->
    @instances = []

window.Timeline = Timeline
