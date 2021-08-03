class ApiConnection < ApplicationRecord

    def fetch(search_param)
        address = RestClient.get("https://api.igdb.com/v4/games/?search=#{search_param}&fields=id,name,genres,cover", 
            headers = {
                'Accept': 'application/json',
                'Client-ID': 'yh60ysoy61t6seiqw9zpb3neiv8wm5',
                'Authorization': 'Bearer u7vaqi4q1fi136cgvx1gxndpqv5jv6',
            }
        )
        byebug
    end

end

puts 'hi'
