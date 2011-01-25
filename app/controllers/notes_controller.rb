class NotesController < ApplicationController

  respond_to :html, :json
  before_filter :load_notes

  def index
    respond_with @notes
  end

  def show
    @note = Note.find(params[:id])
    respond_with @note
  end

  def new
    @note = Note.new
    respond_with @note
  end

  def create
    @note = Note.new(params[:note])

    if @note.save
      redirect_to note_path(@note)
    else
      render :new
    end
  end

  def update
    @note = Note.find(params[:id])

    if @note.update_attributes(params[:note])
      redirect_to note_path(@note)
    else
      render :show
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    redirect_to :index
  end

  private

  def load_notes
    @notes = Note.all
  end

end
