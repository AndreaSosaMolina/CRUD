
export interface User {
    id?:        number;
    name:       string;
    password:   string;
    passwordConfirm: string;
    email:      string;
    subscribed: boolean;
    country:    string;
    city:       string;
}

