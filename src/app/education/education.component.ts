import { Component, OnInit } from '@angular/core';
import { Education } from '../models/education/education.model';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {
  educationList: Education[] = [];

  async ngOnInit(): Promise<void> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0];
      const db = getFirestore(app, 'default');
      const querySnapshot = await getDocs(collection(db, 'education'));
      this.educationList = [];
      querySnapshot.forEach((doc) => {
        this.educationList.push({ id: doc.id, ...doc.data() as Education });
      });
    } catch (error) {
      console.error('Error cargando education:', error);
    }
  }
}