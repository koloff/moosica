import firebase from 'firebase';
import EventEmitter from 'events';
import rootStore from '../store';

export default class extends EventEmitter {

  constructor(roomId) {
    super();
    this.roomId = roomId;
    this.roomRef = firebase.database().ref().child(`rooms/${roomId}`);
    this.attachFirebaseListeners();
  }

  attachFirebaseListeners() {
    // this.roomRef.child('queue').on('child_added', this.onAddedSongToQueue, this);
    this.roomRef.child('queue').on('value', this.onChangedList, this);
  }

  onChangedList(snap) {
    this.emit('changed-list', snap.val())
  }


  // detachFirebaseListeners() {
  //   this.roomRef.child('queue').off('child_added', this.onAddedSongToQueue, this);
  // }

  // onAddedSongToQueue(snap) {
  //   // let song = this.addKeyToSnap(snap);
  //   this.emit('added-song', snap);
  // }

  // processes the snapshots to consistent note with key
  // addKeyToSnap(snap) {
  //   return {
  //     value: snap.val(),
  //     key: snap.getKey()
  //   }
  // }

  async addSongIdToQueue(video) {
    return new Promise((resolve, reject) => {
      return this.roomRef.child('queue')
        .push({
          id: video.id,
          title: video.title,
          votes: {
            [rootStore.userStore.state.user.uid]: true
          }
        })
        .then((res) => {
          return resolve(res);
        }, (err) => {
          return reject(err);
        })
    });
  }

  async upvoteVideo(videoKey, userId) {
    return new Promise((resolve, reject) => {


      this.roomRef.child(`queue/${videoKey}/votes/${userId}`)
        .once('value', function(snap) {
          if (snap.val()) {
           return reject('ALREADY_VOTED')
          }
        });

      return this.roomRef.child(`queue/${videoKey}/votes/${userId}`)
        .set(true)
        .then((res) => {
          return resolve(res);
        }, (err) => {
          return reject(err);
        })
    });
  }

  async removeVideoFromList(videoKey) {
    return new Promise((resolve, reject) => {
      return this.roomRef.child(`queue/${videoKey}`)
        .set(null)
        .then((res) => {
          return resolve(res);
        }, (err) => {
          return reject(err);
        })
    });
  }

}