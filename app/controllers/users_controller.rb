class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :index, :show]

  def index
    @users = User.all

    render json: @users
    #render json: @users, include: [:instrument, :genre, :location, :looking_for]
  end

  def show
    @user = User.find(session[:user_id])
    render json: @user, include: [:instrument, :genre, :location, :looking_for]
  end

  def create
    @user = User.create!(
      name: params[:name], 
      password: params[:password], 
      picture_url: params[:picture_url], 
      email_address: params[:email_address], 
      genre: Genre.find_or_create_by(name:params[:genre]), 
      instrument: Instrument.find_or_create_by(name:params[:instrument]), 
      location: Location.find_or_create_by(name: params[:location]), 
      looking_for: Instrument.find_or_create_by(name: params[:looking_for])
    )
 
    if @user.valid?
      session[:user_id] = @user.id
      # byebug
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
    params.permit(:name, :password, :picture_url, :email_address, :genre, :instrument, :location, :looking_for)
  end

end
