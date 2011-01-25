module Notes
  class NoteListView < MustacheRails
    def notes
      @view_context.instance_variable_get("@notes")
    end
  end
end