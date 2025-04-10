import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-green-dark text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <Image
            alt="Artesanías hechas a mano"
            className="border border-gray-300 p-1 rounded-2xl shadow-xl"
            height={400}
            priority
            src="https://fastly.picsum.photos/id/527/4000/3000.jpg?hmac=M_RkizFIz8z52aYpBpgAV1i0fjFT5etMkZptB4KorC4"
            width={500}
          />
        </div>

        <div>
          <h1 className="handwriting text-4xl md:text-5xl font-bold mb-6">
            Discover unique, handmade pieces
          </h1>
          <p className="text-lg md:text-xl mb-6">
            We connect local artisans with lovers of authentic and sustainable design.
          </p>
          <button className="btn-green-light text-white px-6 py-3 rounded-2xl transition-all duration-300">
            Show Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
