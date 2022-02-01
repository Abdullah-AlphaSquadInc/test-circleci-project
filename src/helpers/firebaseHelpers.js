import ApiClient from '../services/api-client';
import RESPONSE from "../services/HttpResponse";

import fire from '../config/firebase';

class firebaseHelpers{

    signIn = (email, password, callback) => {

        ApiClient.userAuth(email, password, (user) => {

            callback(RESPONSE(true, "", user));

        }, (err) => {

            callback(RESPONSE(false, err.message, err.code));

        });

    }

    signUp = (email, password, callback) => {

        ApiClient.createUserAuth(email, password, (user) => {

            callback(RESPONSE(true, "", user));

        }, (err) => {

            callback(RESPONSE(false, err.message, err.code));

        });

    }

    // for getting records according to collection
    getRecordsWithCollection = (collectionName, callback) => {
        let results = [];

        ApiClient.getRecords(collectionName, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            callback(RESPONSE(true, "", results));

        }, (err) => {

            callback(RESPONSE(false, "Data not found", []));

        });

    };

    // for setting records according to collection
    setRecordsWithCollection = (collectionName, docName, data, callback) => {

        ApiClient.setRecords(collectionName, docName, data, (querySnapshot) => {

            callback(true);

        }, (err) => {

            callback(false);

        });

    }

    // for setting records according to collection
    updateRecordsWithCollection = (collectionName, docName, data, callback) => {

        ApiClient.updateRecords(collectionName, docName, data, (querySnapshot) => {

            callback(true);

        }, (err) => {

            callback(false);

        });

    }

    // for delete records according to collection
    deleteRecordsWithCollection = (collectionName, docName, callback) => {

        ApiClient.deleteRecord(collectionName, docName, (querySnapshot) => {

            callback(true);

        }, (err) => {

            callback(false);

        });

    }


    changePassword = (currentPassword, newPassword, callback) => {

        var { currentUser } = fire.auth();

        currentUser.updatePassword(newPassword).then(() => {

            callback(true);

        }).catch((error) => {

            callback(false);

        });

    };

}

const firebase = new firebaseHelpers();
export default firebase;
