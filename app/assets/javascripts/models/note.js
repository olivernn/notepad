var Note = Model('note', function () {
  this.persistence(Model.REST, "/notes")

  this.extend({
    toMustache: function () {
      return {
        notes: this.map(function (note) { return note.attr() })
      }
    }
  })

  this.include({
    toForm: function () {
      return {
        method: this.newRecord() ? "post" : "put",
        action: this.newRecord() ? "/notes" : ("/notes/" + this.id()),
        note: this.attr()
      }
    }
  })
})