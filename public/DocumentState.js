(function() {
  var DocumentState;
  DocumentState = (function() {
    function DocumentState(foo) {
      if (foo == null) {
        foo = "bar";
      }
      this.foo = foo;
    }
    return DocumentState;
  })();
  window.DocumentState = DocumentState;
}).call(this);
