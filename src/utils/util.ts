import validate from 'validate.js/validate'; 

// Models
import ResponseModel from "../models/ResponseModel";

// Types
 type IGeneric<T> = {
    [index in string | number | any]: T;
};

/**
 * Validate values against constraints
 * @param values
 * @param constraints
 * @return {Promise<any>}
 */
export const validateAgainstConstraints = (values: IGeneric<string>, constraints: IGeneric<any>): Promise<any> => {

    return new Promise<void>((resolve, reject) => {
        const validation = validate(values, constraints);
        console.log(validation)
        if (typeof validation === 'undefined') {
            resolve();
        } else {
            reject(new ResponseModel({ validation }, 400, 'Required fields are missing'));
        }
    });
}
