import { ArrowLeft, CheckCircle, Clock, Users, Zap, Calculator, MapPin, Phone, Mail, Calendar, MessageSquare, FileText, Star, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { toast } from 'sonner';
import { sendDiscordLog } from '../utils/discordLogger';

interface GetConsultationProps {
  onBack: () => void;
}

export function GetConsultation({ onBack }: GetConsultationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    propertyType: '',
    serviceType: '',
    projectBudget: '',
    timeframe: '',
    currentEnergyBill: '',
    propertySize: '',
    specificNeeds: [] as string[],
    additionalInfo: '',
    preferredContactMethod: 'email',
    agreesToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const consultationSteps = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "We'll evaluate your property, energy needs, and sustainability goals.",
      duration: "30-45 minutes",
      icon: Calculator
    },
    {
      step: 2,
      title: "Custom Solution Design",
      description: "Our experts create a tailored renewable energy or agriculture solution.",
      duration: "1-2 weeks",
      icon: FileText
    },
    {
      step: 3,
      title: "Proposal & ROI Analysis",
      description: "Detailed proposal with cost breakdown, savings, and payback period.",
      duration: "3-5 days",
      icon: CheckCircle
    },
    {
      step: 4,
      title: "Implementation Planning",
      description: "Timeline, permits, and installation scheduling once approved.",
      duration: "1-2 weeks",
      icon: Calendar
    }
  ];

  const serviceTypes = [
    { value: "biogas", label: "Biogas Systems", description: "Convert organic waste to clean energy" },
    { value: "solar", label: "Solar Energy", description: "Harness the power of the sun" },
    { value: "agriculture", label: "Smart Agriculture", description: "Sustainable farming solutions" },
    { value: "hybrid", label: "Hybrid Systems", description: "Combined renewable energy solutions" },
    { value: "consultation", label: "General Consultation", description: "Explore all available options" }
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $15,000",
    "$15,000 - $30,000",
    "$30,000 - $50,000",
    "$50,000 - $100,000",
    "Over $100,000"
  ];

  const specificNeeds = [
    "Reduce electricity bills",
    "Energy independence",
    "Waste management",
    "Organic fertilizer production",
    "Smart monitoring systems",
    "Grid-tie connectivity",
    "Battery backup",
    "Agricultural automation",
    "Environmental compliance",
    "Carbon footprint reduction"
  ];

  const testimonials = [
    {
      name: "Priya Fernando",
      role: "Homeowner, Kandy",
      content: "EcoPal's consultation was thorough and professional. They designed a perfect solar solution that cut our electricity bill by 90%.",
      rating: 5,
      project: "5kW Residential Solar"
    },
    {
      name: "Chaminda Silva",
      role: "Farm Owner, Matale",
      content: "The biogas system consultation exceeded our expectations. Now we have clean cooking fuel and organic fertilizer for our crops.",
      rating: 5,
      project: "Community Biogas Plant"
    },
    {
      name: "Sarah Perera",
      role: "Business Owner, Colombo",
      content: "Their smart agriculture consultation transformed our greenhouse operations. Yields increased by 40% in the first year.",
      rating: 5,
      project: "Smart Greenhouse System"
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificNeedsChange = (need: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specificNeeds: checked 
        ? [...prev.specificNeeds, need]
        : prev.specificNeeds.filter(n => n !== need)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreesToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Log to Discord
      await sendDiscordLog({
        embeds: [{
          title: "New Consultation Request",
          color: 0x0D9488, // Teal 500
          fields: [
            { name: "Name", value: formData.name || "N/A", inline: true },
            { name: "Email", value: formData.email || "N/A", inline: true },
            { name: "Phone", value: formData.phone || "N/A", inline: true },
            { name: "Location", value: formData.location || "N/A", inline: true },
            { name: "Property Type", value: formData.propertyType || "N/A", inline: true },
            { name: "Property Size", value: formData.propertySize || "N/A", inline: true },
            { name: "Service Interest", value: formData.serviceType || "N/A", inline: true },
            { name: "Budget", value: formData.projectBudget || "N/A", inline: true },
            { name: "Timeline", value: formData.timeframe || "N/A", inline: true },
            { name: "Current Bill", value: formData.currentEnergyBill || "N/A", inline: true },
            { name: "Contact Method", value: formData.preferredContactMethod || "N/A", inline: true },
            { name: "Specific Needs", value: formData.specificNeeds.length ? formData.specificNeeds.join(", ") : "None" },
            ...(formData.additionalInfo ? [{ name: "Additional Info", value: formData.additionalInfo }] : [])
          ],
          timestamp: new Date().toISOString()
        }]
      });
      
      toast.success("Consultation request submitted successfully! We'll contact you within 24 hours.");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        propertyType: '',
        serviceType: '',
        projectBudget: '',
        timeframe: '',
        currentEnergyBill: '',
        propertySize: '',
        specificNeeds: [],
        additionalInfo: '',
        preferredContactMethod: 'email',
        agreesToTerms: false
      });
    } catch (error) {
      toast.error("Failed to submit consultation request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B3D2E] text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Get Free Consultation
          </h1>
          <p className="text-white/70 mt-2">Start your journey to sustainable energy independence</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Expert Consultation for Your Sustainable Future
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Get personalized advice from Sri Lanka's leading renewable energy experts. 
                Our comprehensive consultation covers everything from initial assessment to implementation planning.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center">
                  <Clock className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="font-semibold">Free</div>
                  <div className="text-white/60 text-sm">Initial Consultation</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center">
                  <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="font-semibold">500+</div>
                  <div className="text-white/60 text-sm">Successful Projects</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center">
                  <Star className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="font-semibold">4.9/5</div>
                  <div className="text-white/60 text-sm">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1612769853864-0bee061dbdc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBjb25zdWx0YXRpb24lMjBtZWV0aW5nfGVufDF8fHx8MTc1NzI1MDcxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="EcoPal Consultation Meeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Our Consultation Process</h2>
            <p className="text-xl text-white/70">A comprehensive approach to your sustainable energy journey</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-emerald-400 font-bold mb-2">Step {step.step}</div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm mb-3">{step.description}</p>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {step.duration}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Request Your Free Consultation</h2>
            <p className="text-xl text-white/70">Fill out the form below and our experts will contact you within 24 hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Consultation Request Form</CardTitle>
                <CardDescription className="text-white/70">
                  Help us understand your needs so we can provide the best consultation experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+94 XX XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">Location *</Label>
                      <Input
                        id="location"
                        placeholder="City, District"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Property & Project Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Property Type *</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential Home</SelectItem>
                          <SelectItem value="commercial">Commercial Building</SelectItem>
                          <SelectItem value="industrial">Industrial Facility</SelectItem>
                          <SelectItem value="farm">Farm/Agricultural Land</SelectItem>
                          <SelectItem value="community">Community Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Service Interest *</Label>
                      <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Project Budget</Label>
                      <Select value={formData.projectBudget} onValueChange={(value) => handleInputChange('projectBudget', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Current Monthly Energy Bill</Label>
                      <Input
                        placeholder="e.g., Rs. 15,000"
                        value={formData.currentEnergyBill}
                        onChange={(e) => handleInputChange('currentEnergyBill', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Property Size</Label>
                      <Input
                        placeholder="e.g., 2000 sq ft"
                        value={formData.propertySize}
                        onChange={(e) => handleInputChange('propertySize', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Specific Needs */}
                  <div className="space-y-4">
                    <Label className="text-white">Specific Needs (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {specificNeeds.map((need) => (
                        <div key={need} className="flex items-center space-x-2">
                          <Checkbox
                            id={need}
                            checked={formData.specificNeeds.includes(need)}
                            onCheckedChange={(checked) => handleSpecificNeedsChange(need, checked as boolean)}
                            className="border-white/20"
                          />
                          <Label htmlFor={need} className="text-white/80 text-sm">
                            {need}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Timeline */}
                  <div className="space-y-3">
                    <Label className="text-white">Preferred Timeline</Label>
                    <RadioGroup
                      value={formData.timeframe}
                      onValueChange={(value) => handleInputChange('timeframe', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="asap" id="asap" className="border-white/20" />
                        <Label htmlFor="asap" className="text-white/80">As soon as possible</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3months" id="3months" className="border-white/20" />
                        <Label htmlFor="3months" className="text-white/80">Within 3 months</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="6months" id="6months" className="border-white/20" />
                        <Label htmlFor="6months" className="text-white/80">Within 6 months</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="planning" id="planning" className="border-white/20" />
                        <Label htmlFor="planning" className="text-white/80">Just planning/researching</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Contact Preference */}
                  <div className="space-y-3">
                    <Label className="text-white">Preferred Contact Method</Label>
                    <RadioGroup
                      value={formData.preferredContactMethod}
                      onValueChange={(value) => handleInputChange('preferredContactMethod', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="contact-email" className="border-white/20" />
                        <Label htmlFor="contact-email" className="text-white/80">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="contact-phone" className="border-white/20" />
                        <Label htmlFor="contact-phone" className="text-white/80">Phone Call</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="contact-whatsapp" className="border-white/20" />
                        <Label htmlFor="contact-whatsapp" className="text-white/80">WhatsApp</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo" className="text-white">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Tell us more about your project, specific requirements, or any questions you have..."
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-24"
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreesToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreesToTerms', checked)}
                      className="border-white/20 mt-1"
                    />
                    <Label htmlFor="terms" className="text-white/80 text-sm leading-relaxed">
                      I agree to the terms and conditions and privacy policy. I consent to EcoPal Engineering 
                      contacting me about my consultation request and related services.
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Free Consultation
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">What Our Clients Say</h2>
            <p className="text-xl text-white/70">Real feedback from satisfied consultation clients</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                  <Badge variant="secondary" className="bg-emerald-900/30 text-emerald-300 mt-2">
                    {testimonial.project}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Need Immediate Assistance?</h2>
            <p className="text-xl text-white/70">Our consultation team is ready to help you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center"
            >
              <Phone className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Call Us</h3>
              <p className="text-white/70 text-sm mb-3">Speak directly with our experts</p>
              <p className="text-emerald-400 font-medium">+94 XX XXX XXXX</p>
              <p className="text-white/60 text-xs mt-1">Mon-Fri 9AM-6PM</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center"
            >
              <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Email Us</h3>
              <p className="text-white/70 text-sm mb-3">Get detailed information</p>
              <p className="text-emerald-400 font-medium">consultation@ecopal.lk</p>
              <p className="text-white/60 text-xs mt-1">Response within 4 hours</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 text-center"
            >
              <MapPin className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Visit Our Office</h3>
              <p className="text-white/70 text-sm mb-3">Schedule an in-person meeting</p>
              <p className="text-emerald-400 font-medium">Colombo Office</p>
              <p className="text-white/60 text-xs mt-1">By appointment only</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Transform Your Energy Future?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Join hundreds of satisfied clients who have made the switch to sustainable energy with EcoPal Engineering. 
              Your consultation is completely free with no obligations.
            </p>
            <Button 
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3"
            >
              Start Your Free Consultation
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}