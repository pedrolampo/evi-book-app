import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDM1Blc_E-xSmbnPlmmkyHHjt3bGHB97Gc',
  authDomain: 'evi-book-app.firebaseapp.com',
  projectId: 'evi-book-app',
  storageBucket: 'evi-book-app.appspot.com',
  messagingSenderId: '473302861736',
  appId: '1:473302861736:web:46e6fc5cb5c9118dd43f9d',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const getBooks = (key, op, value) => {
  return new Promise((res, rej) => {
    const collectionQuery =
      key && op && value
        ? query(collection(db, 'books'), where('genre', '==', value))
        : collection(db, 'books');

    getDocs(collectionQuery)
      .then((querySnapshot) => {
        const books = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res(books);
      })
      .catch((err) => {
        rej(`Error al obtener las recetas: ${err}`);
      });
  });
};

export const searchRecipes = (key, op, value) => {
  return new Promise((res, rej) => {
    const collectionQuery =
      key && op && value
        ? query(
            collection(db, 'recipes'),
            where('title', '>=', value),
            where('title', '<=', value)
          )
        : collection(db, 'recipes');

    getDocs(collectionQuery)
      .then((querySnapshot) => {
        const recipes = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res(recipes);
      })
      .catch((err) => {
        rej(`Error al obtener las recetas: ${err}`);
      });
  });
};

export const getSingleRecipe = (value) => {
  return new Promise((res, rej) => {
    getDoc(doc(db, 'recipes', value))
      .then((querySnapshot) => {
        const product = {
          id: querySnapshot.id,
          ...querySnapshot.data(),
        };
        res(product);
      })
      .catch((err) => {
        rej(`Error al obtener el producto: ${err}`);
      });
  });
};

export const getPass = () => {
  return new Promise((res, rej) => {
    getDoc(doc(db, 'data', 'kTu0nERfmuZ5S0NgoOiV'))
      .then((querySnapshot) => {
        res(querySnapshot.data().pass);
      })
      .catch((err) => {
        rej(`error al obtener los datos: ${err}`);
      });
  });
};

export const pushRecipe = () => {
  setDoc(doc(db, 'recipes', { title: 'Torta Negra', category: 'dulce' }));
};
