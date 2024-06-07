
import gql from "graphql-tag";

export const loginQuery = gql`
    mutation userLogin($input: AuthInput!) {
        login(input: $input) {
            token,
            user{
                id,
                email,
                name,
                tasks{
                    id,
                    title,
                    description
                }
            }
        }
    }

`

export const logoutQuery = gql`
    mutation useLogout($email: String!) {
        logout(email: $email) {
            message
        }
    }


`

export const registerQuery = gql`
    mutation registerUser($input: UserInput!) {
        createUser(input: $input){
           ... on User{
                name,
                email
           }

           ... on UserErrors{
                errors
           }
        }
    }
`