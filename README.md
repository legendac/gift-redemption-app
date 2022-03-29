# Gift Redemption Web App

## What is this application about?

This application is a quick solution for the tracking of Gift Redemptions.
It is funded by the Marketing department of Company Z, which has over 25,000 employees in 12 countries.

> > > > mention about 300 requests for minute for READ operations

## Why the sudden problem?

In the past 2 weeks, gift redemptions has been done in person, with over 300 records of redemption each day, using a csv file for each office.
The marketing team has reached out to the Innovation team for a quick solution.

## Features

The core feature of the application is to allow for :-

- checking of staff_id's redemption details
- submission of staff_id's redemption entry into the system
- disallow redemption when already redeemed by staff_id

Extra features done are to allow for :-

- migration of existing data collected using csv file onto current platform
- basic reporting to show numbers collected per day with basic filter options

## Tech Solution

The plan for the application is to be hosted on AWS - using Serverless technologies like Lambda served via API Gateway.
Entrypoint of the application will be a HTML file served via AWS S3 bucket (Future plans for CloudFront).
THe HTML file will be calling lambda functions for data and updates the interface.
Google Sheets API has been selected to be used as a DB, being a quick and easy solution with each sheet having a limit of 5 million rows / 100 MB.

Lambda functions written using Node.js TypeScript - familiarity of the Innovation team for quick POC.
CSS framework of [Tachyons CSS](http://www.tachyons.io)

### Extra packages

#### configure-aws-credentials

> Allow us to configure AWS credential environment variables for use in other GitHub Actions.

#### google-spreadsheet (unofficial package)

> This module makes trade-offs for simplicity of the interface. Google's API provides a mechanism to make many requests in parallel, so if speed and efficiency is extremely important to your use case, you may want to use their API directly. There are also several features of their API that are not implemented here yet.

Using Vernel NCC to compile .ts files to .js files

## Working with AWS CLI

aws-cli lambda help
aws-cli lambda update-function-code help

## Steps to duplicate repo: TBC

- Use your own client_secret from Google APIs. Rename the file into giftredemptionapp_client_secret.json on the directory
- AWS credentials has been inserted into the GitHub Repository Secrets

## API endpoints

- Fetch all redemption data

  - GET /fetch-redemption-data
    - using getData() without specifying query parameters
      Returns JSON string, array of User
    ```json
    [
      {
        "staff_pass_id": "BOSS_ZMKJUMC03BJP",
        "team_name": "GRYFFINDOR",
        "created_at": 1638117845204
      }
    ]
    ```

- Fetch redemption data for a particular staff_id
  - GET /fetch-redemption-data
    - ?staff_pass_id=BOSS_ZMKJUMC03BJP
      specify query parameters
-

- alter to
  - /users
  - /user/user_id
