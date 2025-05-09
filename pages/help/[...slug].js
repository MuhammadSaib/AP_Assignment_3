import { useRouter } from 'next/router';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  const page = slug ? slug[0] : 'index'; 

  let content;

  switch (page) {
    case 'faqs':
      content = (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">FAQs</h1>
          <p className="text-gray-600">Here you'll find answers to the most commonly asked questions...</p>
        </div>
      );
      break;
    case 'contact':
      content = (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600">If you need help, feel free to reach out to us at <a href="mailto:support@moviehouse.com" className="text-blue-500">support@moviehouse.com</a></p>
        </div>
      );
      break;
    case 'privacy':
      content = (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">We are committed to protecting your privacy and ensuring the security of your personal information...</p>
        </div>
      );
      break;
    case 'index':
      content = (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Help Center</h1>
          <p className="text-gray-600">Welcome to our help center, where you'll find resources to assist you.</p>
        </div>
      );
      break;
    default:
      content = (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Help - {page}</h1>
          <p className="text-gray-600">Sorry, we couldn't find the help page you're looking for.</p>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-8">
      {content}
    </div>
  );
}
