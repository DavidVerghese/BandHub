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

  # PATCH/PUT /users/1
  def update
    @genre = Genre.find(params[:id])
    if @genre.update(genre_params)
      render json: @genre
    else
      render json: @genre.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @genre = Genre.find(params[:id])
    if @genre == Genre.first
      render json: {error: "this genre cannot be deleted as it serves as placeholder for users who do not have a genre"}
    else 
      # making sure this genre no longer belongs to any users
      if @genre.users.count > 0
        User.all.where(genre_id: @genre.id).each do |user| user.update(genre_id: Genre.first.id) end
      end
      @genre.destroy
      render json: @genre
    end 
  end

  private

  def genre_params
    params.permit(:name)
  end

end
