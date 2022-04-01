// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { Redemption } from 'path/to/interfaces';

export type Redemption = {
  staff_pass_id: string;
  team_name: string;
  created_at: string;
};

export type RedemptionEntry = {
  staff_pass_id: string;
  team_name: string;
};

export type TeamName = {
  display: string,
  value: string
}

export type RedemptionResponse = {
  items: Redemption[],
  ops: string
}

export type RedemptionFormEntry = {
  staff_pass_id: string,
  team_name: string
}

export type RedemptionFormResult = {
  ops: string,
  ops_message: string,
  last_staff_redeemed: string,
  items: Redemption[]
}