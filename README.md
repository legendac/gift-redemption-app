# Gift Redemption Web App

## What is this application about?

This application is a quick solution for the tracking of Gift Redemptions.
It is funded by the Marketing department of Company W, which has over 6,000 employees in 10 cities.

## Why the sudden problem?

In the past 2 weeks, gift redemptions has been done via Google Sheets, a single sheet shared document.
Tracking over 140 records of redemption each day, the challenge has largely been to prevent staff from being able to redeem the gift multiple times - 3 staff has been caught for not following the redemption guidelines.

The marketing team has quickly reached out to the Innovation team for a quick solution to the problem.

## Features

The core feature of the application is to allow for :-

- checking of staff_id's redemption details
- submission of staff_id's redemption entry into the system
- disallow redemption when already redeemed by staff_pass_id

## Tech Solution

The plan for the application is to be hosted on AWS - using Serverless technologies like Lambda served via API Gateway.
Entrypoint of the application will be a HTML file served via AWS S3 bucket (Future plans for CloudFront).
The HTML file will be calling lambda functions for data and updates the interface.
Google Sheets API has been selected to be used as a DB, being a quick and easy solution with each sheet having a limit of 5 million rows / 100 MB, with reporting being able to be done via reporting on a seperate sheet.

> The Google Sheets API quota limitation of 60 requests per user per project per minute has also been agreed earlier. This is as each redemption usually takes between 1-3mins.

Lambda functions written using Node.js TypeScript - familiarity of the Innovation team for quick POC.
CSS framework of [Tailwinds CSS](https://tailwindcss.com/)

### Extra packages

### [Next.js](https://nextjs.org/)

> Production grade React applications that scale. Use to build static and dynamic websites. Able to deploy easily on AWS to serve our beta Application.

#### configure-aws-credentials

> Allow us to configure AWS credential environment variables for use in other GitHub Actions.

#### google-spreadsheet (unofficial package)

> This module makes trade-offs for simplicity of the interface. Google's API provides a mechanism to make many requests in parallel, so if speed and efficiency is extremely important to your use case, you may want to use their API directly. There are also several features of their API that are not implemented here yet.

Using Vernel NCC to compile .ts files to .js files

## Working with AWS CLI

aws-cli lambda help
aws-cli lambda update-function-code help

## API endpoints

- Currently, a single GET /fetch-redemption-data endpoint is used to handle all requests on the Lambda handler

  ### method="all"

  Returns JSON string, returns array of redemptions across users

  ```json
  {
    "items": [
      {
        "staff_pass_id": "BOSS_ZMKJUMC03BJP",
        "team_name": "GRYFFINDOR",
        "created_at": 1638117845204
      }
    ]
  }
  ```

  ### method="staffRedemption"

  Returns JSON string, returns

  ```json
  {
    "items": [
      {
        "staff_pass_id": "BOSS_ZMKJUMC03BJP",
        "team_name": "GRYFFINDOR",
        "created_at": 1638117845204
      }
    ],
    "ops": "success"
    // other values are "failure" - denotes user has earlier redemptions
    // and "failure-network" - implies that an Error occured in the backend server
  }
  ```

  ### method="staffHistory"

  > Currently unused on frontend
  > Returns JSON string, returns

  ```json
  {
    "items": [
      {
        "staff_pass_id": "BOSS_ZMKJUMC03BJP",
        "team_name": "GRYFFINDOR",
        "created_at": 1638117845204
      }
    ],
    "ops": "success"
    // other values are "failure" - denotes user has earlier redemptions
    // and "failure-network" - implies that an Error occured in the backend server
  }
  ```

## Future Work

### Architecture

- Performance impacts for long-term
  | Although this app has been meant for short-term use, the higher management has expressed interest to use it for other use cases in the company.
  | Usage of Google Sheets API needs to be further evaluated. With more budget for the app, a more scalable way is to link the application to a stable DB service like MongoDB via [MongoDB Cloud](https://www.mongodb.com/cloud) or [AWS](https://aws.amazon.com/quickstart/architecture/mongodb/), or [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)

- Usage of plugin like [google-spreadsheets](https://github.com/theoephraim/node-google-spreadsheet) compared to the [official Google Sheets API V4](https://developers.google.com/sheets/api) might limit us retrieval/writing performance. It is also mentioned by the author that it has limitations in managing parallel write requests for a single worker. This could be a short-term workaround while sticking with Google Spreadsheets.

- The current API exposed via Lambda are not using REST API industry practices. Could be improved to handle redemption requests using POST/PUT.

## Steps to duplicate repo: TBC

- Use your own client_secret from Google APIs, placing the client_secret.json into GitHub Repository Secrets
  - GOOGLE_SHEETS_CLIENT_SECRET
- AWS credentials has been inserted into GitHub Repository Secrets
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY

Obtain the Google Spreadsheet ID, replacing the value on `lambda-backend/sheets.ts`. Assigning `redemptionSheetID='1H3abnLcu_Uv0qTikaGQFTATGxwr47Ba3oAr3Mj0qVUk'`.

- Taking note of the `sheet_id` in the URL.
- e.g. for a URL like 'https://docs.google.com/spreadsheets/d/1H3abnLcu_Uv0qTikaGQFTATGxwr47Ba3oAr3Mj0qVUk/edit?usp=sharing', `1H3abnLcu_Uv0qTikaGQFTATGxwr47Ba3oAr3Mj0qVUk`
