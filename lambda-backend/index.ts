import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import * as _ from 'lodash';
import { attemptUserRedemption, fetchRedemptions, getUserRedemption } from './sheets';

export const handler: Handler = async (event: APIGatewayProxyEvent, context, callback): Promise<APIGatewayProxyResultV2> => {
  let queryParams = event.queryStringParameters || null;
  let sheetData: string, method: string, staffId: string, teamName: string;
  
  if (queryParams) {
    console.log(queryParams);
    method = queryParams.method || '';
    staffId = queryParams.staffId || '';
    teamName = queryParams.teamName || '';
  }

  switch (method) {
    case 'all':
      sheetData = await fetchRedemptions();
      break;
    case 'staffHistory':
      sheetData = await getUserRedemption(staffId);
      break;
    case 'staffRedemption':
      sheetData = await attemptUserRedemption(staffId, teamName);
      break;
    default:
      sheetData = await '';
      break;
  }
    
  const response = {
    statusCode: 200,
    body: sheetData
  };
  return response;
};