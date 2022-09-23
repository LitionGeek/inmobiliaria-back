
import * as AWS from 'aws-sdk';

// Models
import ResponseModel from '../models/ResponseModel';

// Interfaces
/* import IConfig from '../interfaces/config.interface'; */

// Enums
/* import { StatusCode } from "../enums/status-code.enum"; */
/* import { ResponseMessage } from "../enums/response-message.enum";  */
import mongoose from "mongoose";
/* import IUser from "../interfaces/IUser"; */
import UserModel from "../models/UserModel";
import IUser from 'src/interfaces/IUser';
/* require("dotenv").config(); */



/* type Item = {[index: string]: string}; */

AWS.config.update({ region: "eu-west-1" });

let isConnected: any;

const connectToDatabase = async () => {
  if (isConnected) {
    return Promise.resolve();
  }
  const db = await mongoose.connect("mongodb+srv://lition:lition@cluster0.da6lp.mongodb.net/cluster0?retryWrites=true&w=majority");
  isConnected = db.connections[0].readyState;
};

export default class DatabaseService {  
    constructor(){
        connectToDatabase();  
    }

/*
    batchCreate = async(params: BatchWrite): Promise<BatchWriteOutPut> => {
        try {
            return await documentClient.batchWrite(params).promise();
        } catch (error) {
            throw new ResponseModel({}, 500, `batch-write-error: ${error}`);
        }
    }

    update = async (params: UpdateItem): Promise<UpdateItemOutPut> => {
        try {
            return await documentClient.update(params).promise();
        } catch (error) {
            throw new ResponseModel({}, 500, `update-error: ${error}`);
        }
    }

    query = async (params: QueryItem): Promise<QueryItemOutput> => {
        try {
            return await documentClient.query(params).promise();
        } catch (error) {
            throw new ResponseModel({}, 500, `query-error: ${error}`);
        }
    }  */

    async getOne(emailRecived: string): Promise <any>{
        try {
            return await UserModel.findOne({ email: emailRecived })
        } catch (error) {
            throw new ResponseModel({}, 500, `get-error: ${error}`);
        }
    }

    create = async(params: IUser): Promise<any> => {
        try {
            return await UserModel.create(params)
        } catch (error) {
            throw new ResponseModel({}, 500, `create-error: ${error}`);
        }
    }

 /*    delete = async (params: DeleteItem): Promise<DeleteItemOutput> => {
        try {
            return await documentClient.delete(params).promise();
        } catch (error) {
            throw new ResponseModel({}, 500, `delete-error: ${error}`);
        }
    } */
} 