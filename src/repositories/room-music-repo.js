import firebase from 'firebase';
import EventEmitter from 'events';

export default class extends EventEmitter {

  constructor(roomId) {
    super();
    this.roomId = roomId;
    this.roomRef = firebase.database().ref().child(`rooms/${roomId}`);
    this.attachFirebaseListeners();
  }

  attachFirebaseListeners() {
    this.roomRef.child('queue').on('child_added', this.onAddedSongToQueue, this);
  }

  detachFirebaseListeners() {
    this.roomRef.child('queue').off('child_added', this.onAddedSongToQueue, this);
  }

  onAddedSongToQueue(snap) {
    let song = this.addKeyToSnap(snap);
    this.emit('added', song);
  }

  // processes the snapshots to consistent note with key
  addKeyToSnap(snap) {
    return {
      value: snap.val(),
      key: snap.getKey()
    }
  }

  async addSongIdToQueue(id) {
    return new Promise((resolve, reject) => {
      return this.roomRef.child('queue')
        .push({
          id: id,
          votes: 1
        })
        .then((res) => {
          return resolve(res);
        }, (err) => {
          return reject(err);
        })
    });
  }

}