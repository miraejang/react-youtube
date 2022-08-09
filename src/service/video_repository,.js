import { getDatabase, off, onValue, ref, set } from 'firebase/database';

class VideoRepository {
  constructor() {
    this.db = getDatabase();
  }

  syncVideo(uid, onUpdate) {
    const starCountRef = ref(this.db, `users/${uid}/history`);
    onValue(starCountRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        data && onUpdate(data);
      } else {
        snapshot.exists();
      }
    });
    return () => off();
  }

  saveVideo = (uid, data) => {
    const date = new Date()
      .toLocaleDateString()
      .split(' ')
      .map(num => `${parseInt(num)}`.padStart(2, '0'))
      .join('');

    set(ref(this.db, `users/${uid}/history/${date}`), data);
  };
}

export default VideoRepository;
