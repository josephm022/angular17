import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'proyecto-final-adcb3',
        appId: '1:656385279504:web:05652ee5f45f56b3d9ec95',
        storageBucket: 'proyecto-final-adcb3.appspot.com',
        apiKey: 'AIzaSyD6axUyeLE7N3kHHsjR81qZGt3XpaKppzA',
        authDomain: 'proyecto-final-adcb3.firebaseapp.com',
        messagingSenderId: '656385279504',
        measurementId: 'G-2MRG1NX4WQ',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
