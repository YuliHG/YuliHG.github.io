import { Component, OnInit } from '@angular/core';
import { Interests } from '../models/interests/interests.model';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css'
})
export class InterestsComponent implements OnInit {
  interestsList: Interests[] = [];

  async ngOnInit(): Promise<void> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0];
      const db = getFirestore(app, 'default');
      const querySnapshot = await getDocs(collection(db, 'interests'));
      this.interestsList = [];
      querySnapshot.forEach((doc) => {
        this.interestsList.push({ id: doc.id, ...doc.data() as Interests });
      });
    } catch (error) {
      console.error('Error cargando interests:', error);
    }
  }
}