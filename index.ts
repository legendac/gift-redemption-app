import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import * as _ from 'lodash';
import { getData } from './sheets';

export const handler: Handler = async (event: APIGatewayProxyEvent, context, callback): Promise<APIGatewayProxyResultV2> => {
  const sheetData = await getData();
  const response = {
    statusCode: 200,
    body: sheetData
  };
  return response;
};