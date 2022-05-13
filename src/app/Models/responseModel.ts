import { ResponseCode } from "../enums/ReponseCode";

export class ResponseModel{
  public  responseCode :ResponseCode=ResponseCode.NotSet;
  public responseMessage:string ="";
  public  dataSet :any
}