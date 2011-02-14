(function() {
  describe("DocumentState", function() {
    var state;
    state = null;
    beforeEach(function() {
      DocumentState.reset();
      return state = new DocumentState({
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
    });
    return describe("Class", function() {
      var first, second;
      first = second = null;
      beforeEach(function() {
        DocumentState.reset();
        first = new DocumentState({
          timelineOriginal: {
            points: 's1,s2',
            active: true
          },
          timelineRevised: {
            points: 's1,s2'
          },
          nodes: [
            {
              position: 's1'
            }, {
              position: 's2',
              active: true
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
        return second = new DocumentState({
          timelineOriginal: {
            points: 's1,s2,s3',
            active: true
          },
          timelineRevised: {
            points: 's1,s2,s3'
          },
          nodes: [
            {
              position: 's1'
            }, {
              position: 's2'
            }, {
              position: 's3',
              active: true
            }, {
              position: 's3'
            }, {
              position: 's3'
            }, {
              position: 's3'
            }
          ]
        });
      });
      describe("active", function() {
        it("returns the active state", function() {
          return expect(DocumentState.active()).toEqual(first);
        });
        return it("returns the active state", function() {
          DocumentState.position = 1;
          return expect(DocumentState.active()).toEqual(second);
        });
      });
      return describe("previous", function() {
        it("returns 'undefined' when there is no previous state", function() {
          return expect(DocumentState.previous()).toEqual(void 0);
        });
        return it("returns previous node when there is one", function() {
          DocumentState.position = 1;
          return expect(DocumentState.previous()).toEqual(first);
        });
      });
    });
  });
}).call(this);
