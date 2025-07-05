import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactLocations from '@/components/contact/ContactLocations'
import { getContactPageData } from '@/lib/api'

export default async function ContactPage() {
  const contactData = await getContactPageData()

  return (
    <div className="min-h-screen">
      <ContactHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo locations={contactData.locations} />
        </div>
      </div>
      <ContactLocations locations={contactData.locations} />
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'Contact South Pole - Start Your Climate Journey',
    description: 'Get in touch with South Pole\'s climate experts. Contact our global team to start your sustainability journey and create meaningful climate impact.',
  }
}