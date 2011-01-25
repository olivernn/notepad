var Note = Model('note', {
  persistence: Model.REST("/notes"),
  toMustache: function () {
    return {
      notes: this.map(function (note) { return note.toMustache() })
    }
  }
}, {
  toMustache: function () {
    return {
      method: this.newRecord() ? "post" : "put",
      action: this.newRecord() ? "/notes" : ("/notes/" + this.id()),
      title: this.attr('title'),
      body: this.attr('body'),
      id: this.attr('id')
    }
  }
})