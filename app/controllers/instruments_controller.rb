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

  # PATCH/PUT /users/1
  def update
    if @instrument.update(instrument_params)
      render json: @instrument
    else
      render json: @instrument.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @instrument.destroy
  end

end
