/**
 * シンプルなマークダウンレンダラー
 * 対応: h2, h3, p, ul, ol
 */
export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listCounter = 0;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType;
      const listKey = `list-${listCounter++}`;
      elements.push(
        <ListTag
          key={listKey}
          className={`my-4 space-y-2 pl-6 ${listType === 'ol' ? 'list-decimal' : 'list-disc'}`}
        >
          {currentList.map((item, i) => (
            <li key={i} className="text-text-light">{item}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${index}`} className="mt-8 mb-4 font-display text-xl tracking-wide text-text">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${index}`} className="mt-6 mb-3 font-display text-lg tracking-wide text-text">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(trimmed.slice(2));
    } else if (/^\d+\. /.test(trimmed)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(trimmed.replace(/^\d+\. /, ''));
    } else if (trimmed === '') {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={`p-${index}`} className="my-4 leading-relaxed text-text-light">
          {trimmed}
        </p>
      );
    }
  });

  flushList();

  return <div className="prose-custom">{elements}</div>;
}
