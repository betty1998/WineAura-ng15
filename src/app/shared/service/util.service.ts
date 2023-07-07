import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  checkSame(obj1: any, obj2: any): boolean {
    const keys = Object.keys(obj1);
    for (const key of keys) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
    return true;
  }
}
