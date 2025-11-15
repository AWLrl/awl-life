export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-light">
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Datenschutzerklärung
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">1. Datenschutz auf einen Blick</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">Allgemeine Hinweise</h3>
              <p className="mb-4 text-gray-700">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was
                mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
                besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                Datenerfassung auf dieser Website
              </h3>
              <p className="mb-4 text-gray-700">
                <strong>
                  Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                </strong>
                <br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser
                Website entnehmen.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">
                2. Hosting und Content Delivery Networks (CDN)
              </h2>
              <p className="mb-4 text-gray-700">
                Diese Website wird bei einem externen Dienstleister gehostet (Hoster).
                Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                werden auf den Servern des Hosters gespeichert.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">Datenschutz</h3>
              <p className="mb-4 text-gray-700">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
                Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
                sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                Hinweis zur verantwortlichen Stelle
              </h3>
              <p className="mb-4 text-gray-700">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser
                Website ist:
              </p>
              <p className="mb-6">
                [Ihr Name / Firmenname]
                <br />
                [Straße und Hausnummer]
                <br />
                [PLZ und Ort]
                <br />
                E-Mail: kontakt@awl-life.de
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">
                4. Datenerfassung auf dieser Website
              </h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">Kontaktformular</h3>
              <p className="mb-4 text-gray-700">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
                Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
                angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
                Fall von Anschlussfragen bei uns gespeichert.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Newsletter</h3>
              <p className="mb-4 text-gray-700">
                Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten,
                benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen,
                welche uns die Überprüfung gestatten, dass Sie der Inhaber der
                angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters
                einverstanden sind.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">5. Ihre Rechte</h2>
              <p className="mb-4 text-gray-700">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
                Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
                erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
                Löschung dieser Daten zu verlangen.
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
