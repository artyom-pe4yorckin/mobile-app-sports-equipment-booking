import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class nativeStorageService {
  nativeStorage:any
  constructor(nativeStorage: NativeStorage) {
    this.nativeStorage = nativeStorage
  }
}
