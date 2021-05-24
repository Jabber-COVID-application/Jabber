import { RootStore } from "./root";
import { makeAutoObservable } from "mobx";
import { Venue, Venues } from "../types/venue.types";
import axiosInstance from "../transport";
import { Address } from "../types/misc.types";

export class VenueStore {
  root: RootStore;

  venues: Venues;

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.root = root;
    this.venues = {};
  }

  fetchOwnedVenues() {
    axiosInstance.get("/venues").then(({ status, data }) => {
      if (status === 200) {
        const responseVenues: Venues = data.data.reduce(
          (acc: Venues, curr: any) => {
            acc[curr._id] = curr;
            return acc;
          },
          {}
        );

        this.venues = { ...this.venues, ...responseVenues };
      }
    });
  }

  get ownedVenues() {
    return Object.values(this.venues).filter(
      (venue: Venue) => venue.owner === this.root.user.id
    );
  }

  async createVenue(params: CreateVenueRequest) {
    return axiosInstance.post("/venues", params).then(({ status, data }) => {
      if (status === 201) {
        const createdVenue: Venue = data.data;
        this.venues[createdVenue._id] = createdVenue;

        return true;
      }
      return false;
    });
  }
}

export interface CreateVenueRequest {
  name: string;
  address: Address;
}
