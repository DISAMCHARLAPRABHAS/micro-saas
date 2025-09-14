import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from 'firebase/firestore';
import type { Message } from '@/components/features/chat-interface';

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
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// CHAT FUNCTIONS
export type Chat = {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
}

export async function getChats(userId: string): Promise<Chat[]> {
    if (!userId) return [];
    const q = query(
        collection(db, 'chats'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Chat));
}

export async function getChatMessages(chatId: string): Promise<Message[]> {
    if (!chatId) return [];
    const q = query(
        collection(db, `chats/${chatId}/messages`),
        orderBy('createdAt', 'asc'),
        limit(100)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Message));
}

export async function createChat(userId: string, firstMessage: string): Promise<string> {
    const docRef = await addDoc(collection(db, 'chats'), {
        userId,
        title: firstMessage.substring(0, 40) || 'New Chat',
        createdAt: serverTimestamp()
    });
    return docRef.id;
}


export async function addMessage(chatId: string, message: Omit<Message, 'id'>) {
    if (!chatId) throw new Error('Chat ID is required');
    await addDoc(collection(db, `chats/${chatId}/messages`), {
        ...message,
        createdAt: serverTimestamp(),
    });
}


export {app, auth, googleProvider, db};
