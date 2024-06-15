export interface ResetPasswordType {
    status: string,
    oldPassword: string,
    password: string,
    confirmPassword: string,
    token?: string,
}