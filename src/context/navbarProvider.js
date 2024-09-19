import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

export default function NavbarProvider() {
    const pathName = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getClassLink = (pathId) => pathId === pathName ? 'active' : '';

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo Section */}
                <div className="logo">
                <Image
                        src="/images/2.webp"  // Path to the image in the public folder
                        alt="Logo"
                        width={250}  // Adjust width as needed
                        height={40}  // Adjust height as needed
                    />
                </div>

                {/* Navigation Menu */}
                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link href="/dashboard" className={getClassLink('/dashboard')}>Home</Link>
                    <Link href="/leads" className={getClassLink('/leads')}>Leads</Link>
                    <Link href="/opportunities" className={getClassLink('/opportunities')}>Opportunities</Link>
                    <Link href="/learners" className={getClassLink('/learners')}>Learners</Link>
                    <Link href="/courses" className={getClassLink('/courses')}>Courses</Link>
                </div>

                {/* Menu Toggle Button for Mobile */}
                <button className="menu-toggle" onClick={toggleMenu}>
                    <span className="menu-icon"></span>
                </button>
            </div>
        </nav>
    );
}
