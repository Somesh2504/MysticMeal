
import logo from './logo3.jpg';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import textlogo from './logoMM.png';
function Header(){
    const navigate = useNavigate();
  function handleSearch(event){
    if(event.key === 'Enter'){
      //  console.log(event.target.value);
       navigate(`/DisheList/${event.target.value}`);
      }
  }
  return (
    <div>
      <header className="fixed-header">
                <div className="logo"><img src={logo} alt='logo' className='img1'></img><img src={textlogo} className='img2' alt='img2'></img></div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." onKeyDown={(event)=>{handleSearch(event)}}/>
                </div>
                <nav className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/">Categories</Link>
                    <Link to="/">Contact</Link>
                </nav>
            </header>
    </div>
  )
}

export default Header
