class LocationsController < ApplicationController

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
