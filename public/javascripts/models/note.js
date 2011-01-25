var Note = Model('note', {
  persistence: Model.REST("/notes")
}, {
  toMustache: function () {
    return {
      method: this.newRecord() ? "post" : "put",
      action: this.newRecord() ? "/notes" : ("/notes/" + this.id()),
      title: this.attr('title'),
      body: this.attr('body')
    }
  }
})