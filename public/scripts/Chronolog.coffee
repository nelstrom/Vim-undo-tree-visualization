class Chronolog
  constructor: (config) ->
    @coordinates = config.coordinates
    Chronolog.instances.push(this)

  myIndex: ->
    Chronolog.instances.indexOf(this)

  next: ->
    Chronolog.instances[@myIndex() + 1]

  prev: ->
    Chronolog.instances[@myIndex() - 1]

  activate: ->
    Chronolog.activeChronologIndex = @myIndex()

  isActive: ->
    Chronolog.activeChronologIndex == @myIndex()

  @instances: []
  @activeChronologIndex: 0

  @active: ->
    @instances[@activeChronologIndex]

  @reverse: ->
    unless @activeChronologIndex == 0
      @activeChronologIndex--
  @advance: ->
    unless @activeChronologIndex == @instances.length-1
      @activeChronologIndex++

  @reset: ->
    @instances = []

window.Chronolog = Chronolog
