import React from "react";
import styles from "./Contact.module.css";
import {
  Mail,
  Phone,
  MapPin,
  Building,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section id = "contact-section" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.subtitle}>
            Reach out to us for any inquiries or to support our mission through donations.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {/* Contact Info */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Mail className={styles.icon} />
              Contact Information
            </h3>
            <div className={styles.infoGroup}>
              {/*
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <Mail className={styles.titleIcon} />
                    Email
                  </h4>
                  <p>Will be updated soon</p>
                </div>
              </div>*/}
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <Phone className={styles.titleIcon} />
                    Phone
                  </h4>
                  <p> +91 9830769658 </p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <MapPin className={styles.titleIcon} />
                    Address
                  </h4>
                  <p>
                    238 Gopal Lal Thakur Road, <br/>
                    Samta Apartment, <br/>
                    Block A- Flat no 405 <br/>
                    Neaogipara, <br/>
                    Kolkata 700036 <br/>
                  </p>
                </div>
              </div>
              {/*<div className={styles.infoItem}>
                <div>
                  <h4>
                    <Building className={styles.titleIcon} />
                    Office Hours
                  </h4>
                  <p>
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>*/}
            </div>
          </div>

          {/* Location Map */}
          <div className={styles.cardAlt}>
            <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.3392589582154!2d88.37041487385221!3d22.64113623045768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89dbca409fa43%3A0x538e2af518bf0f9e!2sSamta%20Apartment!5e0!3m2!1sen!2sin!4v1754500262599!5m2!1sen!2sin" target="_blank" rel="noopener noreferrer">
              <h3 className={styles.cardTitle}>
                <MapPin className={styles.icon} />
                Our Location
              </h3>
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.47352327798!2d88.3582496150242!3d22.61053188514936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027786f7b11c75%3A0xc3f60f61a1a2e3f!2sSamta%20Apartment!5e0!3m2!1sen!2sin!4v1625078519782!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location on Google Maps"
                ></iframe>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;