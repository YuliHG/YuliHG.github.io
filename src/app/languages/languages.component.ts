import { Component, OnInit } from '@angular/core';
import { Languages } from '../models/languages/languages.model';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent implements OnInit {
  languagesList: Languages[] = [];

  async ngOnInit(): Promise<void> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0];
      const db = getFirestore(app, 'default');
      // Coincide con la colección 'Languages' en Firebase
      const querySnapshot = await getDocs(collection(db, 'Languages'));
      this.languagesList = [];
      querySnapshot.forEach((doc) => {
        this.languagesList.push({ id: doc.id, ...doc.data() as Languages });
      });
    } catch (error) {
      console.error('Error cargando languages:', error);
    }
  }
}