import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Messenger from './components/Messenger';
import AccountProvider from './context/AccountProvider';
// import Landing from './Landing/Landing';

function App() {


  const clientId = "990428215593-769j6n3eld2p95s93ht3g95o2p4vod1j.apps.googleusercontent.com";


  return (
    <div className="App">
      < GoogleOAuthProvider clientId={clientId}>
        <AccountProvider>
          <Messenger />    {/* account provider ke andar messenger humne as a children pass kara diya */}
        </AccountProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
