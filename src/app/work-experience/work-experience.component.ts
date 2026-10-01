import { Component, OnInit } from '@angular/core';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent implements OnInit {
  workExperience: WorkExperience[] = [];

  async ngOnInit(): Promise<void> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0];
      const db = getFirestore(app, 'default');
      
      const querySnapshot = await getDocs(collection(db, 'work-experience'));
      this.workExperience = [];

      querySnapshot.forEach((doc) => {
        this.workExperience.push({ id: doc.id, ...doc.data() as WorkExperience });
      });

      console.log('Trabajos cargados en WorkExperience:', this.workExperience);
    } catch (error) {
      console.error('Error cargando work-experience:', error);
    }
  }
}