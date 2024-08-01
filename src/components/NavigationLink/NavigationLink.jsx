import { Link, useLocation } from 'react-router-dom';
import './NavigationLink.css';

const NavigationLink = ({ to, Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div>
      <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
        <Icon width={20} height={20} color ={isActive?'#0000FF':'#808080'} />
        <span className='nav-label'>{label}</span>
      </Link>
    </div>
  );
};

export default NavigationLink;
