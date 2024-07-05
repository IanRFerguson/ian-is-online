import '../App.css';
import '../App-mobile.css'
import Landing from './Landing.js';
import Engineering from './Engineering.js';
import Contact from './Contact.js';
import Footer from './Footer';

function MySite() {
  return (
    <div className="App">
      <Landing />
      <Engineering />
      <Contact />
      <Footer />
    </div>
  );
}

export default MySite;
