// Filename: app/components/Header.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import styles from "./Header.module.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Services", href: "/#our-services" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { ease: "easeIn" } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <nav className={clsx(styles.navbar, isScrolled && styles.scrolled)}>
        <div
          className={clsx(
            styles.navContainer,
            isScrolled && styles.navContainerScrolled
          )}
        >
          <div className={styles.navContent}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/logo.svg"
                alt="Vaishnavi Photography"
                width={100}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className={styles.desktopNav}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(styles.navLink, isActive && styles.active)}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="underline"
                        className={styles.activeUnderline}
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className={styles.mobileMenuButton}>
              <button
                onClick={toggleMenu}
                type="button"
                className={styles.menuToggle}
              >
                {/* <span className="sr-only">Open main menu</span> */}
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className={styles.mobileNavLinks}>
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className={clsx(
                      styles.mobileNavLink,
                      pathname === link.href && styles.mobileActive
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;