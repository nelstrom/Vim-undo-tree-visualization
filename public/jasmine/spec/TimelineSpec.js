(function() {
  describe("Timeline", function() {
    var five, four, one, six, three, trackA, trackB, two;
    one = two = three = four = five = six = null;
    trackA = trackB = null;
    beforeEach(function() {
      Chronolog.reset();
      one = new Chronolog({
        coordinates: 's1'
      });
      two = new Chronolog({
        coordinates: 's2'
      });
      three = new Chronolog({
        coordinates: 'b3'
      });
      four = new Chronolog({
        coordinates: 'b4'
      });
      five = new Chronolog({
        coordinates: 't5'
      });
      six = new Chronolog({
        coordinates: 't6'
      });
      Timeline.reset();
      trackA = new Timeline({
        chronologs: [one, two, three, four],
        coordinates: 's1,s2,b3,b4'
      });
      return trackB = new Timeline({
        chronologs: [one, two, five, six],
        coordinates: 's1,s2,t3,t5,t6'
      });
    });
    describe("Class", function() {
      describe("instances", function() {
        return it("maintains a record of all instances", function() {
          return expect(Timeline.instances).toEqual([trackA, trackB]);
        });
      });
      describe("currentTrack", function() {
        return it("returns the currently active timeline", function() {
          return expect(Timeline.currentTrack()).toEqual(trackA);
        });
      });
      describe("currentChronolog", function() {
        return it("returns the currently active chronolog", function() {
          return expect(Timeline.currentChronolog()).toEqual(one);
        });
      });
      describe("advance()", function() {
        describe("chronologically", function() {
          it("keeps to current track if it can (1a -> 2a)", function() {
            trackA.activate();
            one.activate();
            Timeline.advance('chronological');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(two);
          });
          it("keeps to current track if it can (1b -> 2b)", function() {
            trackB.activate();
            one.activate();
            Timeline.advance('chronological');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(two);
          });
          it("switches track if it must (2b -> 3a)", function() {
            trackB.activate();
            two.activate();
            Timeline.advance('chronological');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(three);
          });
          return it("switches track if it must (4a -> 5b)", function() {
            trackA.activate();
            four.activate();
            Timeline.advance('chronological');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(five);
          });
        });
        return describe("on track", function() {
          it("keeps to current track (1a -> 2a)", function() {
            trackA.activate();
            one.activate();
            Timeline.advance('track');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(two);
          });
          it("keeps to current track (1b -> 2b)", function() {
            trackB.activate();
            one.activate();
            Timeline.advance('track');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(two);
          });
          it("keeps to current track (2a -> 3a)", function() {
            trackA.activate();
            two.activate();
            Timeline.advance('track');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(three);
          });
          it("keeps to current track (2b -> 5b)", function() {
            trackB.activate();
            two.activate();
            Timeline.advance('track');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(five);
          });
          it("does nothing when at end of line (4a -> 4a)", function() {
            trackA.activate();
            four.activate();
            Timeline.advance('track');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(four);
          });
          return it("does nothing when at end of line (6b -> 6b)", function() {
            trackB.activate();
            six.activate();
            Timeline.advance('track');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(six);
          });
        });
      });
      describe("reverse()", function() {
        describe("chronologically", function() {
          it("keeps to current track if it can (2a -> 1a)", function() {
            trackA.activate();
            two.activate();
            Timeline.reverse('chronological');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(one);
          });
          it("keeps to current track if it can (2b -> 1b)", function() {
            trackB.activate();
            two.activate();
            Timeline.reverse('chronological');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(one);
          });
          return it("switches track if it must (5b -> 4a)", function() {
            trackB.activate();
            five.activate();
            Timeline.reverse('chronological');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(four);
          });
        });
        return describe("on track", function() {
          it("does nothing when at start of line (1a -> 1a)", function() {
            trackA.activate();
            one.activate();
            Timeline.reverse('track');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(one);
          });
          it("does nothing when at start of line (1b -> 1b)", function() {
            trackB.activate();
            one.activate();
            Timeline.reverse('track');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(one);
          });
          it("keeps to current track (3a -> 2a)", function() {
            trackA.activate();
            three.activate();
            Timeline.reverse('track');
            expect(Timeline.currentTrack()).toEqual(trackA);
            return expect(Chronolog.active()).toEqual(two);
          });
          return it("keeps to current track (5b -> 2b)", function() {
            trackB.activate();
            five.activate();
            Timeline.reverse('track');
            expect(Timeline.currentTrack()).toEqual(trackB);
            return expect(Chronolog.active()).toEqual(two);
          });
        });
      });
      return describe("asDocumentState()", function() {
        it("returns an object that can be used to construct a DocumentState object", function() {
          var expectedObject;
          trackA.activate();
          one.activate();
          expectedObject = {
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
          };
          return expect(Timeline.asDocumentState()).toEqual(expectedObject);
        });
        return it("returns an object that can be used to construct a DocumentState object", function() {
          var expectedObject;
          trackB.activate();
          one.activate();
          expectedObject = {
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
          };
          return expect(Timeline.asDocumentState()).toEqual(expectedObject);
        });
      });
    });
    return describe("object", function() {
      describe("coordinates", function() {
        return it("returns its coordinates as an array", function() {
          expect(trackA.coordinates).toEqual(['s1', 's2', 'b3', 'b4']);
          return expect(trackB.coordinates).toEqual(['s1', 's2', 't3', 't5', 't6']);
        });
      });
      describe("chronologs", function() {
        return it("returns a list of chronologs", function() {
          return expect(trackA.chronologs).toEqual([one, two, three, four]);
        });
      });
      describe("next()", function() {
        it("returns the next chronolog (1a -> 2a)", function() {
          one.activate();
          return expect(trackA.next()).toEqual(two);
        });
        it("returns the next chronolog (2a -> 3a)", function() {
          two.activate();
          return expect(trackA.next()).toEqual(three);
        });
        it("returns the next chronolog (3a -> 4a)", function() {
          three.activate();
          return expect(trackA.next()).toEqual(four);
        });
        it("returns the next chronolog (1b -> 2b)", function() {
          one.activate();
          return expect(trackB.next()).toEqual(two);
        });
        it("returns the next chronolog (2b -> 5b)", function() {
          two.activate();
          return expect(trackB.next()).toEqual(five);
        });
        return it("returns the next chronolog (5b -> 6b)", function() {
          five.activate();
          return expect(trackB.next()).toEqual(six);
        });
      });
      return describe("prev()", function() {
        it("returns the prev chronolog (3a -> 4a)", function() {
          four.activate();
          return expect(trackA.prev()).toEqual(three);
        });
        it("returns the prev chronolog (2a -> 3a)", function() {
          three.activate();
          return expect(trackA.prev()).toEqual(two);
        });
        it("returns the prev chronolog (1a -> 2a)", function() {
          two.activate();
          return expect(trackA.prev()).toEqual(one);
        });
        it("returns the prev chronolog (1b -> 2b)", function() {
          two.activate();
          return expect(trackB.prev()).toEqual(one);
        });
        it("returns the prev chronolog (2b -> 5b)", function() {
          five.activate();
          return expect(trackB.prev()).toEqual(two);
        });
        return it("returns the prev chronolog (5b -> 6b)", function() {
          six.activate();
          return expect(trackB.prev()).toEqual(five);
        });
      });
    });
  });
}).call(this);
