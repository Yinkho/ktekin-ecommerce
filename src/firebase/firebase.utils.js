import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCLW_5cVrgWR3n1u9tgpZ5ydSFv731tZ5A",
    authDomain: "ecommerce-3ab4b.firebaseapp.com",
    databaseURL: "https://ecommerce-3ab4b.firebaseio.com",
    projectId: "ecommerce-3ab4b",
    storageBucket: "ecommerce-3ab4b.appspot.com",
    messagingSenderId: "484009856919",
    appId: "1:484009856919:web:fa3cce92df73e3a32f3ed2",
    measurementId: "G-4SKZ6C30SE"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    
    const snapShot = await userRef.get()

    if(!snapShot.exist) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
        const { title, items } = docSnapshot.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
