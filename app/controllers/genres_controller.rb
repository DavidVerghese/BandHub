class GenresController < ApplicationController
  # before_action :set_user, only: [:show, :update, :destroy]

  def index
    @genres = Genre.all

    render json: @genres
  end

  def show

    @genre = Genre.find(params[:id])
    render json: @genre
  end

  def create
    @genre = Genre.new(genre_params)

    if @genre.save
      render json: @genre, status: :created
    else
      render json: @genre.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @genre.update(genre_params)
      render json: @genre
    else
      render json: @genre.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @genre.destroy
  end

end
