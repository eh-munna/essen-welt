export default function Heading({ headingText }) {
  return (
    <>
      <h2 className="text-3xl text-center font-semibold text-[primaryText] mb-8">
        {headingText}
      </h2>
    </>
  );
}
