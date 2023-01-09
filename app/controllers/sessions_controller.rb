

class SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    user = User.find_by(name: params[:name])
   
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user, status: :created
    else
      render json: { errors: ["Username or Password did not match any user."] }, status: :unprocessable_entity
    end
  end
  
  def destroy
    session.delete(:user_id)
    render json: { errors: ["Successfully logged out"]}, status: :ok
  end
end