import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
//import { ToastContainer} from 'react-toastify';




export const Home = () => {
  
  useEffect(() => { window.scrollTo(0, 0) 
  }
  , []);
  


  return (
    <>
  {/* 
    - #HEADER
  */}
  <Header />
  {/* 
    - #ASIDE
  */}
  
  {/* 
    - #FOOTER
  */}
<Footer/>
  {/* 
    - #BACK TO TOP
  */}
  <a
    href="#top"
    className="back-to-top"
    aria-label="Back to Top"
    data-back-top-btn=""
  >
    {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-chevrons-up" /> */}
  <i className="fa-solid fa-chevrons-up"/>
  {/* <ion-icon name="arrow-up-outline" /> */}
  </a>
  {/* 
    - custom js link
  */}
  {/* 
    - ionicon link
  */}


</>

  )
}
