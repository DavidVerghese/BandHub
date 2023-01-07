class GenresController < ApplicationController

  def index
    @genres = Genre.all

    render json: @genres
  end

  def show
    @genre = Genre.find(params[:id])
    render json: @genre
  end

  def create

    # you need the ! to get 'render_unprocessable_entity_response' method to run 
    @genre = Genre.create!(genre_params)
    render json: @genre, status: :created
  end

  private

  def genre_params
    params.permit(:name)
  end

end
