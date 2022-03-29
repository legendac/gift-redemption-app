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

// Asynchronously get tab data
export async function getSheetData() {
  try {
    // Authenticate using the JSON file we set up earlier
    await sheet.useServiceAccountAuth(clientSecret);
    await sheet.loadInfo();

    // Get the first tab's data
    const tab = sheet.sheetsByIndex[0];

  } catch (err) {
    return false;
  }
}

// Add the data we want into an object
export function cleanData(data): RedemptionRecord {
  return {
    staff_pass_id: data['staff_pass_id'],
    team_name: data['team_name'],
    created_at: data['created_at']
  }
}

export function cleanUserData(data, staff_pass_id): RedemptionRecord {
  if (data && data['staff_pass_id'] && data['staff_pass_id'] === staff_pass_id) {
    return {
      staff_pass_id: data['staff_pass_id'],
      team_name: data['team_name'],
      created_at: data['created_at']
    }
  }
}

// Asynchronously get the data
export async function getData(): Promise<string> {
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
    // console.log(data);
    return JSON.stringify(data);
  } catch (err) {
    return '';
  }
}


// Asynchronously get the data
export async function getUserRedemption(staff_pass_id: string): Promise<string> {
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
        let userData: RedemptionRecord = cleanUserData(row, staff_pass_id);
        userData && data.push(userData);
      });
    } else {
      return '';
    }
    // Return the data JSON encoded
    // console.log(data);
    return JSON.stringify(data);
  } catch (err) {
    return '';
  }
}
