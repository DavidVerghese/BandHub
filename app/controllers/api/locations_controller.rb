class Api::LocationsController < ApplicationController

  skip_before_action :authenticate_user, only: [:index]
  
  def index
    @locations = Location.all

    render json: @locations
  end

  def show

    @location = Location.find(params[:id])
    render json: @location
  end

  def create
    @location = Location.new(location_params)

    if @location.save
      render json: @location, status: :created
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  def location_params
    params.permit(:name)
  end

end
