class ApiConnection < ApplicationRecord

    def fetch(search_param)
        address = RestClient.get("https://api.igdb.com/v4/games/?search=#{search_param}&fields=id,name,genres,cover", 
            headers = {
                'Accept': 'application/json',
                'Client-ID': 'yh60ysoy61t6seiqw9zpb3neiv8wm5',
                'Authorization': 'Bearer u7vaqi4q1fi136cgvx1gxndpqv5jv6',
            }
        )
        JSON.parse(address)
    end

    def get_image(obj)
        cover = obj["cover"]
        if obj.has_key?("genres")
            genre_id = obj["genres"].first
            genre = RestClient.get("https://api.igdb.com/v4/genres/#{genre_id}/?fields=name",
                headers = {
                    'Accept': 'application/json',
                    'Client-ID': 'yh60ysoy61t6seiqw9zpb3neiv8wm5',
                    'Authorization': 'Bearer u7vaqi4q1fi136cgvx1gxndpqv5jv6',
                }
            )
            array2 = JSON.parse(genre)
            genre_name = array2.first
            obj["genre_name"] = genre_name["name"]
        else
            obj["genre_name"] = "Not Specified"
        end
        image = RestClient.get("https://api.igdb.com/v4/covers/#{cover}/?fields=image_id",
            headers = {
                'Accept': 'application/json',
                'Client-ID': 'yh60ysoy61t6seiqw9zpb3neiv8wm5',
                'Authorization': 'Bearer u7vaqi4q1fi136cgvx1gxndpqv5jv6',
            }
        )
        array = JSON.parse(image)
        image_id = array.first
        obj["image_id"] = image_id["image_id"]
        obj
    end

end

puts 'hi'
