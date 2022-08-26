import React from 'react';
import logo from './logo.svg';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, getFirestore, orderBy, query } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBTLKgKdRzBx3QPQAKdK8w3i6HqVX1oHaU",
  authDomain: "novagon-forums.firebaseapp.com",
  projectId: "novagon-forums",
  storageBucket: "novagon-forums.appspot.com",
  messagingSenderId: "640912774902",
  appId: "a1:640912774902:web:5a74ae341e709df17c7ed7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className='h-screen bg-zinc-800'>
        <header>
            <h1>Novagon Forums</h1>
            <SignOut/>
        </header>
        <section>
          {user ? <Home></Home> : <LogIn></LogIn>}
        </section>
    </div>
  );
}
function LogIn() {
  const signInWithAsGuest = () => {
      signInAnonymously(auth).catch(alert);
  }
  return(
      <div>
      <button onClick={signInWithAsGuest}>Sign In Anonymously</button>
      <p>We Dont Collect ANY dat</p>
      </div>
  )
}
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function Home() {
  const PostRef = collection(db, 'main')
  const q = query(PostRef, orderBy('publishDate'))
  const [posts] = useCollectionData(q)

  return (<>
  <div>
    {posts && posts.map(post => <Post key={post.id} message={post} props={undefined}/>)}
  </div>

  <div>

  </div>
  </>)
}

interface IntProps{
  props: any;
  key: any;
  message: any;
}

function Post({props}: IntProps) {
  const { desc, title } = props.message;
  return (<>
    <div className={`post ${Math.random()}`} >
      <p>{title}</p>
      <p>{desc}</p>
    </div>
  </>)
}

export default App;