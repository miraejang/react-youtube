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

  savePlaylist = (uid, groupId, data) => {
    const url = groupId === 'WL' ? 'wishList' : `playlist/${groupId}`;
    set(ref(this.db, `users/${uid}/${url}`), data);
  };

  syncFeeds = (uid, onUpdate) => {
    const starCountRef = ref(this.db, `users/${uid}`);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      onUpdate(data);
    });
    return () => off();
  };
}

export default VideoRepository;
