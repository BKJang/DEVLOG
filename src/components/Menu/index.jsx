import React from 'react'
import { Link } from 'gatsby'
import './style.scss'

class Menu extends React.Component {

  render() {
    const menu = this.props.data

    const menuBlock = (
      <ul className="menu__list">
        {menu.map(item => (
          item.subItem ? (
            <li className="menu__list-item" key={item.path}>
              <Link
                to={item.path}
                className="menu__list-item-link"
                activeClassName="menu__list-item-link menu__list-item-link--active"
              >
                {item.label}
              </Link>
              <ul className="sub_menu__list">
                {item.subItem.map(subItem => (
                  <li className="sub_menu__list-item" key={subItem.path} >
                  <Link
                    to={subItem.path}
                    className="sub_menu__list-item-link"
                    activeClassName="sub_menu__list-item-link sub_menu__list-item-link--active"
                  >
                    {subItem.label}
                  </Link>
                </li>
                ))}
              </ul>
            </li>
          ) : (
              <li className="menu__list-item" key={item.path}>
                <Link
                  to={item.path}
                  className="menu__list-item-link"
                  activeClassName="menu__list-item-link menu__list-item-link--active"
                >
                  {item.label}
                </Link>
              </li>
            )
        ))
        }
      </ul>
    )

    return <nav className="menu">{menuBlock}</nav>
  }
}

export default Menu
