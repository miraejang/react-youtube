import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

class AuthService {
  constructor() {
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();
  }

  login = () => signInWithPopup(this.auth, this.provider);

  logout = () => signOut(this.auth);

  onAuthChange = onUserChanged => onAuthStateChanged(this.auth, onUserChanged);

  persistence = () => setPersistence(this.auth, browserLocalPersistence);
}

export default AuthService;
