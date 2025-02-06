import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand d-flex align-items-center" href="#">
      <img src="logo.jpeg" alt="Vamika Store" class="me-2" />
        <span class="fw-bold">Vamika Store</span>
        </a>

      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ms-auto">
        
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarMenDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Men
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarMenDropdown">
                  <li><a class="dropdown-item" href="#">T-Shirts</a></li>
                  <li><a class="dropdown-item" href="#">Shirts</a></li>
                  <li><a class="dropdown-item" href="#">Jeans</a></li>
                  <li><a class="dropdown-item" href="#">Accessories</a></li>
              </ul>
          </li>

        
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarWomenDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Women
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarWomenDropdown">
                  <li><a class="dropdown-item" href="#">Dresses</a></li>
                  <li><a class="dropdown-item" href="#">Tops</a></li>
                  <li><a class="dropdown-item" href="#">Skirts</a></li>
                  <li><a class="dropdown-item" href="#">Jewelry</a></li>
              </ul>
          </li>

          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarKidsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Kids
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarKidsDropdown">
                  <li><a class="dropdown-item" href="#">T-Shirts</a></li>
                  <li><a class="dropdown-item" href="#">Shorts</a></li>
                  <li><a class="dropdown-item" href="#">Dresses</a></li>
                  <li><a class="dropdown-item" href="#">Toys</a></li>
              </ul>
          </li>

                {/*-- Search Bar --*/}
                <li class="nav-item ms-3">
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                </li>


      </ul>
  </div>
  
  </nav>
  );
}

export default Navbar;
