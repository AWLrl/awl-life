export default function Impressum() {
  return (
    <div className="min-h-screen bg-light">
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Impressum
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>

              <p className="mb-6">
                <strong>AWL Life</strong>
                <br />
                [Ihr Name / Firmenname]
                <br />
                [Straße und Hausnummer]
                <br />
                [PLZ und Ort]
                <br />
                Deutschland
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-8">Kontakt</h3>
              <p className="mb-6">
                E-Mail: kontakt@awl-life.de
                <br />
                Telefon: [Ihre Telefonnummer]
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-8">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h3>
              <p className="mb-6">
                [Ihr Name]
                <br />
                [Adresse]
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-8">
                Haftung für Inhalte
              </h3>
              <p className="mb-4 text-gray-700">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
                auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
                §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
                überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-8">Haftung für Links</h3>
              <p className="mb-4 text-gray-700">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren
                Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
                fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                der Seiten verantwortlich.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-8">Urheberrecht</h3>
              <p className="mb-4 text-gray-700">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>

              <p className="text-sm text-gray-500 mt-8">
                Stand: {new Date().toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
