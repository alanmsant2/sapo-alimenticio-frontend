import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './header.css';
import sapo from "../../assets/images/frog-cartoon-logo2.png"
import SettingsIcon from '@material-ui/icons/Settings';
import { Tooltip } from '@material-ui/core';

class Header extends Component {
    render(){
        return(
            <header id="main-header">
                <div className="header-content">
    
                    <Link to="/" className="header-home">
                        <img src={sapo} alt="logo" height="98px" />
                        <div className="linha-vertical"></div>
                        Home
                    </Link>
    
                    <div className="header-menu">
                        <NavLink to="/proteinas" activeClassName="menu-ativo">Proteínas</NavLink>
                        <NavLink to="/carboidratos" activeClassName="menu-ativo">Carboidratos</NavLink>
                        <NavLink to="/gorduras" activeClassName="menu-ativo">Gorduras</NavLink>
                        <Tooltip title="Ferramentas" aria-label="Upload">
                            <NavLink to="/ferramentas" activeClassName="menu-ativo"><SettingsIcon fontSize="large"/> </NavLink>
                        </Tooltip>

                    </div>
                    
                </div>
            </header>
        );
    }
    
}


export default Header;