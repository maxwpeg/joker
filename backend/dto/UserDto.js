
class UserDto {
    username;
    email;
    id;
    isAdmin;

    constructor(model) {
        this.username = model.username;
        this.email = model.email;
        this.id = model.id;
        this.isAdmin = model.isAdmin;
    }
}

module.exports = UserDto;