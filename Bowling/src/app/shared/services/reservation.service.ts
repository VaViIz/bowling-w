import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  collectionName = "Res"

  constructor(private afs: AngularFirestore) { }

  create(res: Reservation) {
    res.id = this.afs.createId();
    return this.afs.collection<Reservation>(this.collectionName).doc(res.id).set(res);
    
  }

  getResByUserName(userName: string) {
    return this.afs.collection<Reservation>(this.collectionName, ref => ref.where('userName', '==', userName)).valueChanges();
  }

  delete(id: string) {
    return this.afs.collection<Reservation>(this.collectionName).doc(id).delete();
  }
  
}
