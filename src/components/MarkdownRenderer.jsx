import React from 'react';

/**
 * Renderizador ligero y seguro de Markdown para los mensajes del Agente de IA.
 * Soporta negrita (**texto**), cursiva (*texto*), listas con viñetas, bloques y saltos de línea.
 */
export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Dividir por líneas para procesar párrafos y listas
  const lines = content.split('\n');

  const renderFormattedText = (text) => {
    // Reemplazar **negrita**
    const parts = [];
    // Regex para detectar **negrita**, *cursiva* y `código`
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Texto previo al match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchText = match[0];
      if (matchText.startsWith('**') && matchText.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-bold text-neutral-900">
            {matchText.slice(2, -2)}
          </strong>
        );
      } else if (matchText.startsWith('*') && matchText.endsWith('*')) {
        parts.push(
          <em key={match.index} className="italic text-neutral-800">
            {matchText.slice(1, -1)}
          </em>
        );
      } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
        parts.push(
          <code key={match.index} className="px-1.5 py-0.5 rounded-md bg-stone-200/70 font-mono text-xs text-coral-700">
            {matchText.slice(1, -1)}
          </code>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="space-y-1.5 text-xs leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Viñetas con guión o asterisco
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-1.5 ml-1">
              <span className="text-coral-500 font-bold shrink-0 mt-0.5">•</span>
              <span className="flex-1">{renderFormattedText(trimmed.substring(2))}</span>
            </div>
          );
        }

        // Listas numeradas (ej. 1. , 2. )
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-1.5 ml-1">
              <span className="font-bold text-coral-600 shrink-0">{numMatch[1]}.</span>
              <span className="flex-1">{renderFormattedText(numMatch[2])}</span>
            </div>
          );
        }

        // Párrafo estándar
        return (
          <p key={idx} className="leading-relaxed">
            {renderFormattedText(line)}
          </p>
        );
      })}
    </div>
  );
}
