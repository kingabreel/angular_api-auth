export interface User{
    "id": number,
    "email": string,
    "password": string,
    "name": string,
    "role": string,
    "avatar": string
  }


export interface UserToken {
  "email": string,
  "roles": string
  "exp": number
}