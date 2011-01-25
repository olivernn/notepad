module Notes
  class NoteFormView < MustacheRails
    def note
      @view_context.instance_variable_get("@note")
    end

    def action
      note.new_record? ? "/notes" : "/notes/#{note.id}"
    end

    def method
      note.new_record? ? "post" : "put"
    end
  end
end