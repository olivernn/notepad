NoteListView = View("note-list", {

  init: function () {
    var self = this

    var reload = function () {
      self.reload(Note.toMustache())
    }

    Note.bind('add', reload)
    Note.bind('remove', reload)
  }
})