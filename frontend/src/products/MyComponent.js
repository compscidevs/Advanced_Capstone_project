import './MyComponent.css';
import {FaHome} from 'react-icons/fa';
const MyComponent = () => {
  return (
    <div className='All'>
      <div className='Logo'>
        <h3><FaHome/></h3> <h3 className='Home'>Home</h3>
  
      
      
      </div>
      <div className='Refreshment'>
        <h3>Refreshments</h3>
      </div>
      <div className='MinuteMaid'>
        <h3>Minute Maid</h3>
      </div>
    </div>
  );
};

export default MyComponent;