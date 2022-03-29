import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import * as IndexModuler from "../index";
import { attemptUserRedemption, fetchRedemptions, getUserRedemption } from "../sheets";

const sampleCollection = JSON.stringify({
  items: [{
    staff_pass_id: 'test123',
    team_name: 'foobar',
    created_at: 1615190110824
  },
  {
    staff_pass_id: 'test888',
    team_name: 'foobar',
    created_at: 1615190130824
  }]
});

const staffHistoryCollection = JSON.stringify({
  items: [{
    staff_pass_id: 'test444',
    team_name: 'foobar',
    created_at: 1615190220824
  },
  {
    staff_pass_id: 'test445',
    team_name: 'foobar',
    created_at: 1615195130824
  }]
});

const addSuccess = JSON.stringify({
  items: [{
    staff_pass_id: 'test123',
    team_name: 'foobar',
    created_at: 1615190110824
  }]
});

jest.mock('./../sheets')

describe('Unit Test for Lambda handler', () => {
  describe('fetchRedemptions', () => {
    it('should return successful response with method: all', async () => {
      (fetchRedemptions as jest.MockedFunction<any>).mockResolvedValue(sampleCollection);

      const event: APIGatewayProxyEvent = {
        queryStringParameters: {
          method: 'all'
        }
      } as any;
      const result = await IndexModuler.handler(event, null, null);
      
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(sampleCollection);
    });

    it('should return successful response with method: staffHistory', async () => {
      (fetchRedemptions as jest.MockedFunction<any>).mockResolvedValue(sampleCollection);

      const event: APIGatewayProxyEvent = {
        queryStringParameters: {
          method: 'staffHistory'
        }
      } as any;
      const result = await IndexModuler.handler(event, null, null);
      
      expect(result.statusCode).toEqual(200);
      expect(result.body).not.toEqual(sampleCollection);
    });
  });

  describe('staffHistory', () => {

    it('should return successful response with method: all', async () => {
      (getUserRedemption as jest.MockedFunction<any>).mockResolvedValue(staffHistoryCollection);

      const event: APIGatewayProxyEvent = {
        queryStringParameters: {
          method: 'staffHistory',
          staffId: 'test123'
        }
      } as any;
      const result = await IndexModuler.handler(event, null, null);
      
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(staffHistoryCollection);
    });

    it('should return failure response with method: all', async () => {
      (getUserRedemption as jest.MockedFunction<any>).mockResolvedValue(staffHistoryCollection);

      const event: APIGatewayProxyEvent = {
        queryStringParameters: {
          method: 'all',
        }
      } as any;
      const result = await IndexModuler.handler(event, null, null);
      
      expect(result.statusCode).toEqual(200);
      expect(result.body).not.toEqual(staffHistoryCollection);
    });
  });

  describe('staffRedemption', () => { 

    it('should return successful response with method: staffRedemption', async () => {
      (attemptUserRedemption as jest.MockedFunction<any>).mockResolvedValue(addSuccess);

      const event: APIGatewayProxyEvent = {
      queryStringParameters: {
        method: 'staffRedemption',
        staffId: 'test123',
        teamName: 'foobar'
      }
    } as any;
    const result = await IndexModuler.handler(event, null, null);
    
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(addSuccess);
    });
  })

  it('should return failure response with method: all', async () => {
    (attemptUserRedemption as jest.MockedFunction<any>).mockResolvedValue(addSuccess);

    const event: APIGatewayProxyEvent = {
      queryStringParameters: {
        method: 'all',
      }
    } as any;
    const result = await IndexModuler.handler(event, null, null);
    
    expect(result.statusCode).toEqual(200);
    expect(result.body).not.toEqual(addSuccess);
  });
});
