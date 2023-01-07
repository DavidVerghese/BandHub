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

  # PATCH/PUT /users/1
  def update
    if @location.update(location_params)
      render json: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @location.destroy
  end

end
