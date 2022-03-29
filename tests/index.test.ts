import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { textSpanContainsTextSpan } from "typescript";
import * as IndexModuler from "../index";
import { getData } from "../sheets";

const sampleCollection = JSON.stringify([{
  staff_pass_id: 'test123',
  team_name: 'foobar',
  created_at: 1615190110824
}]);

jest.mock('./../sheets')

describe('Unit test for Lambda fetch-data handler', () => {
  it('verifies successful response', async () => {
    (getData as jest.MockedFunction<any>).mockResolvedValue(sampleCollection);

    const event: APIGatewayProxyEvent = {} as any;
    const result = await IndexModuler.handler(event, null, null);
    
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(sampleCollection);
  });
});
