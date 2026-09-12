'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Sparkles, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Message sent successfully! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Address',
      value: 'MohammedZainKhazi@protonmail.com',
      href: 'mailto:MohammedZainKhazi@protonmail.com'
    },
    {
      icon: Phone,
      label: 'Phone Contact',
      value: '+91 91644 93673',
      href: 'tel:+919164493673'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bengaluru, India',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub Repository',
      href: 'https://github.com/MohammedZainKhazi',
      username: '@MohammedZainKhazi'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn Network',
      href: 'https://linkedin.com/in/rootzain',
      username: 'Mohammed Zain Khazi'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/zain.khazi',
      username: '@zain.khazi'
    }
  ];

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl">
            <MessageSquare className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest font-mono">
              Direct Transmission
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Let's Connect
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Interested in collaborating or hiring for high-impact software roles? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Form */}
          <Card className="lg:col-span-7 glass-interstellar border-white/10 rounded-3xl overflow-hidden p-2 sm:p-4">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-xl font-bold text-white">
                <Send className="h-5 w-5 text-amber-400" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-mono uppercase text-gray-300">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Mercer"
                      required
                      className="bg-white/5 border-white/15 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-mono uppercase text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex@company.com"
                      required
                      className="bg-white/5 border-white/15 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs font-mono uppercase text-gray-300">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    required
                    className="bg-white/5 border-white/15 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-mono uppercase text-gray-300">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, timeline, or open role..."
                    rows={5}
                    required
                    className="bg-white/5 border-white/15 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-shiny bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold py-6 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="h-4 w-4 stroke-[2.5]" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right Cards — Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <Card className="glass-interstellar border-white/10 rounded-3xl p-2 sm:p-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-white">Direct Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                      <contact.icon className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-gray-400 uppercase">{contact.label}</p>
                      <a
                        href={contact.href}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors truncate block"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Channels Card */}
            <Card className="glass-interstellar border-white/10 rounded-3xl p-2 sm:p-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-white">Social Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-purple-500/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <social.icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-gray-400 uppercase">{social.label}</p>
                      <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {social.username}
                      </p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Status Banner */}
            <div className="p-6 rounded-3xl glass-interstellar border border-emerald-500/30 bg-emerald-500/10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                </span>
                <span className="text-xs font-bold font-mono text-emerald-300 uppercase tracking-wider">
                  Open for Opportunities
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Currently taking on new full-stack engineering challenges, enterprise solutions, & AI integrations.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;