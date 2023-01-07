class InstrumentsController < ApplicationController

  def index
    @instruments = Instrument.all

    render json: @instruments
  end

  def show

    @instrument = Instrument.find(params[:id])
    render json: @instrument
  end

  def create
    @instrument = Instrument.new(instrument_params)

    if @instrument.save
      render json: @instrument, status: :created
    else
      render json: @instrument.errors, status: :unprocessable_entity
    end
  end

end
