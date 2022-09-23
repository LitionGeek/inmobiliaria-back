import {
  APIGatewayEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as bcrypt from "bcryptjs";
// Models
import ResponseModel from "../../models/ResponseModel";
// Services
import DatabaseService from "../../services/database.service";
//Interface
import IUser from "../../interfaces/IUser";
//Generate token
import { generateToken } from "../../utils/generateToken";
//Constraints for creation user
import requestConstraints from "../../constraints/user/create.constraint.json";
import { validateAgainstConstraints } from "src/utils/util";
'
export const userAuth = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // Initialize response variable
  let response: ResponseModel;
  const databaseService = new DatabaseService();
  // Parse request parameters
  const requestData = JSON.parse(event.body);
  let user: IUser;
  // Destructure request data
  const { email, password } = requestData;
  if (!password || !email) {
    response = new ResponseModel(
      {},
      400,
      "The email and password are required."
    );
  } else {
    try {
      user = await databaseService.getOne(email);
      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        response = new ResponseModel(
          {},
          401,
          "The password or email is invalid."
        );
      } else {
        response = new ResponseModel(
          {
            accessToken: generateToken(user),
            tokenType: "Bearer",
            expiresIn: "1800",
          },
          200
        );
      }
    } catch (error) {
      response =
        error instanceof ResponseModel
          ? error
          : new ResponseModel({}, 404, "The email not exist.");
    }
  }
  return response.generate();
};

export const createUser = async (event: APIGatewayEvent): Promise<any> => {
  const databaseService = new DatabaseService();
  let response: ResponseModel;
  const body = JSON.parse(event.body);
  return validateAgainstConstraints(body, requestConstraints)
    .then(async () => {
        const { firstName, password, lastName, email } = body;
        const user: IUser = {
          firstName,
          password: bcrypt.hashSync(password, 10),
          lastName,
          email,
          image:"",
          propertys: [],
          typeUser: "AGENT",
        };
        await databaseService
          .create(user)
          .then(
            (dato) =>
              (response = new ResponseModel({ dato }, 200, "User created."))
          )
          .catch((err) => {
            response = new ResponseModel({ err }, 400);
          });
    })
    .catch((error) => {
      // Set Error Response
      response =
        error instanceof ResponseModel
          ? error
          : new ResponseModel({}, 500, "To-do list cannot be created");
    })
    .then(() => {
      // Return API Response
      return response.generate();
    });
};
