import React from 'react';
import { Heart, Users, Shield, Stethoscope, ArrowRight, HandHeart } from 'lucide-react';
import styles from './Donation.module.css';

const DonationCTA = () => {
  const impactAreas = [
    {
      icon: Heart,
      title: 'Emergency Care',
      color: 'red'
    },
    {
      icon: Users,
      title: 'Community Health',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Healthcare Access',
      color: 'green'
    },
    {
      icon: Stethoscope,
      title: 'Medical Camps',
      color: 'purple'
    }
  ];

  return (
    <section className={styles.donationSection}>
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
                  Every act of kindness creates ripples of hope. Your support doesn't just provide healthcare—
                  it restores dignity, brings smiles, and gives families a chance at a brighter tomorrow.
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

            {/* Right Section - Call to Action */}
            <div className={styles.donationCta}>
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
                <button className={styles.donateButton}>
                  <Heart className={styles.buttonHeartIcon} />
                  <span>Donate Now</span>
                  <ArrowRight className={styles.buttonArrowIcon} />
                </button>
                
                <p className={styles.securityText}>
                  🔒 Secure • Tax Deductible • Instant Receipt
                </p>
              </div>

              {/* Secondary Actions */}
              <div className={styles.secondaryActions}>
                <p className={styles.secondaryTitle}>Other ways to help</p>
                <div className={styles.secondaryButtons}>
                  <button className={styles.volunteerButton}>
                    🤝 Volunteer With Us
                  </button>
                  <button className={styles.awarenessButton}>
                    📢 Spread Awareness
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCTA;