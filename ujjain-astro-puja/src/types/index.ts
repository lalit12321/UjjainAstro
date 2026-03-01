 
export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  price: { standard: number };
  benefits: string[];
  effects: string[];
  included: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  service: string;
  message: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  service: string;
  preferredDate: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  serviceSlug: string;
  title: string;
  excerpt: string;
  keywords: string[];
  sections: BlogSection[];
}
