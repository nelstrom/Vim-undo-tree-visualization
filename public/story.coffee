new DocumentState
  timelineOriginal:
    points: 's1'
    active: true
  timelineRevised:
    points: 's1'
  nodes: [
    { position: 's1', active: true }
    { position: 's1' }
    { position: 's1' }
    { position: 's1' }
    { position: 's1' }
    { position: 's1' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2'
    active: true
  timelineRevised:
    points: 's1,s2'
  nodes: [
    { position: 's1' }
    { position: 's2', active: true }
    { position: 's2' }
    { position: 's2' }
    { position: 's2' }
    { position: 's2' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3'
    active: true
  timelineRevised:
    points: 's1,s2,s3'
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3', active: true }
    { position: 's3' }
    { position: 's3' }
    { position: 's3' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
    active: true
  timelineRevised:
    points: 's1,s2,s3,s4'
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3' }
    { position: 's4', active: true }
    { position: 's4' }
    { position: 's4' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
    active: true
  timelineRevised:
    points: 's1,s2'
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3', active: true }
    { position: 's4' }
    { position: 's3' }
    { position: 's3' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
    active: true
  timelineRevised:
    points: 's1,s2'
  nodes: [
    { position: 's1' }
    { position: 's2', active: true }
    { position: 's3' }
    { position: 's4' }
    { position: 's2' }
    { position: 's2' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't3', active: true }
    { position: 't3' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t4'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't3' }
    { position: 't4', active: true }
  ]

# Move back and forth along mainline
new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t4'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't3', active: true }
    { position: 't4' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t4'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2', active: true }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't3' }
    { position: 't4' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t4'
    active: true
  nodes: [
    { position: 's1', active: true }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't3' }
    { position: 't4' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t4'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2', active: true }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't3' }
    { position: 't4' }
  ]


new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t4'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't3', active: true }
    { position: 't4' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t4'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't3' }
    { position: 't4', active: true }
  ]

# Stretch out to a chronological timeline
new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
  timelineRevised:
    points: 's1,s2,s5,s6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3' }
    { position: 's4' }
    { position: 's5' }
    { position: 's6', active: true }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
  timelineRevised:
    points: 's1,s2,s5,s6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3' }
    { position: 's4' }
    { position: 's5', active: true }
    { position: 's6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
  timelineRevised:
    points: 's1,s2,s5,s6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3' }
    { position: 's4', active: true }
    { position: 's5' }
    { position: 's6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
  timelineRevised:
    points: 's1,s2,s5,s6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3', active: true }
    { position: 's4' }
    { position: 's5' }
    { position: 's6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
  timelineRevised:
    points: 's1,s2,s5,s6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2', active: true }
    { position: 's3' }
    { position: 's4' }
    { position: 's5' }
    { position: 's6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
  timelineRevised:
    points: 's1,s2,s5,s6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3', active: true }
    { position: 's4' }
    { position: 's5' }
    { position: 's6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,s3,s4'
  timelineRevised:
    points: 's1,s2,s5,s6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 's3' }
    { position: 's4', active: true }
    { position: 's5' }
    { position: 's6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
    active: true
  timelineRevised:
    points: 's1,s2,t3,t5,t6'
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4', active: true }
    { position: 't5' }
    { position: 't6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t5,t6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't5', active: true }
    { position: 't6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t5,t6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't5' }
    { position: 't6', active: true }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
  timelineRevised:
    points: 's1,s2,t3,t5,t6'
    active: true
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't5', active: true }
    { position: 't6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
    active: true
  timelineRevised:
    points: 's1,s2,t3,t5,t6'
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4', active: true }
    { position: 't5' }
    { position: 't6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
    active: true
  timelineRevised:
    points: 's1,s2,t3,t5,t6'
  nodes: [
    { position: 's1' }
    { position: 's2' }
    { position: 'b3', active: true }
    { position: 'b4' }
    { position: 't5' }
    { position: 't6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
    active: true
  timelineRevised:
    points: 's1,s2,t3,t5,t6'
  nodes: [
    { position: 's1' }
    { position: 's2', active: true }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't5' }
    { position: 't6' }
  ]

new DocumentState
  timelineOriginal:
    points: 's1,s2,b3,b4'
    active: true
  timelineRevised:
    points: 's1,s2,t3,t5,t6'
  nodes: [
    { position: 's1', active: true }
    { position: 's2' }
    { position: 'b3' }
    { position: 'b4' }
    { position: 't5' }
    { position: 't6' }
  ]
