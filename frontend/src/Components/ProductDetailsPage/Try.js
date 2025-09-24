import { useState } from "react";

import Ratings from "./Ratings";
import "./Try.css"
const Apple = () => {
  const [additionalInfoVisible, setAdditionalInfoVisible] = useState(true);
  const [vendorsVisible, setVendorsVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible]=useState(false)

  const [additionalInfoButtonColor, setAdditionalInfoButtonColor] = useState("#710193");
  const [vendorsButtonColor, setVendorsButtonColor] = useState("grey");
  const [reviewsButtonColor, setReviewsButtonColor] = useState("grey");



  const handleAdditionalInfoClick = () => {
    setAdditionalInfoVisible(true);
    setVendorsVisible(false);
    setReviewsVisible(false);
    setAdditionalInfoButtonColor("#710193");
    setVendorsButtonColor("grey");
    setReviewsButtonColor("grey")
  };

  const handleVendorsClick = () => {
    setVendorsVisible(true);
    setAdditionalInfoVisible(false);
    setReviewsVisible(false)
    setAdditionalInfoButtonColor("grey");
    setVendorsButtonColor("#710193");
    setReviewsButtonColor("grey")
  };
  const handleReviewsClick = () => {
    setReviewsVisible(true);
    setAdditionalInfoVisible(false);
    setVendorsVisible(false)
    setAdditionalInfoButtonColor("grey");
    setVendorsButtonColor("grey");
    setReviewsButtonColor("#710193")
  };

  return (
    <div className="Ptext">
      
      <button  className="Additional" type="button" onClick={handleAdditionalInfoClick} style={{ backgroundColor: additionalInfoButtonColor }}>Additional Info</button><button  className="Vendors" type="button" onClick={handleVendorsClick} style={{ backgroundColor: vendorsButtonColor }}>Vendors</button><button className="Vendors"type="button" onClick={handleReviewsClick} style={{ backgroundColor: reviewsButtonColor }}>Reviews</button>
      <div className="additionalInfo">
        <p id="additionalInfo" style={{ display: additionalInfoVisible ? 'block' : 'none' }} >
        <p className="a1">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </p>
            <p className="a1">Manufucturer: Apple</p>
            <p className="a1">Manufucture Date: 2019</p>
            <p className="a1">Manufucturer: Apple</p>
            <p className="a1">Manufucture Date: 2019</p>
            <p className="a1">Manufucturer: Apple</p>
            <p className="a1">Manufucture Date: 2019</p>
            <p className="a1">
              But I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, 
            </p>
        </p>
      </div>
      <div className="vendors">
        <p id="vendors" style={{ display: vendorsVisible ? 'block' : 'none' }}>
          <p className="a1">
            Exploring the diverse landscape of vendors offering our latest product, the XYZ Smartwatch, 
            unveils a rich tapestry of options for consumers seeking quality and reliability. With a variety of retailers and online platforms showcasing the XYZ Smartwatch, 
            finding the perfect match for your preferences has never been easier.
          </p>
          <p className="a1">
            From established brick-and-mortar stores to cutting-edge e-commerce platforms, the XYZ Smartwatch is readily
            available across a wide range of channels. Major retailers such as Tech Emporium, Gadget Haven, and Wearable 
            World proudly feature the XYZ Smartwatch on their shelves, providing customers with convenient access to this innovative wearable technology.
          </p>
          <p className="a1">
            In addition to traditional storefronts, online marketplaces like Amazon, eBay, and Alibaba offer a plethora of options for purchasing the XYZ Smartwatch from the comfort of your own home. With user-friendly interfaces, secure payment options, and fast shipping services, these platforms cater
           to the needs of modern consumers who prefer the convenience of online shopping.
          </p>
        </p>
      </div>
      <div className="reviews">
        <p id="reviews" style={{ display: reviewsVisible ? 'block' : 'none' }}>
          <p className="a1">
            Customer reviews for our latest product, the XYZ Smartwatch, have been pouring in, offering valuable insights into the user experience. With an average rating of 4.5 stars out of 5, the XYZ Smartwatch has garnered praise for its sleek design, intuitive interface, and advanced features.
            Positive feedback from users highlights the seamless integration with smartphones, long battery life, and accurate health tracking capabilities. Reviewers have also commended the XYZ Smartwatch for its durable build quality and comfortable fit, making it ideal for everyday use.
          </p>
          <p className="a1">
            However, some users have raised concerns about the limited app selection and occasional connectivity issues with certain devices. While these criticisms are noted, many reviewers appreciate the continuous 
            software updates provided by the manufacturer to address such issues.
            Overall, the reviews paint a picture of a versatile and reliable smartwatch that delivers on its promises. With its stylish design, impressive performance, and positive user feedback, the XYZ Smartwatch emerges as a top contender in the wearable technology market. Whether you're a fitness enthusiast, a tech-savvy professional, or someone looking to stay connected on the go, the XYZ Smartwatch offers a compelling choice for your needs."
            This dummy text provides a balanced overview of the reviews, highlighting both the positive aspects and areas for improvement of the XYZ Smartwatch based on user feedback.
          </p>
          <p className="a1">Rate the product <Ratings/>
            <input type="text" className="textbox_name" placeholder="Please leave a comment"></input>
          </p> 
        </p>
      </div>
    </div>
  );
};

export default Apple;

  
  