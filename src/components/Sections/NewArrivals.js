import React from 'react'
import SectionHeading from './SectionHeading/SectionHeading'
import Card from '../Card/Card'
import Jeans from '../../assets/img/jeans.jpg'
import Shirts from '../../assets/img/shirts.jpg'
import Tshirt from '../../assets/img/tshirts.jpeg'
import dresses from '../../assets/img/dresses.jpg'
import Carousel from 'react-multi-carousel';
import { responsive } from '../../utils/Section.constants'
import './NewArrivals.css';

const items = [{
    'title':'Jeans',
    imagePath:Jeans
},
{
   'title':'Shirts',
    imagePath:Shirts
},
{
    'title':'T-shirts',
    imagePath:Tshirt
},
{
    'title':'Dresses',
    imagePath:dresses
},
{
    'title':'Jogeers',
    imagePath:require('../../assets/img/joggers.jpg')
},
{
    'title':'Kurtis',
    imagePath:require('../../assets/img/kurtis.jpg')
}
];

const NewArrivals = () => {
  return (
    <>
    <SectionHeading title={'New Arrivals'}/>
    <Carousel
      
      responsive={responsive}
      infinite={false}
      autoPlay={false}
      swipeable={true}
      draggable={false}
      showDots={false}
      partialVisbile={false}
      itemClass={'react-slider-custom-item'}
      className='px-2'
      >
        {items && items?.map((item,index)=> <Card key={items?.title +index} title={item.title} imagePath={item.imagePath}/>)}
    </Carousel>
    </>
  )
}
export default NewArrivals
