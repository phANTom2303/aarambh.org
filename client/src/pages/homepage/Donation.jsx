import React, { useState } from 'react';
import {GraduationCap, Heart, UserCircle,Smile,ArrowRight,HandHeart,ArrowLeft,Copy,Check,Building2,CreditCard,Hash,User,Phone, MessageCircle,Users,} from 'lucide-react';

import styles from './Donation.module.css';

const DonationCTA = () => {
  const [showBankInfo, setShowBankInfo] = useState(false); //bank details
  const [showVolunteerInfo, setShowVolunteerInfo] = useState(false); //volunteer section
  const [copiedField, setCopiedField] = useState(''); //content copied to clipboard

  const impactAreas = [
    {
      icon: GraduationCap,
      title: 'Aid to Education',
      color: 'blue',
    },
    {
      icon: Heart,
      title: 'Health Care',
      color: 'red',
    },
    {
      icon: UserCircle,
      title: 'Homage to Age',
      color: 'purple',
    },
    {
      icon: Smile,
      title: 'Love to Laugh',
      color: 'orange',
    },
  ];

  const bankDetails = [
    {
      icon: User,
      label: 'Account Holder Name',
      value: 'BARANAGAR AARAMBH WOMENS FOUNDATION',
      field: 'accountName'
    },
    {
      icon: Hash,
      label: 'Account Number',
      value: '10230009178853',
      field: 'accountNumber'
    },
    {
      icon: Building2,
      label: 'Bank Name',
      value: 'Bandhan Bank',
      field: 'bankName'
    },
    {
      icon: CreditCard,
      label: 'IFSC Code',
      value: 'BDBL0001130',
      field: 'ifscCode'
    }
  ];

  //Tracks which field was copied using setCopiedField
  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    }
  };

  const handleDonateClick = () => {
    setShowBankInfo(true);
    setShowVolunteerInfo(false);
  };

  const handleVolunteerClick = () => {
    setShowVolunteerInfo(true);
    setShowBankInfo(false);
  };

  const handleBackClick = () => {
    setShowBankInfo(false);
    setShowVolunteerInfo(false);
  };

  return (
    <section id="donate-section" className={styles.donationSection}>
      <div className={styles.donationContainer}>
        {/* Main Landscape Layout */}
        <div className={styles.donationCard}>
          <div className={styles.donationGrid}>
            {/* Left Section - Impact & Story */}
            <div className={styles.donationContent}>
              <div className={styles.contentWrapper}>
                <div className={styles.headerSection}>
                  <div className={styles.iconWrapper}>
                    <HandHeart className={styles.headerIcon} />
                  </div>
                  <h2 className={styles.mainTitle}>
                    Be the Change Someone Needs
                  </h2>
                </div>

                <p className={styles.description}>
                  Every step with AARAMBH is a leap toward a better tomorrow. Whether it's Aid to Education, Health Care, Homage to Age, or simply spreading Love through Laughter — your support uplifts lives, nurtures hope, and builds a future full of dignity and joy.
                </p>

                {/* Impact Areas - Horizontal */}
                <div className={styles.impactGrid}>
                  {impactAreas.map((area, index) => {
                    const IconComponent = area.icon;
                    return (
                      <div key={index} className={styles.impactCard}>
                        <IconComponent className={styles.impactIcon} />
                        <p className={styles.impactTitle}>{area.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Section - Call to Action, Bank Info, or Volunteer Info */}
            <div className={styles.donationCta}>
              {!showBankInfo && !showVolunteerInfo ? (
                <>
                  {/* Original CTA Content */}
                  <div className={styles.ctaHeader}>
                    <div className={styles.ctaIconWrapper}>
                      <Heart className={styles.ctaHeartIcon} />
                    </div>
                    <h3 className={styles.ctaTitle}>Ready to Make a Difference?</h3>
                    <p className={styles.ctaDescription}>
                      Join us in building a healthier, more equitable world for everyone.
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <div className={styles.ctaButtons}>
                    <button onClick={handleDonateClick} className={styles.donateButton}>
                      <Heart className={styles.buttonHeartIcon} />
                      <span>Donate Now</span>
                      <ArrowRight className={styles.buttonArrowIcon} />
                    </button>

                    {/*<p className={styles.securityText}>
                      🔒 Secure • Tax Deductible • Instant Receipt
                    </p>*/}
                  </div>

                  {/* Secondary Actions */}
                  <div className={styles.secondaryActions}>
                    {/*<p className={styles.secondaryTitle}>Other ways to help</p>*/}
                    <div className={styles.secondaryButtons}>
                      <button onClick={handleVolunteerClick} className={styles.volunteerButton}>
                        🤝 Volunteer With Us
                      </button>
                      {/*<button className={styles.awarenessButton}>
                        📢 Spread Awareness
                      </button>*/}
                    </div>
                  </div>
                </>
              
              ) : showBankInfo ? (
                <>
                  {/* Bank Information Content */}
                  <div className={styles.bankHeader}>
                    <div className={styles.bankIconWrapper}>
                      <Building2 className={styles.bankIcon} />
                    </div>
                    <h3 className={styles.bankTitle}>Bank Transfer Details</h3>
                    <p className={styles.bankDescription}>
                      Use these details for direct bank transfer
                    </p>
                  </div>

                  {/* Bank Details */}
                  <div className={styles.bankDetailsContainer}>
                    {bankDetails.map((detail, index) => {
                      const IconComponent = detail.icon;
                      const isCopied = copiedField === detail.field;
                      
                      return (
                        <div key={index} className={styles.bankDetailCard}>
                          <div className={styles.bankDetailHeader}>
                            <IconComponent className={styles.bankDetailIcon} />
                            <span className={styles.bankDetailLabel}>
                              {detail.label}
                            </span>
                          </div>
                          <div className={styles.bankDetailContent}>
                            <span className={styles.bankDetailValue}>
                              {detail.value}
                            </span>
                            <button
                              onClick={() => copyToClipboard(detail.value, detail.field)}
                              className={`${styles.copyButton} ${isCopied ? styles.copiedButton : ''}`}
                            >
                              {isCopied ? <Check className={styles.copyIcon} /> : <Copy className={styles.copyIcon} />}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Back Button */}
                  <button onClick={handleBackClick} className={styles.backButton}>
                    <ArrowLeft className={styles.backIcon} />
                    <span>Back to Options</span>
                  </button>

                  <p className={styles.bankFooterText}>
                    💡 After transfer, please share the transaction receipt with us
                  </p>
                </>
              ) : showVolunteerInfo ? (
                <>
                  {/* Volunteer Information Content */}
                  <div className={styles.volunteerHeader}>
                    <div className={styles.volunteerIconWrapper}>
                      <Users className={styles.volunteerIcon} />
                    </div>
                    <h3 className={styles.volunteerTitle}>Join Our Mission</h3>
                    <p className={styles.volunteerDescription}>
                      Ready to make a hands-on difference in your community?
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className={styles.contactContainer}>
                    <div className={styles.contactCard}>
                      <div className={styles.contactHeader}>
                        <MessageCircle className={styles.contactIcon} />
                        <span className={styles.contactLabel}>WhatsApp/Message</span>
                      </div>
                      <div className={styles.contactContent}>
                        <span className={styles.contactValue}>+91 9830769658</span>
                        <button
                          onClick={() => copyToClipboard('+91 9830769658', 'whatsapp')}
                          className={`${styles.copyButton} ${copiedField === 'whatsapp' ? styles.copiedButton : ''}`}
                        >
                          {copiedField === 'whatsapp' ? <Check className={styles.copyIcon} /> : <Copy className={styles.copyIcon} />}
                        </button>
                      </div>
                    </div>

                    <div className={styles.contactCard}>
                      <div className={styles.contactHeader}>
                        <Phone className={styles.contactIcon} />
                        <span className={styles.contactLabel}>Call Us</span>
                      </div>
                      <div className={styles.contactContent}>
                        <span className={styles.contactValue}>+91 9830769658</span>
                        <button
                          onClick={() => copyToClipboard('+91 9830769658', 'phone')}
                          className={`${styles.copyButton} ${copiedField === 'phone' ? styles.copiedButton : ''}`}
                        >
                          {copiedField === 'phone' ? <Check className={styles.copyIcon} /> : <Copy className={styles.copyIcon} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Volunteer Benefits */}
                  <div className={styles.volunteerBenefits}>
                    <h4 className={styles.benefitsTitle}>What You'll Gain</h4>
                    <div className={styles.benefitsList}>
                      <div className={styles.benefitItem}>✨ Make real impact in lives</div>
                      <div className={styles.benefitItem}>🤝 Connect with like-minded people</div>
                      <div className={styles.benefitItem}>💪 Develop new skills & experience</div>
                    </div>
                  </div>

                  {/* Back Button */}
                  <button onClick={handleBackClick} className={styles.backButton}>
                    <ArrowLeft className={styles.backIcon} />
                    <span>Back to Options</span>
                  </button>

                  <p className={styles.volunteerFooterText}>
                    📞 Call or message us to learn about our current volunteer opportunities
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCTA;
