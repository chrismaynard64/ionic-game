export class User {
    constructor(public email: string = '', public nick: string = '', public name: string = '') {
    }

    get userName() {
        return this.nick ? this.nick : this.name ? this.name : this.email;
    }
}