import { makeAutoObservable } from "mobx";
import { RootStore } from "./root";

export class SidebarStore {
  root: RootStore;
  selected: string;

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.root = root;
    this.selected = "";
  }
}
