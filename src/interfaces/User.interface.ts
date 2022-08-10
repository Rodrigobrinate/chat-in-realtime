
export default interface User {
    id?: number
    email: string | null
    name: string | null
    password: string | null
    createdAt?: Date
    updatedAt?: Date
}