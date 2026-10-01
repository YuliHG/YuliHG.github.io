import { Component, OnInit } from '@angular/core';
import { Header } from '../models/header/header.model';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  header: Header = new Header();

  async ngOnInit(): Promise<void> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0];
      // Pasamos explícitamente el nombre de la base de datos que aparece en tu consola:
      const db = getFirestore(app, 'default');

      const querySnapshot = await getDocs(collection(db, 'header'));
      console.log('Total documentos encontrados:', querySnapshot.size);

      querySnapshot.forEach((doc) => {
        console.log('ID Documento:', doc.id, '=> Datos:', doc.data());
        this.header = doc.data() as Header;
      });
    } catch (error) {
      console.error('Error directo con Firebase SDK:', error);
    }
  }
}