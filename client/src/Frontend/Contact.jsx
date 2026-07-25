import Layout from "../FrontendLayout/Layout";

function Contact() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Contact Us
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            We would love to hear from you.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether you have a question about booking, tournaments, or partnerships,
            our team is here to help.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Email</h2>
              <p className="mt-2 text-sm text-gray-600">alsanpokharel458@gmail.com</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Phone</h2>
              <p className="mt-2 text-sm text-gray-600">+977-9817077458</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Contact;
