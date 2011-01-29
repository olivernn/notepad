App = Davis(function () {

  this.before(function () {
    var noteList = new NoteListView (Note.toMustache())
    noteList.render()
  })

  this.get('/notes', function () {
    $('#note-form-container').html('<div id="logo"><img src="/images/logo.png"/></div>');
  });

  this.get('/notes/new', function (req) {
    var note = new Note ()
    var noteForm = new NoteFormView(note.toForm())
    noteForm.render()
  })

  this.get('/notes/:id', function (req) {
    var note = Note.find(req.params['id'])
    var noteForm = new NoteFormView(note.toForm())
    noteForm.render()
  })

  this.post('/notes', function (req) {
    var note = new Note (req.params['note'])
    note.save(function () {
      req.redirect('/notes/' + this.id())
    })
  })

  this.put('/notes/:id', function (req) {
    var note = Note.find(req.params['id'])
    note.attr(req.params['note'])
    note.save(function () {
      req.redirect('/notes/' + this.id())
    })
  })

  this.del('/notes/:id', function (req) {
    var note = Note.find(req.params['id'])
    note.destroy(function () {
      req.redirect('/notes')
    })
  })
})