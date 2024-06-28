import '../App.css';
import Landing from './Landing.js';
import About from './About.js';
import Engineering from './Engineering.js';
import Contact from './Contact.js';

function App() {
  return (
    <div className="App">
      <Landing />
      {/* <About /> */}
      <Engineering />
      <Contact />
    </div>
  );
}

export default App;
