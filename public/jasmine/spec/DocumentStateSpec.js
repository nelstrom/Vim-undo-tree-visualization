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
            position: 's6'
          }
        ]
      });
    });
    describe("Class", function() {
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
      describe("previous", function() {
        it("returns the first state by default", function() {
          return expect(DocumentState.previous()).toEqual(first);
        });
        return it("returns previous node when there is one", function() {
          DocumentState.position = 1;
          return expect(DocumentState.previous()).toEqual(first);
        });
      });
      describe("reverse", function() {
        it("does nothing when already at start", function() {
          DocumentState.position = 0;
          DocumentState.lastPosition = 0;
          DocumentState.reverse();
          expect(DocumentState.position).toEqual(0);
          return expect(DocumentState.lastPosition).toEqual(0);
        });
        return it("decrements position", function() {
          DocumentState.position = 1;
          DocumentState.reverse();
          expect(DocumentState.position).toEqual(0);
          return expect(DocumentState.lastPosition).toEqual(1);
        });
      });
      return describe("advance", function() {
        it("increments position", function() {
          DocumentState.position = 0;
          DocumentState.advance();
          expect(DocumentState.position).toEqual(1);
          return expect(DocumentState.lastPosition).toEqual(0);
        });
        return it("does nothing when on last node", function() {
          DocumentState.position = 1;
          DocumentState.lastPosition = 0;
          DocumentState.advance();
          expect(DocumentState.position).toEqual(1);
          return expect(DocumentState.lastPosition).toEqual(0);
        });
      });
    });
    return describe("object", function() {
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
      describe("nodes", function() {
        it("gets position from config object", function() {
          expect(state.nodes[0].position).toEqual('s1');
          expect(state.nodes[1].position).toEqual('s2');
          expect(state.nodes[2].position).toEqual('s3');
          expect(state.nodes[3].position).toEqual('s4');
          expect(state.nodes[4].position).toEqual('s5');
          return expect(state.nodes[5].position).toEqual('s6');
        });
        it("has state 'off' where specified", function() {
          expect(state.nodes[0].state).toEqual('off');
          expect(state.nodes[1].state).toEqual('off');
          expect(state.nodes[2].state).toEqual('off');
          return expect(state.nodes[3].state).toEqual('off');
        });
        it("has state 'on' where specified", function() {
          return expect(state.nodes[4].state).toEqual('on');
        });
        return it("has state 'undefined' by default", function() {
          return expect(state.nodes[5].state).toEqual(void 0);
        });
      });
      describe("activeNode", function() {
        return it("returns the object that was declared 'on'", function() {
          return expect(state.activeNode).toEqual({
            position: 's5',
            state: 'on'
          });
        });
      });
      describe("activeNodeIndex", function() {
        return it("returns the position of the activeNode in nodes list", function() {
          return expect(state.activeNodeIndex()).toEqual(4);
        });
      });
      return describe("hasPredecessor()/hasSuccessor()", function() {
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
        });
        describe("hasPredecessor()", function() {
          it("returns true when there is a predecessor", function() {
            return expect(first.hasPredecessor()).toEqual(false);
          });
          return it("returns false when there is no predecessor", function() {
            return expect(second.hasPredecessor()).toEqual(true);
          });
        });
        return describe("hasSuccessor()", function() {
          it("returns true when there is a successor", function() {
            return expect(second.hasSuccessor()).toEqual(false);
          });
          return it("returns false when there is no successor", function() {
            return expect(first.hasSuccessor()).toEqual(true);
          });
        });
      });
    });
  });
}).call(this);
