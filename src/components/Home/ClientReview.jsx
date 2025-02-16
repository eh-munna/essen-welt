export default function ClientReview() {
  const reviews = [
    {
      name: 'John Carter',
      position: 'CEO, Example Corp.',
      review:
        'Working with this company has been an absolute pleasure. Their attention to detail and commitment to excellence has made our project a success. Highly recommend!',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      name: 'Jane Doe',
      position: 'Founder, Tech Solutions',
      review:
        "Fantastic service from start to finish! Their team was responsive, professional, and delivered exceptional results. Couldn't be happier with the outcome.",
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      name: 'Mark Smith',
      position: 'COO, Global Enterprises',
      review:
        'I have worked with many companies over the years, and this one stands out for their top-notch quality and customer service. I will definitely work with them again in the future!',
      imageUrl: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <section
      className="mx-auto p-8 bg-[#2D6A4F] rounded-xl shadow-lg"
      id="client-reviews"
    >
      <h2 className="text-3xl font-semibold text-[#E9CBA7] mb-8">
        Client Reviews
      </h2>

      {reviews.map((review, index) => (
        <div
          key={index}
          className="mb-8 p-6 bg-white rounded-lg border border-[#B4B4B4] shadow-sm"
        >
          <p className="text-lg italic text-[#2D6A4F] mb-4">{`"${review.review}"`}</p>
          <div className="flex items-center">
            <img
              src={review.imageUrl}
              alt={review.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-bold text-[#2D6A4F]">{review.name}</p>
              <p className="text-sm text-[#B4B4B4]">{review.position}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
