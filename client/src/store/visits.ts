import { makeAutoObservable } from "mobx";
import { RootStore } from "./root";
import axiosInstance from "../transport";
import { Visit, Visits } from "../types/visit.types";
import { User } from "../types/user.types";

export class VisitsStore {
  root: RootStore;
  visits: Visits;

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.root = root;
    this.visits = {};
  }

  addVisit(visit: Visit) {
    this.visits[visit._id] = visit;
  }

  async getCurrentVisit(venueId: string) {
    return axiosInstance.get(`/visits/${venueId}`).then(({ status, data }) => {
      const visit: Visit = data.data;

      this.addVisit(visit);

      return visit._id;
    });
  }

  async fetchVisits() {
    return axiosInstance
      .get(`/users/${this.root.user.id}/visits`)
      .then(({ status, data }) => {
        if (status !== 200) throw new Error("User not found");

        const visits: Visit[] = data.data;
        visits.forEach((visit) => {
          this.addVisit(visit);
        });

        const venues: string[] = visits.map((visit) => visit.venue);

        return this.root.venues.fetchVenues(venues);
      });
  }

  get visitsSorted() {
    const visits = Object.values(this.visits);
    visits.sort(
      (a, b) => new Date(a.checkin).getTime() - new Date(b.checkin).getTime()
    );
    return visits;
  }

  async checkIn(venueId: string) {
    return axiosInstance
      .post(`/visits/${venueId}/checkin`)
      .then(({ status, data }) => {
        const visit: Visit = data.data;

        this.addVisit(visit);

        return visit._id;
      });
  }

  async checkOut(venueId: string) {
    return axiosInstance
      .post(`/visits/${venueId}/checkout`)
      .then(({ status, data }) => {
        const visit: Visit = data.data;

        this.addVisit(visit);

        return visit._id;
      });
  }

  clear() {
    this.visits = {};
  }
}
