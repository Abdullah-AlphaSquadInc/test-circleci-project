import { firestoreDb } from "../config/firebase";
import fire from "../config/firebase";


class Client{

    // uthenticate user
    userAuth = async (email, password, successCallback, errorCallback) => {

        fire.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            successCallback(user);
          })
          .catch((error) => {
            errorCallback(error);
          });

    }

    // create User
    createUserAuth = async (email, password, successCallback, errorCallback) => {

        fire.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            successCallback(userCredential.user);
        })
        .catch((error) => {
            errorCallback(error);
        });

    }

    // common method for getting records from firebase
    getRecords = async (collectionName, successCallback, errorCallback) => {
        
        firestoreDb
        .collection(collectionName).orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
            successCallback(querySnapshot);
        })
        .catch((err) => {
            errorCallback(err);
        });

    }

    // common method for setting records from firebase
    setRecords = async (collectionName, docName, data, successCallback, errorCallback) => {
        
        data['createdAt'] = new Date().getTime();

        firestoreDb
        .collection(collectionName)
        .doc()
        .set(data)
        .then((querySnapshot) => {
            successCallback(querySnapshot);
        })
        .catch((err) => {
            errorCallback(err);
        });

    }

    // common method for delete record from firebase
    deleteRecord = async (collectionName, docName, successCallback, errorCallback) => {
        
        firestoreDb
        .collection(collectionName)
        .doc(docName)
        .delete()
        .then((querySnapshot) => {
            successCallback(querySnapshot);
        })
        .catch((err) => {
            errorCallback(err);
        });

    }

    // common method for updating records from firebase
    updateRecords = async (collectionName, docName, data, successCallback, errorCallback) => {
        
        firestoreDb
        .collection(collectionName)
        .doc(docName)
        .update(data)
        .then((querySnapshot) => {
            successCallback(querySnapshot);
        })
        .catch((err) => {
            errorCallback(err);
        });

    }

}

const ApiClient = new Client();
export default ApiClient;
