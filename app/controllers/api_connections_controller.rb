class ApiConnectionsController < ApplicationController

    def fetcher
        new_request = ApiConnection.new
        data = new_request.fetch(params[:term])
        
        data_with_images = data.map {|obj| new_request.get_image(obj)}
        render json: data_with_images
        
    end

end
