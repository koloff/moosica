import firebase from 'firebase';


export default class UserStore {

  constructor() {
    this.state = {
      user: null
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.state.user = user;
      } else {
        (async() => {
          let user = await this.auth();
          this.state.user = user;
        })();
      }
    });

  }

  async auth() {
    return new Promise((resolve, reject) => {
      firebase.auth().signInAnonymously().then((user, error) => {
        if (error) {
          return reject(res);
        }
        console.log(firebase.auth().currentUser);

        return resolve(user);
      });
    })
  }


  initStateListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // let isAnonymous = user.isAnonymous;
        this.state.uid = user.uid;
      } else {
        // User is signed out.
      }
    });
  }
}