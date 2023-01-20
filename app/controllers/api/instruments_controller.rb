class Api::InstrumentsController < ApplicationController

  skip_before_action :authenticate_user, only: [:index]
  
  def index
    @instruments = Instrument.all

    render json: @instruments
  end

  def show

    @instrument = Instrument.find(params[:id])
    render json: @instrument
  end

  def create
    @instrument = Instrument.create!(instrument_params)
    render json: @instrument, status: :created
  end

  private

  def instrument_params
    params.permit(:name)
  end

end
