var Note = Model('note', {
  persistence: Model.REST("/notes"),
  toMustache: function () {
    return {
      notes: this.map(function (note) { return note.attr() })
    }
  }
}, {
  toForm: function () {
    return {
      method: this.newRecord() ? "post" : "put",
      action: this.newRecord() ? "/notes" : ("/notes/" + this.id()),
      note: this.attr()
    }
  }
})