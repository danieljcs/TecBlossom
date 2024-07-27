const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        characters(
            page: Int
            filter: CharacterFilter
        ): CharacterResponse
    }

    input CharacterFilter {
        status: String
        species: String
        gender: String
        name: String
        origin_name: String
    }
    
    type Mutation {
        updateComment(id: Int!, comment: String!): Character
    }

    type Mutation {
        markFavorite(id: Int!): Character
    }

    type Mutation {
        deleteCharacter(id: Int!): Character
    }

    type CharacterResponse {
        info: Info
        results: [Character]
    }

    type Info {
        count: Int
        pages: Int
        next: Int
        prev: Int
    }

    type Character {
        id: Int
        name: String
        status: String
        species: String
        type: String
        gender: String
        origin_name: String
        origin_url: String
        location_name: String
        location_url: String
        image: String
        url: String
        created: String
        comment: String
        is_favorite: Boolean
        deletedAt: String
    }
`;

module.exports = typeDefs;
