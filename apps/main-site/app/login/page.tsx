import LoginForm from '@/components/auth/LoginForm'

export const metadata = {
  title: 'Sign In | 碳智METHAS',
  description: 'Sign in to your 碳智METHAS account to access exclusive climate solutions and insights.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">碳智METHAS</h1>
          <p className="text-gray-600">Leading carbon neutrality solutions provider</p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Need help? <a href="/contact" className="text-primary hover:text-primary/80">Contact support</a>
        </p>
      </div>
    </div>
  )
}