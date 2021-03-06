(function() {
  var five, four, one, six, three, trackA, trackB, two;
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
  trackA = new Timeline({
    chronologs: [one, two, three, four],
    coordinates: 's1,s2,b3,b4'
  });
  trackB = new Timeline({
    chronologs: [one, two, five, six],
    coordinates: 's1,s2,t3,t5,t6'
  });
  trackB.activate();
  six.activate();
  new DocumentState(Timeline.asDocumentState());
}).call(this);
