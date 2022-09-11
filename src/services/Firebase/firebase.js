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
  apiKey: 'AIzaSyAzdUlgahDfzJVxgNNujpQe7d9rxj2sK-Y',
  authDomain: 'evi-books-app.firebaseapp.com',
  projectId: 'evi-books-app',
  storageBucket: 'evi-books-app.appspot.com',
  messagingSenderId: '669973242177',
  appId: '1:669973242177:web:5c16211f9d156f71e701c0',
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
    getDoc(doc(db, 'data', 'd2WFRpvi1z3fQVgmQX3j'))
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
