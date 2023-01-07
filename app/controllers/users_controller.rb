class UsersController < ApplicationController

  def index
    @users = User.all

    render json: @users, include: [:instrument, :genre, :location, :looking_for]
  end

  def show
    @user = User.find(params[:id])
    render json: @user, include: [:instrument, :genre, :location, :looking_for]
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    @user = User.find(params[:id])
    @user.update!(user_params)
    render json: @user
  end

  # DELETE /users/1
  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end

  private 

  def user_params
    params.permit(:name, :password, :picture_url, :email_address, :genre_id, :instrument_id, :location_id, :looking_for_id)
  end

end
