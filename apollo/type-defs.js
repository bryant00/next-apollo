import gql from "graphql-tag"

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        status: String!
    }

    type Time {
        date: String!
        month: String!
        year: String!
        dateString: String!
        timeString: String!
    }

    type Query {
        viewer: User
        thetime: Time
    }
`
