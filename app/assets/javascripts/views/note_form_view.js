NoteFormView = View("note-form", {

  beforeRender: function () {
    this.html
      .find(':submit.delete')
        .click(function () {
          var form = $(this).parents('form')
          form.attr('method', 'delete')
        })
  }
})