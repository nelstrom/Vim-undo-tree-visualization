describe("Graphnode", function() {

  beforeEach(function() {
  });

  it('has access to jQuery', function() {
    expect($).toEqual(jQuery);
  });

  describe('parseTimestamps', function() {
    it('generate slideTimes from simple list', function() {
      Castoff.parseTimestamps(timestamples.simple);
      expect(Castoff.slideTimes).toEqual([0,4,7.5]);
    });
    it('generate slideTimes from twoStepsForwardOneBack list', function() {
      Castoff.parseTimestamps(timestamples.twoStepsForwardOneBack);
      expect(Castoff.slideTimes).toEqual([0,4,7.5,15]);
    });
    it('generates timedEvents from simple list', function() {
      var target = [
        {time: 0, slide: 1, event: 'showFirstSlide' },
        {time: 4, slide: 2, event: 'nextStep' },
        {time: 7.5, slide: 3, event: 'nextStep' }
      ];
      Castoff.parseTimestamps(timestamples.simple);
      expect(Castoff.timedEvents).toEqual(target);
    });
    it('generates timedEvents from twoStepsForwardOneBack list', function() {
      var target = [
        { time: 0,     slide: 1,  event: 'showFirstSlide' },
        { time: 4,     slide: 2,  event: 'nextStep' },
        { time: 7.5,   slide: 3,  event: 'nextStep' },
        { time: 10,    slide: 2,  event: 'prevStep' },
        { time: 12.5,  slide: 3,  event: 'nextStep' },
        { time: 15,    slide: 4,  event: 'nextStep' }
      ]
      Castoff.parseTimestamps(timestamples.twoStepsForwardOneBack);
      expect(Castoff.timedEvents).toEqual(target);
    });
    it('generates timedEvents from strayKeyPresses list', function() {
      var target = [
        { time: 0,  slide: 1,  event: 'showFirstSlide' },
        { time:1,   slide:2,   event:'nextStep' },
        { time:2,   slide:3,   event:'nextStep' },
        { time:3,   slide:4,   event:'nextStep' },
        { time:7,   slide:3,   event:'prevStep' },
        { time:8,   slide:2,   event:'prevStep' },
        { time:9,   slide:1,   event:'prevStep' }
      ]
      Castoff.parseTimestamps(timestamples.strayKeyPresses);
      expect(Castoff.timedEvents).toEqual(target);
    });
  });

  describe('recordMode', function() {
    it('attaches a listener to keypress events', function() {
      Castoff.config.recordMode = true;
      Castoff.setup();
      expect(Castoff.timestamps).toEqual([]);

      var target = [
        { keycode: 37 },
        { keycode: 38 },
        { keycode: 33 },
        { keycode: 39 },
        { keycode: 40 },
        { keycode: 34 }
      ];

      $(document).trigger(leftArrow());
      $(document).trigger(upArrow());
      $(document).trigger(pageUp());
      $(document).trigger(rightArrow());
      $(document).trigger(downArrow());
      $(document).trigger(pageDown());
      expect(Castoff.timestamps).toEqual(target);
    });
  });

  //describe('playbackMode', function() {
    //it('does nothing on keypress events', function() {
      //Castoff.config.recordMode = false;
      //Castoff.setup();
      //expect(Castoff.timestamps).toEqual([]);
      //$(document).trigger(leftArrow());
      //expect(Castoff.timestamps).toEqual([]);
    //});
  //});

  describe('slides', function() {
    describe('count', function() {
      it('returns number of slides', function() {
        Castoff.parseTimestamps(timestamples.simple);
        expect( Castoff.slides.count() ).toEqual(3);
      });
    });
    describe('current', function() {
      describe('number', function() {
        it('returns 0 from an empty hash', function() {
          window.location.hash = "";
          expect( Castoff.slides.current.number() ).toEqual(0);
        });
        it('returns 0 from a non-numeric hash', function() {
          window.location.hash = "asdfghjk";
          expect( Castoff.slides.current.number() ).toEqual(0);
        });
        it('returns 1 from #1', function() {
          window.location.hash = "1";
          expect( Castoff.slides.current.number() ).toEqual(1);
        });
        it('returns 1 from #01', function() {
          window.location.hash = "01";
          expect( Castoff.slides.current.number() ).toEqual(1);
        });
        it('returns 8 from #08', function() {
          window.location.hash = "08";
          expect( Castoff.slides.current.number() ).toEqual(8);
        });
        it('returns 8 from #slide-08', function() {
          window.location.hash = "slide-08";
          expect( Castoff.slides.current.number() ).toEqual(8);
        });
      });
      describe('startAt', function() {
        it('returns zero for slide 1', function() {
          window.location.hash = "1";
          Castoff.parseTimestamps(timestamples.simple);
          expect( Castoff.slides.current.startAt() ).toEqual(0);
        });
        it('returns start time for existing slides', function() {
          Castoff.parseTimestamps(timestamples.simple);

          window.location.hash = "2";
          expect( Castoff.slides.current.startAt() ).toEqual(4);

          window.location.hash = "3";
          expect( Castoff.slides.current.startAt() ).toEqual(7.5);
        });
        it('returns undefined for non-existant slides', function() {
          Castoff.parseTimestamps(timestamples.simple);

          window.location.hash = "4";
          expect( Castoff.slides.current.startAt() ).toEqual(undefined);
        });
      });
    });
    describe('next', function() {
      describe('number', function() {
        it('returns number of next slide if there is one', function() {
          Castoff.parseTimestamps(timestamples.simple);
          window.location.hash = "2";
          expect( Castoff.slides.next.number() ).toEqual(3);
        });
        it('returns undefined if there is no next slide', function() {
          Castoff.parseTimestamps(timestamples.simple);
          window.location.hash = "3";
          expect( Castoff.slides.next.number() ).toEqual(undefined);
        });
      });
    });
  });

});
