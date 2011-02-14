(function() {
  describe("DocumentState", function() {
    var state;
    state = new DocumentState({
      timelineOriginal: {
        points: 's1,s2,s3,s4'
      },
      timelineRevised: {
        points: 's1,s2,s5,s6',
        active: true
      },
      nodes: [
        {
          position: 's1'
        }, {
          position: 's2'
        }, {
          position: 's3'
        }, {
          position: 's4'
        }, {
          position: 's5'
        }, {
          position: 's6',
          active: true
        }
      ]
    });
    describe("timelineOriginal", function() {
      return it("returns a list", function() {
        return expect(state.timelineOriginal).toEqual(['s1', 's2', 's3', 's4']);
      });
    });
    describe("timelineRevised", function() {
      return it("returns a list", function() {
        return expect(state.timelineRevised).toEqual(['s1', 's2', 's5', 's6']);
      });
    });
    describe("activeTrack", function() {
      it("returns 'timelineRevised'", function() {
        return expect(state.activeTrack).toEqual('timelineRevised');
      });
      return it("returns 'timelineOriginal'", function() {
        state = new DocumentState({
          timelineOriginal: {
            points: 's1,s2,s3,s4',
            active: true
          },
          timelineRevised: {
            points: 's1,s2,s5,s6'
          },
          nodes: [
            {
              position: 's1'
            }, {
              position: 's2'
            }, {
              position: 's3'
            }, {
              position: 's4'
            }, {
              position: 's5'
            }, {
              position: 's6',
              active: true
            }
          ]
        });
        return expect(state.activeTrack).toEqual('timelineOriginal');
      });
    });
    return describe("nodes", function() {
      return it("has a default state of 'off'", function() {
        return expect(state.nodes[0].state).toEqual('off');
      });
    });
  });
}).call(this);
