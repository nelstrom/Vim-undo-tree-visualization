(function() {
  new DocumentState({
    timelineOriginal: {
      points: 's1',
      active: true
    },
    timelineRevised: {
      points: 's1'
    },
    nodes: [
      {
        position: 's1',
        state: 'on'
      }, {
        position: 's1'
      }, {
        position: 's1'
      }, {
        position: 's1'
      }, {
        position: 's1'
      }, {
        position: 's1'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2',
      active: true
    },
    timelineRevised: {
      points: 's1,s2'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 's2'
      }, {
        position: 's2'
      }, {
        position: 's2'
      }, {
        position: 's2'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,s3'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'on'
      }, {
        position: 's3'
      }, {
        position: 's3'
      }, {
        position: 's3'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,s3,s4'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'on'
      }, {
        position: 's4'
      }, {
        position: 's4'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'on'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's3'
      }, {
        position: 's3'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's2'
      }, {
        position: 's2'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'on'
      }, {
        position: 't3'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'on'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'on'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'on'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'on'
      }, {
        position: 't4',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t4',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't3',
        state: 'off'
      }, {
        position: 't4',
        state: 'on'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'on'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'on'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'on'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'on'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'on'
      }, {
        position: 's4',
        state: 'off'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,s3,s4'
    },
    timelineRevised: {
      points: 's1,s2,s5,s6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 's3',
        state: 'off'
      }, {
        position: 's4',
        state: 'on'
      }, {
        position: 's5',
        state: 'off'
      }, {
        position: 's6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'on'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'on'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'on'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4'
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6',
      active: true
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'on'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'on'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'on'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'off'
      }, {
        position: 's2',
        state: 'on'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
  new DocumentState({
    timelineOriginal: {
      points: 's1,s2,b3,b4',
      active: true
    },
    timelineRevised: {
      points: 's1,s2,t3,t5,t6'
    },
    nodes: [
      {
        position: 's1',
        state: 'on'
      }, {
        position: 's2',
        state: 'off'
      }, {
        position: 'b3',
        state: 'off'
      }, {
        position: 'b4',
        state: 'off'
      }, {
        position: 't5',
        state: 'off'
      }, {
        position: 't6',
        state: 'off'
      }
    ]
  });
}).call(this);
