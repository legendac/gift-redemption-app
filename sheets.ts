// import { APIGatewayProxyEvent } from 'aws-lambda';

type RedemptionRecord = {
  staff_pass_id: string;
  team_name: string;
  created_at: number;
};

// Get spreadsheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet');
// Ensure you've updated this file with your client secret
const clientSecret = require('./gift-redemption-app_client-secret.json');

// Add your Google sheet ID here
const redemptionSheetID = '1H3abnLcu_Uv0qTikaGQFTATGxwr47Ba3oAr3Mj0qVUk';

// Instantiates the spreadsheet
const sheet = new GoogleSpreadsheet(redemptionSheetID);

// Add the data we want into an object
export function cleanData(data): RedemptionRecord {
  return {
    staff_pass_id: data['staff_pass_id'],
    team_name: data['team_name'],
    created_at: data['created_at']
  }
}

export function cleanUserData(data, staffPassId): RedemptionRecord {
  if (data && data['staff_pass_id'] && data['staff_pass_id'] === staffPassId) {
    return {
      staff_pass_id: data['staff_pass_id'],
      team_name: data['team_name'],
      created_at: data['created_at']
    }
  }
}

// Fetch all redemptions - Used by Admin / Reporting tools
export async function fetchRedemptions(): Promise<string> {
  try {
    // Authenticate using the JSON file we set up earlier
    await sheet.useServiceAccountAuth(clientSecret);
    await sheet.loadInfo();

    // Get the first tab's data
    const tab = sheet.sheetsByIndex[0];

    // Get row data
    const rows = await tab.getRows();

    // Empty array for our data
    let data = [];

    // If we have data
    if (rows.length > 0) {
      // Iterate through the array of rows
      // and push the clean data from your spreadsheet
      rows.forEach(row => {
        data.push(cleanData(row));
      });
    } else {
      return '';
    }
    // Return the data JSON encoded
    console.log(data);
    return JSON.stringify({ items: data });
  } catch (err) {
    return '';
  }
}

// Fetch redemption data given a particular staff_pass_id
export async function getUserRedemption(staffPassId: string): Promise<string> {
  try {
    // Authenticate using the JSON file we set up earlier
    await sheet.useServiceAccountAuth(clientSecret);
    await sheet.loadInfo();

    // Get the first tab's data
    const tab = sheet.sheetsByIndex[0];

    // Get row data
    const rows = await tab.getRows();

    // Empty array for our data
    let data = [];

    // If we have data
    if (rows.length > 0) {
      // Iterate through the array of rows
      // and push the clean data from your spreadsheet
      rows.forEach(row => {
        let staffRedemptionData: RedemptionRecord = cleanUserData(row, staffPassId);
        staffRedemptionData && data.push(staffRedemptionData);
      });
    } else {
      return '';
    }
    // Return the data JSON encoded
    console.log(data);
    return JSON.stringify({ items: data });
  } catch (err) {
    return '';
  }
}

// Attempt to redeem, check for earlier records of redemption given a particular staff_pass_id
// Presence of earlier records will deny redemption
export async function attemptUserRedemption(staffPassId: string, teamName: string): Promise<string> {
  try {
    // Authenticate using the JSON file we set up earlier
    await sheet.useServiceAccountAuth(clientSecret);
    await sheet.loadInfo();

    // Get the first tab's data
    const tab = sheet.sheetsByIndex[0];

    // Get row data
    const rows = await tab.getRows();

    // Empty array for our data
    let data = [];
    let ops = 'failure';

    // If we have data
    if (rows.length > 0) {
      // Iterate through the array of rows
      // and push the clean data from your spreadsheet
      rows.forEach(row => {
        let staffRedemptionData: RedemptionRecord = cleanUserData(row, staffPassId);
        staffRedemptionData && data.push(staffRedemptionData);
      });
    }
    console.log('interim data', data);
    if (data.length === 0) {
      console.log('in data.length === 0');
      let staffRedemptionData = await addUserRow(staffPassId, teamName);
      if (staffRedemptionData) {
        data.push(cleanData(staffRedemptionData));
        ops = 'success';
      } else {
        return '';
      }
    }
    // Return the data JSON encoded
    console.log(data);
    return JSON.stringify({
      items: data,
      ops
    });
  } catch (err) {
    console.log(err);
    return '';
  }
}

export async function addUserRow(staffPassId: string, teamName: string): Promise<string> {
  try {
    // Authenticate using the JSON file we set up earlier
    await sheet.useServiceAccountAuth(clientSecret);
    await sheet.loadInfo();

    // Get the first tab's data
    const tab = sheet.sheetsByIndex[0];

    // Get row data
    const newRow = await tab.addRow({
      staff_pass_id: staffPassId,
      team_name: teamName,
      created_at: Date.now()
    });
    console.log(newRow);
    return newRow;
  } catch (err) {
    return '';
  }
}