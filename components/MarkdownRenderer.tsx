import React from 'react';

interface MarkdownRendererProps {
  markdown: string;
}

// A simple component to render basic markdown to React elements.
// This avoids adding a heavy library for this specific use case.
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  // FIX: Changed index type to React.Key and return type to React.ReactElement
  const renderLine = (line: string, index: React.Key): React.ReactElement | null => {
    if (line.startsWith('# ')) {
      return <h1 key={index}>{line.substring(2)}</h1>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={index}>{line.substring(3)}</h2>;
    }
    if (line.startsWith('### ')) {
      return <h3 key={index}>{line.substring(4)}</h3>;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return <li key={index}>{line.substring(2)}</li>;
    }
    if (/^\d+\.\s/.test(line)) {
        return <li key={index}>{line.replace(/^\d+\.\s/, '')}</li>
    }
    if (line.trim() === '') {
      return null;
    }
    return <p key={index}>{line}</p>;
  };

  const renderContent = () => {
    // FIX: Changed JSX.Element to React.ReactElement
    const elements: React.ReactElement[] = [];
    const lines = markdown.split('\n');
    
    let currentListType: 'ul' | 'ol' | null = null;
    // FIX: Changed JSX.Element to React.ReactElement
    let listItems: React.ReactElement[] = [];

    const closeList = () => {
        if(currentListType === 'ul') {
            elements.push(<ul key={elements.length}>{listItems}</ul>);
        } else if (currentListType === 'ol') {
            elements.push(<ol key={elements.length}>{listItems}</ol>);
        }
        listItems = [];
        currentListType = null;
    }

    // Handle multiline code blocks
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)\n```/g;
    const parts = markdown.split(codeBlockRegex);

    let partIndex = 0;
    for (let i = 0; i < parts.length; i++) {
        const content = parts[i];
        if (i % 3 === 0) { // Regular markdown content
            const lines = content.split('\n');
            lines.forEach((line, lineIndex) => {
                const isUl = line.startsWith('- ') || line.startsWith('* ');
                const isOl = /^\d+\.\s/.test(line);

                if (isUl) {
                    if (currentListType !== 'ul') {
                        closeList();
                        currentListType = 'ul';
                    }
                    // FIX: Key is now a string, which is valid for React.Key
                    listItems.push(renderLine(line, `line-${partIndex}-${lineIndex}`)!);
                } else if (isOl) {
                     if (currentListType !== 'ol') {
                        closeList();
                        currentListType = 'ol';
                    }
                    // FIX: Key is now a string, which is valid for React.Key
                    listItems.push(renderLine(line, `line-${partIndex}-${lineIndex}`)!);
                } else {
                    closeList();
                    // Process inline code
                    // FIX: Key is now a string, which is valid for React.Key
                    const p = renderLine(line, `line-${partIndex}-${lineIndex}`);
                    if(p && typeof p.props.children === 'string') {
                         const inlineCodeRegex = /`([^`]+)`/g;
                         const children = [];
                         let lastIndex = 0;
                         let match;
                         while((match = inlineCodeRegex.exec(p.props.children)) !== null) {
                            if(match.index > lastIndex) {
                                children.push(p.props.children.substring(lastIndex, match.index));
                            }
                            children.push(<code key={match.index}>{match[1]}</code>);
                            lastIndex = match.index + match[0].length;
                         }
                         if(lastIndex < p.props.children.length) {
                             children.push(p.props.children.substring(lastIndex));
                         }

                        elements.push(React.cloneElement(p, {children: children}));
                    } else if (p) {
                        elements.push(p);
                    }
                }
            });
             partIndex++;
        } else if (i % 3 === 2) { // Code block content
            closeList();
            elements.push(<pre key={`code-${partIndex}`}><code className={`language-${parts[i-1]}`}>{content.trim()}</code></pre>);
            partIndex++;
        }
    }

    closeList(); // Ensure any trailing list is closed

    return elements;
  };

  return <>{renderContent()}</>;
};
