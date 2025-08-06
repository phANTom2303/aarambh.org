import React from "react";
import styles from "./Contact.module.css";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Hash,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section className={styles.section}>
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
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <Mail className={styles.titleIcon} />
                    Email
                  </h4>
                  <p>info@ngoorganization.org</p>
                  <p>support@ngoorganization.org</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <Phone className={styles.titleIcon} />
                    Phone
                  </h4>
                  <p>+1 (555) 123-4567</p>
                  <p>+1 (555) 765-4321</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <MapPin className={styles.titleIcon} />
                    Address
                  </h4>
                  <p>
                    123 Hope Street<br />
                    Community Center, Suite 456<br />
                    Cityville, State 12345<br />
                    India
                  </p>
                </div>
              </div>
              <div className={styles.infoItem}>
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
              </div>
            </div>
          </div>

          {/* Donation Info */}
          <div className={styles.cardAlt}>
            <h3 className={styles.cardTitle}>
              <CreditCard className={styles.icon} />
              Donation Details
            </h3>
            <div className={styles.infoGroup}>
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <CreditCard className={styles.titleIcon} />
                    Bank Name
                  </h4>
                  <p>Welfare Bank</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <Hash className={styles.titleIcon} />
                    Account Number
                  </h4>
                  <p>1234567890</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div>
                  <h4>
                    <Hash className={styles.titleIcon} />
                    IFSC Code
                  </h4>
                  <p>CWBK0123456</p>
                </div>
              </div>
              <div className={styles.infoNote}>
                <p>All donations are securely processed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
