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

  syncPlaylist(uid, onUpdate) {
    const starCountRef = ref(this.db, `users/${uid}/playlist`);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      onUpdate(data);
    });
    return () => off();
  }

  savePlaylist = (uid, listId, data) => {
    set(ref(this.db, `users/${uid}/playlist/${listId}`), data);
  };
}

export default VideoRepository;
