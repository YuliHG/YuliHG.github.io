import { Component, OnInit } from '@angular/core';
import { Certificates } from '../models/certificates/certificates.model';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent implements OnInit {
  certificatesList: Certificates[] = [];

  async ngOnInit(): Promise<void> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0];
      const db = getFirestore(app, 'default');
      const querySnapshot = await getDocs(collection(db, 'certificates'));
      this.certificatesList = [];
      querySnapshot.forEach((doc) => {
        this.certificatesList.push({ id: doc.id, ...doc.data() as Certificates });
      });
    } catch (error) {
      console.error('Error cargando certificates:', error);
    }
  }
}