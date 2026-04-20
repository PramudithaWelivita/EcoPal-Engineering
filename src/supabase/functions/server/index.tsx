// @ts-nocheck
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
}

interface NewsletterData {
  email: string;
  timestamp: string;
}

const app = new Hono();

// CORS and logging middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Contact form submission endpoint
app.post('/make-server-604c55a2/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { firstName, lastName, email, phone, service, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      console.log('Contact form validation error: Missing required fields');
      return c.json({ 
        success: false, 
        message: 'Please fill in all required fields (First Name, Last Name, Email, Message)' 
      }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Contact form validation error: Invalid email format');
      return c.json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      }, 400);
    }

    const contactData: ContactFormData = {
      firstName,
      lastName,
      email,
      phone: phone || '',
      service: service || 'General Inquiry',
      message,
      timestamp: new Date().toISOString()
    };

    // Generate unique key for the contact submission
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store in key-value store
    await kv.set(contactId, contactData);
    
    console.log(`New contact form submission stored with ID: ${contactId}`);
    
    return c.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      contactId 
    });

  } catch (error) {
    console.log(`Contact form submission error: ${error}`);
    return c.json({ 
      success: false, 
      message: 'We encountered an error processing your message. Please try again or contact us directly.' 
    }, 500);
  }
});

// Newsletter subscription endpoint
app.post('/make-server-604c55a2/newsletter', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    // Validate email
    if (!email) {
      console.log('Newsletter subscription error: Email is required');
      return c.json({ 
        success: false, 
        message: 'Email address is required' 
      }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Newsletter subscription error: Invalid email format');
      return c.json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      }, 400);
    }

    // Check if email already exists
    const existingSubscriptions = await kv.getByPrefix('newsletter_');
    const emailExists = existingSubscriptions.some((sub: NewsletterData) => sub.email === email);
    
    if (emailExists) {
      console.log(`Newsletter subscription attempt with existing email: ${email}`);
      return c.json({ 
        success: false, 
        message: 'This email is already subscribed to our newsletter' 
      }, 400);
    }

    const newsletterData: NewsletterData = {
      email,
      timestamp: new Date().toISOString()
    };

    // Generate unique key for the newsletter subscription
    const subscriptionId = `newsletter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store in key-value store
    await kv.set(subscriptionId, newsletterData);
    
    console.log(`New newsletter subscription stored with ID: ${subscriptionId} for email: ${email}`);
    
    return c.json({ 
      success: true, 
      message: 'Successfully subscribed to our newsletter! You will receive updates about sustainable technology and green innovations.',
      subscriptionId 
    });

  } catch (error) {
    console.log(`Newsletter subscription error: ${error}`);
    return c.json({ 
      success: false, 
      message: 'We encountered an error processing your subscription. Please try again.' 
    }, 500);
  }
});

// Get contact submissions (for admin purposes)
app.get('/make-server-604c55a2/contacts', async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact_');
    console.log(`Retrieved ${contacts.length} contact submissions`);
    
    return c.json({ 
      success: true, 
      data: contacts.map((contact, index) => ({
        id: index + 1,
        ...contact,
        // Format timestamp for better readability
        submittedAt: new Date(contact.timestamp).toLocaleString()
      }))
    });

  } catch (error) {
    console.log(`Error retrieving contact submissions: ${error}`);
    return c.json({ 
      success: false, 
      message: 'Error retrieving contact submissions' 
    }, 500);
  }
});

// Get newsletter subscriptions (for admin purposes)
app.get('/make-server-604c55a2/subscribers', async (c) => {
  try {
    const subscribers = await kv.getByPrefix('newsletter_');
    console.log(`Retrieved ${subscribers.length} newsletter subscribers`);
    
    return c.json({ 
      success: true, 
      data: subscribers.map((subscriber, index) => ({
        id: index + 1,
        ...subscriber,
        // Format timestamp for better readability
        subscribedAt: new Date(subscriber.timestamp).toLocaleString()
      }))
    });

  } catch (error) {
    console.log(`Error retrieving newsletter subscribers: ${error}`);
    return c.json({ 
      success: false, 
      message: 'Error retrieving newsletter subscribers' 
    }, 500);
  }
});

// Health check endpoint
app.get('/make-server-604c55a2/health', (c) => {
  return c.json({ 
    success: true, 
    message: 'EcoPal Engineering server is running!',
    timestamp: new Date().toISOString()
  });
});

// Start the server
Deno.serve(app.fetch);