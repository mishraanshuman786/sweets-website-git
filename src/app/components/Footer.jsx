import { FaFacebookF,  FaTwitter,FaGoogle, FaLinkedinIn, FaPhoneAlt,FaAddressBook } from "react-icons/fa";
export default function Footer(){
    return (
    <div className="container-fluid">

  
  <footer
          className="text-center text-lg-start container-fluid text-white"
          style={{backgroundColor:"#1c2331"}}
          >
   
    <section
             className="d-flex justify-content-between p-4"
             style={{backgroundColor: "#6351ce"}}
             >
      
      <div className="me-5 h4">
        <span>Get connected with us on social networks:</span>
      </div>
     

      
      <div>
        <a href="" className="text-white me-4 h2">
        <FaFacebookF />
        </a>
        <a href="" className="text-white me-4 h2">
        <FaTwitter />
        </a>
        <a href="" className="text-white me-4 h2">
          <i className="fab fa-google"></i>
        </a>
        <a href="" className="text-white me-4 h2">
        <FaGoogle />
        </a>
        <a href="" className="text-white me-4 h2">
        <FaLinkedinIn />
        </a>
        
        
      </div>
      
    </section>
    

    
    <section className="">
      <div className="container text-center text-md-start mt-5">
       
        <div className="row mt-3">
        
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
           
            <h6 className="text-uppercase fw-bold h4">About Company</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: 60, backgroundColor: "#7c4dff", height: 2}}
                />
            <p className="h5">
              We are sell sugaror without sugar laddu on your order Yes! Our Laddus are made with all natural Jaggery and Ghee. Keeping in Mind the health of every person, we should deliver pure-hand made Laddos.
            </p>
          </div>
         

          
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
           
            <h6 className="text-uppercase fw-bold h4">Products</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: 60, backgroundColor: "#7c4dff", height: 2}}
                />
            <p>
              <a href="#!" className="text-white">MDBootstrap</a>
            </p>
            <p>
              <a href="#!" className="text-white">MDWordPress</a>
            </p>
            <p>
              <a href="#!" className="text-white">BrandFlow</a>
            </p>
            <p>
              <a href="#!" className="text-white">Bootstrap Angular</a>
            </p>
          </div>
         

        
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            
            <h6 className="text-uppercase fw-bold h4">Useful links</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: 60, backgroundColor: "#7c4dff", height: 2}}
                />
            <p>
              <a href="#!" className="text-white">Your Account</a>
            </p>
            <p>
              <a href="#!" className="text-white">Become an Affiliate</a>
            </p>
            <p>
              <a href="#!" className="text-white">Shipping Rates</a>
            </p>
            <p>
              <a href="#!" className="text-white">Help</a>
            </p>
          </div>
        
         
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
           
            <h6 className="text-uppercase fw-bold h4">Contact</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: 60, backgroundColor: "#7c4dff", height: 2}}
                />
            <p className="h5"><FaAddressBook /> S-28/56 R-9 Anula Mahadev Nagar Colony, Varanasi</p>
            <p className="h5"><i className="fas fa-envelope mr-3"></i> FSSAI: 22723630000206</p>
            <p className="h5"><FaPhoneAlt /> 6307010388</p>
           
          </div>
         
        </div>
       
      </div>
    </section>
  

   
    <div
         className="text-center p-3 h5"
         style={{backgroundColor:" rgba(0, 0, 0, 0.2)"}}
         >
      © 2023 Copyright:
      <a className="text-white h5" href="#"
         >Ladooshop.com</a
        >
    </div>
    
  </footer>
 

</div>

    )
}