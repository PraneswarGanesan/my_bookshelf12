export default function Section({ title, children }) {
  return (
    <section className="max-w-3xl mb-24">
      <h2 className="text-xl font-medium mb-6">{title}</h2>
      {children}
    </section>
  );
}
