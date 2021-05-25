export interface Visit {
  _id: string;
  user: string;
  venue: string;
  checkin: Date;
  checkout?: Date;
}

export interface Visits {
  [id: string]: Visit;
}
