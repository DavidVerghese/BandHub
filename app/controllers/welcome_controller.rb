class WelcomeController < ApplicationController
  skip_before_action :authenticate_user
  def index 
    render json: {message: "Welcome to my site!"}
  end
end
