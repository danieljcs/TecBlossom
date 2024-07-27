export  class Character {
    constructor(id, name, status, species, type, gender, image, url, created,
        origin_name,
        origin_url,
        location_name,
        location_url,
        comment,
        is_favorite
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.image = image;
        this.url = url;
        this.created = created;
        this.origin_name = origin_name;
        this.origin_url = origin_url; 
        this.location_name = location_name;  
        this.location_url = location_url;   
        this.comment = comment;
        this.is_favorite = is_favorite;
    }

    static fromApiResponse(apiResponse) {
        return new Character(
            apiResponse.id,
            apiResponse.name,
            apiResponse.status,
            apiResponse.species,
            apiResponse.type,
            apiResponse.gender,
            apiResponse.image,
            apiResponse.url,
            apiResponse.created,
            apiResponse.origin_name,
            apiResponse.origin_url,
            apiResponse.location_name,
            apiResponse.location_url,
            apiResponse.comment,
            apiResponse.is_favorite
        );
    }

    static fromApiResponseList(apiResponseList) {
        return apiResponseList.map(Character.fromApiResponse);
    }
}

export class Info {
    constructor(count, pages, next, prev) {
        this.count = count;
        this.pages = pages;
        this.next = next;
        this.prev = prev;
    }

    static fromApiResponse(apiResponse) {
        return new Info(
            apiResponse.count,
            apiResponse.pages,
            apiResponse.next,
            apiResponse.prev
        );
    }
}
