import React from 'react';
import type { FC } from 'react'
import { Navbar as NavbarBoostrap, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { StyledContainer } from './Navbar.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faHeart, faSearch, faBell } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@apollo/client';
import { userQuery } from '../../apollo/user/query'
import { setUserVar } from '../../apollo/cache';
import { useRouter } from 'next/router'
import Link from 'next/link'


const Navbar: FC = () => {
  const router = useRouter()
  const { data: { user }} = useQuery(userQuery);

  const logout = (): void => {
    setUserVar({});
    router.push('/connexion');
  }
  
  return (
    <StyledContainer>
      <NavbarBoostrap bg="dark" variant="dark" expand="lg">
        <Container>
          <Link href="/"><a className="navbar-brand">Leboncoin</a></Link>
          <NavbarBoostrap.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBoostrap.Collapse id="basic-navbar-nav">
            <Nav>
              <div>
                <Button className="add-btn">Déposer une annonce</Button>
              </div>
              <div className="second-column">
                <Link href="#"><a className="nav-link"><FontAwesomeIcon icon={faSearch} />&nbsp;Rechercher</a></Link> 
                <Link href="#"><a className="nav-link"><FontAwesomeIcon icon={faBell} />&nbsp;Mes recherches</a></Link>
                <Link href="#"><a className="nav-link"><FontAwesomeIcon icon={faHeart} />&nbsp;Favoris</a></Link>
                <Link href="/messages"><a className="nav-link"><FontAwesomeIcon icon={faEnvelope} />&nbsp;Messages</a></Link>
                {user?.nickname ?
                  (
                    <NavDropdown title={user.nickname} id="navbarScrollingDropdown">
                      <NavDropdown.ItemText onClick={logout}>deconnexion</NavDropdown.ItemText>
                    </NavDropdown>
                  ) : (
                    <Link href="connexion"><a className="nav-link"><FontAwesomeIcon icon={faUser} />&nbsp;connexion</a></Link>
                  )
                }
              </div>
            </Nav>
          </NavbarBoostrap.Collapse>
        </Container>
      </NavbarBoostrap>
    </StyledContainer>
  )
}

export { Navbar };

