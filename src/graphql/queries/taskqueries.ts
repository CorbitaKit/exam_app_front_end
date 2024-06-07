import gql from "graphql-tag";

export const getTasks = gql`
    query getTasks{
      tasks {
        id,
        title,
        description
      }
    }
  
  `

export const getTask = gql`
    query getTask($id: ID!) {
        task(id: $id) {
            id,
            title,
            description
        }
    }

`



