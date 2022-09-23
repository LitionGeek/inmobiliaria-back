import IUser from '../../src/interfaces/IUser';
import * as jsonwebtoken from "jsonwebtoken";
require('dotenv').confih()

export const generateToken = (user: IUser) => {
    return jsonwebtoken.sign({ user }, process.env.JWT, {
      expiresIn: 1800,
    });
};