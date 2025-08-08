import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from "./Header.jsx"
import HeaderSpacer from "../../components/headerSpacer/headerSpacer.jsx"
import Carousel from "./Carousel.jsx"
import Donation from "./Donation.jsx"
import Contact from "./Contact.jsx"
import Footer from "../../components/Footer/Footer.jsx"
function Homepage() {

    const location = useLocation();
    useEffect(() => {
        if (location.state?.scrollTo) {
            const scrollTarget = location.state.scrollTo;
            setTimeout(() => {
                if (scrollTarget === 'contact') {
                    const contactSection = document.querySelector('#contact-section');
                    if (contactSection) {
                        contactSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } else if (scrollTarget === 'donate') {
                    const donateSection = document.querySelector('#donate-section');
                    if (donateSection) {
                        donateSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                        setTimeout(() => {
                            const donateButton = donateSection.querySelector('button');
                            if (donateButton) {
                                donateButton.click();
                            }
                        }, 1000);
                    }
                }
            }, 100);
            window.history.replaceState({}, document.title);
        }
    }, [location]);
    
    return (
        <>
            <Header></Header>
            <HeaderSpacer></HeaderSpacer>
            <Carousel></Carousel>
            <Donation></Donation>
            <Contact></Contact>
            <Footer></Footer>



        </>
    )
}
export default Homepage