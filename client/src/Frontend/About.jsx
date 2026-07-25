import Layout from "../FrontendLayout/Layout";

function About() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            About Maidan
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Book sports spaces easily and play with confidence.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Maidan is a smart sports venue booking platform built for players, teams,
            and organizers. Whether you need a futsal court, a tournament venue, or a
            place to train, Maidan helps you discover the best options in one place.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Fast Booking</h2>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Browse venues and tournaments quickly without the usual hassle.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Trusted Venues</h2>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Discover verified sports spaces across Nepal with clear details.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Tournament Ready</h2>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Find events, compare facilities, and join upcoming tournaments easily.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default About;
