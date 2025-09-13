import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-2352907171-57be4',
  appId: '1:205514900387:web:f1ca5c4a477e8ff9f09016',
  storageBucket: 'studio-2352907171-57be4.firebasestorage.app',
  apiKey: 'AIzaSyDyD5BGEN-lQ2SMuCY2adf_VKcxxy4tn2o',
  authDomain: 'studio-2352907171-57be4.firebaseapp.com',
  messagingSenderId: '205514900387',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export {app, auth};
