App = Davis(function () {

  var noteList

  this.use(Davis.title)
  this.use(Davis.googleAnalytics)

  this.configure(function (config) {
    config.generateRequestOnPageLoad = false
  })

  this.bind('start', function () {
    noteList = new NoteListView (Note.toMustache())
    noteList.render()
  })

  this.get('/', function (req) {
    $('#note-form-container').html('<div id="logo"><img src="/images/logo.png"/></div>');
    req.setTitle('NotePad')
  })

  this.get('/notes', function (req) {
    req.redirect('/')
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
      noteList.reload(Note.toMustache())
      req.redirect('/notes/' + this.id())
    })
  })

  this.del('/notes/:id', function (req) {
    var note = Note.find(req.params['id'])
    note.destroy(function () {
      req.redirect('/')
    })
  })
})