import gql from "graphql-tag";

export const deleteTaskQuery = gql`
    mutation taskDelete($id: ID!){
        deleteTask(id: $id)
    }
`


export const createTaskQuery = gql`
    mutation createTask($input: TaskInput!) {
        createTask(input: $input) {
            ... on Task {
                id
                title
                description
            }
            ... on TaskErrors {
                errors
            }
        }
    }
`

export const updateTaskQuery = gql`
    mutation updateTask($input: TaskInput!, $id: ID!) {
        updateTask(input: $input, id: $id) {
            ... on Task {
                id
                title
                description
            }
            ... on TaskErrors {
                errors
            }
        }
    }
`