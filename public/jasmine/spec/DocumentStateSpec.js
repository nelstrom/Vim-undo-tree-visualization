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
      }
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
    return describe("activeTrack", function() {
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
          }
        });
        return expect(state.activeTrack).toEqual('timelineOriginal');
      });
    });
  });
}).call(this);
