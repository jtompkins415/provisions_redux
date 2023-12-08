import RetailStoreImage from '../../assets/retail-storefront.jpeg';
import './AboutPage.css';

function AboutPage(){
    return (
        <div id="about-main-container">
            <div id="about-image-container">
                <img src={RetailStoreImage} alt="storefront" id='storefront-image'/>
            </div>
            <div id="about-detail-container">
                <div id="about-title-container">
                    <h2 id="about-title">Welcome to Provisions...</h2>
                </div>
                <div id="about-text-container">
                    <p className="about-text">
                        Our journey begins with a passion for sourcing the finest ingredients and beverages, carefully curated to meet the discerning tastes of our customers. Whether you are a seasoned chef, a dedicated foodie, or someone exploring the world of flavors, Provisions is designed to be your go-to destination for exceptional quality and taste.
                    </p>
                    <p className="about-text">
                        What sets Provisions apart is our commitment to providing not just products, but a culinary journey. We believe that the story behind each ingredient and the craftsmanship that goes into creating our offerings enriches the overall experience. Our shelves are stocked with handpicked items that reflect our dedication to excellence, sustainability, and the celebration of diverse culinary traditions.
                    </p>
                    <p className="about-text">
                        Whether you are looking for the perfect pairing for a special occasion, seeking inspiration for your next culinary masterpiece, or simply treating yourself to the finest in gastronomy, Provisions is your trusted partner on this delectable journey. Join us as we celebrate the art of good food, the craftsmanship of beverages, and the joy of savoring all the flavorful moments. 
                    </p>
                    <p className='about-text'>
                        <b>Welcome to Provisions where every product tells a story, and every taste is an adventure.</b>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage