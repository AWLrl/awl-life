import { CheckCircle2, AlertCircle, Lightbulb, ArrowRight } from 'lucide-react';

interface ContentRendererProps {
  content: string;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  const parseBoldText = (text: string): (string | JSX.Element)[] => {
    const parts: (string | JSX.Element)[] = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={`bold-${key++}`} className="font-bold text-gray-900">
          {match[1]}
        </strong>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  const parseContent = (text: string) => {
    const sections: JSX.Element[] = [];
    const lines = text.split('\n');
    let currentSection: string[] = [];
    let sectionType: 'text' | 'list' | 'heading' = 'text';
    let key = 0;

    const flushSection = () => {
      if (currentSection.length === 0) return;

      if (sectionType === 'list') {
        sections.push(
          <ul key={key++} className="space-y-3 my-8">
            {currentSection.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        );
      } else if (sectionType === 'text') {
        currentSection.forEach((paragraph, i) => {
          if (paragraph.trim()) {
            sections.push(
              <p key={key++} className="text-lg text-gray-700 leading-relaxed mb-6">
                {parseBoldText(paragraph)}
              </p>
            );
          }
        });
      }

      currentSection = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        flushSection();
        continue;
      }

      if (line.startsWith('**') && line.endsWith('**')) {
        flushSection();
        const heading = line.replace(/\*\*/g, '');
        const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        sections.push(
          <h2
            key={key++}
            id={id}
            className="text-3xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20"
          >
            {heading}
          </h2>
        );

        const nextLine = lines[i + 1]?.trim();
        if (nextLine && !nextLine.startsWith('**') && !nextLine.startsWith('-')) {
          const sectionImages = [
            'https://images.pexels.com/photos/6585597/pexels-photo-6585597.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/6980301/pexels-photo-6980301.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/5824877/pexels-photo-5824877.jpeg?auto=compress&cs=tinysrgb&w=1200'
          ];
          const imageIndex = sections.filter(s => s.type === 'img').length;
          if (imageIndex < sectionImages.length) {
            sections.push(
              <img
                key={key++}
                src={sectionImages[imageIndex]}
                alt={heading}
                className="w-full h-64 object-cover rounded-2xl shadow-lg mb-8"
              />
            );
          }
        }
      } else if (line.startsWith('- ')) {
        if (sectionType !== 'list') {
          flushSection();
          sectionType = 'list';
        }
        currentSection.push(line.substring(2));
      } else {
        if (sectionType !== 'text') {
          flushSection();
          sectionType = 'text';
        }
        currentSection.push(line);
      }
    }

    flushSection();
    return sections;
  };

  const addInfoBoxes = (sections: JSX.Element[]) => {
    const enhanced: JSX.Element[] = [];
    let infoBoxAdded = false;
    let tipBoxAdded = false;

    sections.forEach((section, index) => {
      enhanced.push(section);

      if (!infoBoxAdded && index === Math.floor(sections.length * 0.3)) {
        enhanced.push(
          <div key={`info-${index}`} className="bg-blue-50 border-l-4 border-primary rounded-r-xl p-6 my-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-primary flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Wichtiger Hinweis</h3>
                <p className="text-gray-700">
                  Nimm dir ausreichend Zeit für jeden Schritt. Nachhaltigkeit entsteht durch
                  bewusste Entscheidungen, nicht durch Eile.
                </p>
              </div>
            </div>
          </div>
        );
        infoBoxAdded = true;
      }

      if (!tipBoxAdded && index === Math.floor(sections.length * 0.7)) {
        enhanced.push(
          <div key={`tip-${index}`} className="bg-accent/10 border-l-4 border-accent rounded-r-xl p-6 my-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Profi-Tipp</h3>
                <p className="text-gray-700">
                  Fotografiere deinen Fortschritt! Vorher-Nachher-Bilder motivieren ungemein
                  und zeigen dir, wie weit du gekommen bist.
                </p>
              </div>
            </div>
          </div>
        );
        tipBoxAdded = true;
      }
    });

    return enhanced;
  };

  const sections = parseContent(content);
  const enhanced = addInfoBoxes(sections);

  return <div className="space-y-4">{enhanced}</div>;
}
