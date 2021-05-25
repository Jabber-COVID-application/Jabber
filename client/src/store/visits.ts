import { makeAutoObservable } from "mobx";
import { RootStore } from "./root";
import axiosInstance from "../transport";
import { Visit, Visits } from "../types/visit.types";

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
}
