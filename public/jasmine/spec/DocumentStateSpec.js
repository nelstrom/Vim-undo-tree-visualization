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
        var state2;
        state2 = new DocumentState({
          timelineOriginal: {
            points: 's1,s2,s3,s4',
            active: true
          },
          timelineRevised: {
            points: 's1,s2,s5,s6'
          }
        });
        return expect(state2.activeTrack).toEqual('timelineOriginal');
      });
    });
    return describe("nodes", function() {
      it("gets position from config object", function() {
        expect(state.nodes[0].position).toEqual('s1');
        expect(state.nodes[1].position).toEqual('s2');
        expect(state.nodes[2].position).toEqual('s3');
        expect(state.nodes[3].position).toEqual('s4');
        expect(state.nodes[4].position).toEqual('s5');
        return expect(state.nodes[5].position).toEqual('s6');
      });
      it("has a default state of 'off'", function() {
        expect(state.nodes[0].state).toEqual('off');
        expect(state.nodes[1].state).toEqual('off');
        expect(state.nodes[2].state).toEqual('off');
        expect(state.nodes[3].state).toEqual('off');
        return expect(state.nodes[4].state).toEqual('off');
      });
      return it("has state 'on' where specified", function() {
        return expect(state.nodes[5].state).toEqual('on');
      });
    });
  });
}).call(this);
