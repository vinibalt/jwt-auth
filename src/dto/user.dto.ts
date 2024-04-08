

export class payload {
    id: string;
}

export class UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string
    password: string
    birthdate: Date
    role: string
    createdAt: Date;
    updatedAt: Date;

    constructor(id?: string, firstName?: string, lastName?: string, email?: string, username?: string, password?: string, birthdate?: Date, role?: string, createdAt?: Date, updatedAt?: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.birthdate = birthdate;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}