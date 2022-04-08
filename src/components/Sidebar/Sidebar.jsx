import { NavLink } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';

import './Sidebar.scss';

const Sidebar = ({ list }) => {
  return (
    <aside className="app__sidebar">
      <ul className="app__sidebar-list">
        {list.map(({ title, Icon, link }, idx) => (
          <li key={title + idx}>
            <NavLink
              to={link}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <div className="app__sidebar-list-content">
                <Icon fontSize={16} />
                <span>{title}</span>
              </div>
              <BsChevronRight fontSize={14} />
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
