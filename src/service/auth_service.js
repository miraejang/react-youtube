import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

class AuthService {
  constructor() {
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();
  }

  login = () => signInWithPopup(this.auth, this.provider);

  logout = () => signOut(this.auth);
}

export default AuthService;
