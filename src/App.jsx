import './App.css'
import TranslateForm from './TranslateForm'
import logo from './img/logo.svg'

function App() {


  return (
    <main>
      <div className='title'>
          <img src={logo} alt="logo" />
      </div>
     <TranslateForm/>
    </main>
  )
}

export default App
