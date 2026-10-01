import { Component, OnInit } from '@angular/core';
import { Skills } from '../models/skills/skills.model';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skillsList: Skills[] = [];

  async ngOnInit(): Promise<void> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0];
      const db = getFirestore(app, 'default');
      const querySnapshot = await getDocs(collection(db, 'skills'));
      this.skillsList = [];
      querySnapshot.forEach((doc) => {
        this.skillsList.push({ id: doc.id, ...doc.data() as Skills });
      });
    } catch (error) {
      console.error('Error cargando skills:', error);
    }
  }
}