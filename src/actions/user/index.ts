import { handlerPath } from "../../libs/handler-resolver";

export const Auth = {
    handler: `${handlerPath(__dirname)}/handler.userAuth`,
    events: [
        {
            http: {
                method: 'POST',
                path: 'auth',
                cors: true
            }
        }
    ]
}

export const AuthRegister = {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
        {
            http: {
                method: 'POST',
                path: 'auth/register',
                cors: true
            }
        }
    ]
}