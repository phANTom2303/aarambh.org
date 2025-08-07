import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Mail,
    Phone,
    MapPin,
    Building2,
    CreditCard,
    Hash,
    User,
    Copy,
    Check,
    Heart,
    GraduationCap,
    UserCircle,
    Smile,
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from 'lucide-react';
import styles from './Footer.module.css';
import logo from '../../assets/logo.jpg';

const Footer = () => {
    const [copiedField, setCopiedField] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const bankDetails = [
        {
            icon: User,
            label: 'Account Holder',
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

    const impactAreas = [
        {
            icon: GraduationCap,
            title: 'Aid to Education',
            description: 'Supporting educational initiatives for underprivileged children'
        },
        {
            icon: Heart,
            title: 'Health Care',
            description: 'Providing healthcare access to those in need'
        },
        {
            icon: UserCircle,
            title: 'Homage to Age',
            description: 'Caring for elderly citizens with dignity and respect'
        },
        {
            icon: Smile,
            title: 'Love to Laugh',
            description: 'Spreading joy and happiness in communities'
        }
    ];

    const copyToClipboard = async (text, field) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(''), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
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

    const scrollToContact = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const contactSection = document.querySelector('#contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            navigate('/', { state: { scrollTo: 'contact' } });
        }
    };

    const scrollToDonate = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
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
        } else {
            navigate('/', { state: { scrollTo: 'donate' } });
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {/* Main Footer Content */}
                <div className={styles.footerGrid}>
                    {/* Brand Section */}
                    <div className={styles.brandSection}>
                        <Link to="/" className={styles.brandLink}>
                            <img src={logo} alt="Aarambh Logo" className={styles.footerLogo} />
                            <h3 className={styles.brandName}>Aarambh</h3>
                        </Link>
                        <p className={styles.brandDescription}>
                            Catalyst for positive change, focusing on accessible education,
                            quality healthcare, and dignified elder care. Spreading love,
                            laughter, and limitless possibilities.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://www.facebook.com/aarambheksuruwat" className={styles.socialLink} aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksSection}>
                        <h4 className={styles.sectionTitle}>Quick Links</h4>
                        <nav className={styles.footerNav}>
                            <Link to="/" className={styles.navLink}>Home</Link>
                            <Link to="/members" className={styles.navLink}>Our Team</Link>
                            <Link to="/activities" className={styles.navLink}>Activities</Link>
                            <a href="#contact" onClick={scrollToContact} className={styles.navLink}>
                                Contact
                            </a>
                            <button onClick={scrollToDonate} className={styles.donateLink}>
                                Donate Now
                            </button>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.contactSection}>
                        <h4 className={styles.sectionTitle}>Get in Touch</h4>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <Phone className={styles.contactIcon} size={16} />
                                <div className={styles.contactText}>
                                    <p>+91 9830769658</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <MapPin className={styles.contactIcon} size={16} />
                                <div className={styles.contactText}>
                                    <p>238 Gopal Lal Thakur Road,<br />
                                        Samta Apartment, Block A-405<br />
                                        Neaogipara, Kolkata 700036</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banking Info */}
                    <div className={styles.bankingSection}>
                        <h4 className={styles.sectionTitle}>Banking Details</h4>
                        <div className={styles.bankDetails}>
                            {bankDetails.map((detail, index) => {
                                const IconComponent = detail.icon;
                                return (
                                    <div key={index} className={styles.bankDetail}>
                                        <div className={styles.bankLabel}>
                                            <IconComponent className={styles.bankIcon} size={14} />
                                            <span>{detail.label}:</span>
                                        </div>
                                        <div className={styles.bankValueContainer}>
                                            <span className={styles.bankValue}>{detail.value}</span>
                                            <button
                                                onClick={() => copyToClipboard(detail.value, detail.field)}
                                                className={styles.copyButton}
                                                title="Copy to clipboard"
                                            >
                                                {copiedField === detail.field ? (
                                                    <Check size={12} className={styles.copiedIcon} />
                                                ) : (
                                                    <Copy size={12} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className={styles.footerBottom}>
                    <div className={styles.bottomContent}>
                        <p className={styles.copyright}>
                            © {new Date().getFullYear()} Baranagar Aarambh Women's Foundation. All rights reserved.
                        </p>
                        <div className={styles.legalLinks}>
                            <a href="#" className={styles.legalLink}>Privacy Policy</a>
                            <a href="#" className={styles.legalLink}>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
