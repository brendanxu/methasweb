import RegisterForm from '@/components/auth/RegisterForm'

export const metadata = {
  title: 'Create Account | South Pole',
  description: 'Join South Pole to access exclusive climate solutions, insights, and resources for your sustainability journey.',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">South Pole</h1>
          <p className="text-gray-600">Join the climate action community</p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Questions? <a href="/contact" className="text-primary hover:text-primary/80">Get in touch</a>
        </p>
      </div>
    </div>
  )
}