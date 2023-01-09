class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :index, :show, :lookup]

  def index
    @users = User.all

    render json: @users
    #render json: @users, include: [:instrument, :genre, :location, :looking_for]
  end

  def show
    @user = User.find(session[:user_id])
    render json: @user, include: [:instrument, :genre, :location, :looking_for]
  end

  def lookup
    @user = User.find(params[:user_id])
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

      #id, :name, :picture_url, :email_address, 
      #:genre_name, :instrument_name, :location_name, 
      #:looking_for
      render json: {
        id:@user.id,
        name:@user.name,
        picture_url:@user.picture_url,
        email_address: @user.email_address,
        genre_name: @user.genre.name,
        instrument_name: @user.instrument.name,
        location_name: @user.location.name, 
        looking_for: @user.looking_for.name,
        genre: @user.genre, 
        instrument: @user.instrument, 
        location: @user.location, 
        created_at: @user.created_at, 
        updated_at: @user.updated_at,
        encrypted_id: @user.id
      }, 
        status: :created
    end
  end

  # PATCH/PUT /users/1
  def update
    @user = User.find(params[:id])
    @user.update!(
      name:params[:name],
      picture_url:params[:picture_url],
      email_address:params[:email_address],
      genre_id: Genre.find_or_create_by(name:params[:genre]).id,
      instrument_id: Instrument.find_or_create_by(name:params[:instrument]).id,
      location_id: Location.find_or_create_by(name:params[:location]).id,
      looking_for_id: Instrument.find_or_create_by(name:params[:looking_for]).id
    )
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
