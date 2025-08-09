import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Users, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import Parallax from "./Parallax";

const Contact = () => {
  console.log('Contact component rendering');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.send(
        'service_t3e57bf', // Replace with your EmailJS service ID
        'template_wyhtltf', // Replace with your EmailJS template ID
        {
          from_name: `${formData.firstName} ${formData.lastName}`, // maps to {{from_name}}
          from_email: formData.email,                             // maps to {{from_email}}
          subject: formData.subject,                              // maps to {{subject}}
          message: formData.message,                              // maps to {{message}}
          time: new Date().toLocaleString(),                      // maps to {{time}}
          to_name: 'Vishal Chouhan'                               // maps to {{to_name}}
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Replace with your EmailJS public key
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  } as const;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Background decoration with parallax */}
      <Parallax speed={0.2} direction="up">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </Parallax>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax speed={0.3} direction="left">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-1 rounded-full blur-3xl opacity-10"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Parallax>
        
        <Parallax speed={0.4} direction="right">
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-3 rounded-full blur-3xl opacity-10"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Parallax>
      </div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="max-w-7xl mx-auto w-full" style={{ opacity: 1, visibility: 'visible' }}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white drop-shadow-lg bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Let's Work Together
          </motion.h2>

          {/* Value Proposition */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? I specialize in building scalable, high-performance applications 
              that drive business growth. Let's discuss how we can create something amazing together.
            </p>
          </motion.div>

          {/* Why Work With Me */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16"
            variants={itemVariants}
          >
            <Card className="p-6 border-0 shadow-neon glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 text-center border border-white/20 h-full flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Fast Delivery</h3>
              <p className="text-white/80 flex-grow">Quick turnaround times without compromising on quality or performance.</p>
            </Card>

            <Card className="p-6 border-0 shadow-neon glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 text-center border border-white/20 h-full flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Scalable Solutions</h3>
              <p className="text-white/80 flex-grow">Architecture designed to grow with your business needs and user base.</p>
            </Card>

            <Card className="p-6 border-0 shadow-neon glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 text-center border border-white/20 h-full flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Ongoing Support</h3>
              <p className="text-white/80 flex-grow">Continuous maintenance, updates, and support to keep your project thriving.</p>
            </Card>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch w-full">
            {/* Contact Info */}
            <div className="lg:hidden">
              <motion.div variants={itemVariants} className="h-full">
                <Card className="p-4 sm:p-6 lg:p-8 xl:p-10 border-0 shadow-neon glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col border border-white/20 min-h-[600px]">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Get In Touch</h3>
                  <p className="text-white/80 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                    I'm always excited to discuss new opportunities, innovative projects, and potential collaborations. 
                    Whether you have a specific project in mind or just want to explore possibilities, let's start a conversation!
                  </p>
                  
                  <div className="space-y-4 sm:space-y-6 flex-grow">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-base sm:text-lg">Email</p>
                        <a href="mailto:chouhanvishal273@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors break-all text-sm sm:text-base">
                          chouhanvishal273@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-base sm:text-lg">Phone</p>
                        <a href="tel:+917693813997" className="text-green-400 hover:text-green-300 transition-colors break-all text-sm sm:text-base">
                          +91 76938 13997
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-base sm:text-lg">Location</p>
                        <p className="text-white/70 break-all text-sm sm:text-base">Vijaynagar, Indore (M.P.), 452010</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
            
            <div className="hidden lg:block">
              <Parallax speed={0.3} direction="left">
                <motion.div variants={itemVariants} className="h-full">
                  <Card className="p-4 sm:p-6 lg:p-8 xl:p-10 border-0 shadow-neon glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col border border-white/20 min-h-[600px]">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Get In Touch</h3>
                    <p className="text-white/80 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                      I'm always excited to discuss new opportunities, innovative projects, and potential collaborations.
                      Whether you have a specific project in mind or just want to explore possibilities, let's start a conversation!
                    </p>
                    
                    <div className="space-y-4 sm:space-y-6 flex-grow">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white text-base sm:text-lg">Email</p>
                          <a href="mailto:chouhanvishal273@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors break-all text-sm sm:text-base">
                            chouhanvishal273@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white text-base sm:text-lg">Phone</p>
                          <a href="tel:+917693813997" className="text-green-400 hover:text-green-300 transition-colors break-all text-sm sm:text-base">
                            +91 76938 13997
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white text-base sm:text-lg">Location</p>
                          <p className="text-white/70 break-all text-sm sm:text-base">Vijaynagar, Indore (M.P.), 452010</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Parallax>
            </div>
            
            {/* Contact Form */}
            <div className="lg:hidden">
              <motion.div variants={itemVariants} className="h-full">
                <Card className="p-4 sm:p-6 lg:p-8 xl:p-10 border-0 shadow-neon glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col border border-white/20 min-h-[600px]">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Send Message</h3>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <p className="text-green-800 text-sm sm:text-base">Message sent successfully! I'll get back to you soon.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      <p className="text-red-800 text-sm sm:text-base">Failed to send message. Please try again or contact me directly.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex-grow flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Input 
                          name="firstName"
                          placeholder="First Name" 
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <Input 
                          name="lastName"
                          placeholder="Last Name" 
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    
                    <Input 
                      name="email"
                      placeholder="Email Address" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                    />
                    
                    <Input 
                      name="subject"
                      placeholder="Subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                    />
                    
                    <Textarea 
                      name="message"
                      placeholder="Tell me about your project, timeline, and any specific requirements..." 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 resize-none flex-grow text-sm sm:text-base"
                    />
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-auto text-sm sm:text-base py-2 sm:py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
            
            <div className="hidden lg:block">
              <Parallax speed={0.3} direction="right">
                <motion.div variants={itemVariants} className="h-full">
                  <Card className="p-4 sm:p-6 lg:p-8 xl:p-10 border-0 shadow-neon glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col border border-white/20 min-h-[600px]">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white">Send Message</h3>
                    
                    {submitStatus === 'success' && (
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        <p className="text-green-800 text-sm sm:text-base">Message sent successfully! I'll get back to you soon.</p>
                      </div>
                    )}
  
                    {submitStatus === 'error' && (
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                        <p className="text-red-800 text-sm sm:text-base">Failed to send message. Please try again or contact me directly.</p>
                      </div>
                    )}
  
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex-grow flex flex-col">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <Input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                          />
                        </div>
                        <div>
                          <Input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                          />
                        </div>
                      </div>
                      
                      <Input
                        name="email"
                        placeholder="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                      />
                      
                      <Input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 text-sm sm:text-base"
                      />
                      
                      <Textarea
                        name="message"
                        placeholder="Tell me about your project, timeline, and any specific requirements..."
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 resize-none flex-grow text-sm sm:text-base"
                      />
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-auto text-sm sm:text-base py-2 sm:py-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Card>
                </motion.div>
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;