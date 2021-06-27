import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStorage(name: string, item: any) {
    if (name) {
      localStorage.setItem(name, JSON.stringify(item));
    }
  }

  getStorage(name: string): Object | any {

    let item: any;

    if (name) {
      item = localStorage.getItem(name);
    }

    return this.parseStorage(item);

  }

  private parseStorage(item) {
    if (item) {
      return JSON.parse(item);
    }
  }
}
