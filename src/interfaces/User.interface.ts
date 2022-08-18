
export default interface User {
    id?: number
    email: string | null
    name: string | null
    profile_image: string | null
    background_image: string | null
    password: string | null
    createdAt?: Date
    updatedAt?: Date
}