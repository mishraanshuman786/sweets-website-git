import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaLinkedinIn,
  FaPhoneAlt,
  FaAddressBook,
} from "react-icons/fa";
import { CgMail } from "react-icons/cg";
export default function Footer() {
  return (
    <div className="container-fluid">
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#761700" }}
      >
        <section
          className="d-flex justify-content-between p-4"
          style={{ backgroundColor: "rgb(68, 2, 2)" }}
        >
          <div className="me-5 h5">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="text-white me-4 h3">
              <FaFacebookF />
            </a>
            <a href="" className="text-white me-4 h3">
              <FaTwitter />
            </a>
            <a href="" className="text-white me-4 h3">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="text-white me-4 h3">
              <FaGoogle />
            </a>
            <a href="" className="text-white me-4 h3">
              <FaLinkedinIn />
            </a>
          </div>
        </section>

        <section style={{ backgroundColor: "#761700" }}>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold h5">About Company</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p className="h6">
                  We are selling sugar or without sugar laddu on your order. Yes! Our
                  Laddus are made with all natural Jaggery and Ghee. Keeping in
                  Mind the health of every person, we should deliver pure-hand
                  made Laddos.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold h5">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <a href="#!" className="text-white">
                    MDBootstrap
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    MDWordPress
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    BrandFlow
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Bootstrap Angular
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold h5">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <a href="#!" className="text-white">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Become an Affiliate
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Shipping Rates
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold h5">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p className="h6">
                  <FaAddressBook style={{fontSize:25}} /> S-28/56 R-9 Anula Mahadev Nagar Colony,
                  Varanasi
                </p>
                <p className="h6">
                  <i className="fas fa-envelope mr-3" style={{fontSize:25}}></i> FSSAI: 22723630000206
                </p>
                <p className="h6">
                  <FaPhoneAlt style={{fontSize:25}} /> 6307010388
                </p>
                <p className="h6">
                <CgMail style={{fontSize:25}} /> journywithabhipandit@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-3 h6"
          style={{ backgroundColor: "#761700" }}
        >
          © 2023 Copyright:
          <a className="text-white h6" href="#">
            Ladooshop.com
          </a>
        </div>
      </footer>
    </div>
  );
}
