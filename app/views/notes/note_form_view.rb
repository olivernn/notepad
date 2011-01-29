module Notes
  class NoteFormView < Walrus::View
    def action
      note.new_record? ? "/notes" : "/notes/#{note.id}"
    end

    def method
      note.new_record? ? "post" : "put"
    end
  end
end