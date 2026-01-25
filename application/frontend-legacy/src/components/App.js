import '../App.css';
import '../App-mobile.css'
import Landing from './Landing.js';
import About from './About.js';
import Engineering from './Engineering.js';
import Contact from './Contact.js';
import Footer from './Footer.js';

function IanIsOnline() {
  return (
    <div className="App">
      <Landing />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default IanIsOnline;
