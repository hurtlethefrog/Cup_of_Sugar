class Api::InvitesController < ApplicationController

    def update
        params.permit(:id)
        @invs_by_user = Invite.where("user_id = ?", params[:id])
        @invs_by_user.each do |invite|
            invite.aknowledged = true
        end
          
    end

    def show
        params.permit(:id)
        # render json: Invite.where("user_id = ?", params[:id]).includes(:events, :users)
        @invite = {}
        @invite[:invite] = Invite.where("user_id = ?", params[:id]) 
        @invite[:user] = User.where("id = ?", params[:id]) 
        @invite[:event] = Event.where("id = ?", "5")
        render json: @invite
    end
    def create
        params.permit(:invitees, :event_id)
        params[:invitees].split(',').each do |uid| 
            @inv = Invite.create(user_id: uid, event_id: params[:event_id], aknowledged: false)
            if @inv.errors
                render json: @inv.errors, status: :unprocessable_entity and return
            end
        end
    end
  end
  
  