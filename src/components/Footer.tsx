import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Github, Linkedin, Mail, Heart, ArrowUp, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/MohammedZainKhazi'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/rootzain'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/zain.khazi'
    },
    { 
      icon: Mail, 
      href: 'mailto:MohammedZainKhazi@protonmail.com', 
      label: 'Email'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Mohammed Zain Khazi</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Passionate Software Developer Engineer crafting exceptional digital experiences 
                with modern technologies and clean code practices.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-primary/10"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <nav className="space-y-2">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Bengaluru, India</p>
                <p>MohammedZainKhazi@protonmail.com</p>
                <p>+91 91644 93673</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 dark:text-green-400">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Mohammed Zain Khazi. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>and lots of coffee.</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="flex items-center gap-2"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;