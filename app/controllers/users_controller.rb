class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :index]

  def index
    @users = User.all

    render json: @users, include: [:instrument, :genre, :location, :looking_for]
  end

  def show
    @user = User.find(session[:user_id])
    render json: @user, include: [:instrument, :genre, :location, :looking_for]
  end

  def create
    @user = User.create!(user_params)
    if @user.valid?
      session[:user_id] = @user.id
      render json: @user, status: :created
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
