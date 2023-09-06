import { useState } from 'react';

export default function TextExpander({
  expanded = false,
  collapsedNumWords = 10,
  expandButtonText = 'Show',
  collapseButtonText = 'Collapse',
  buttonColor = '#ff6622',
  className,
  children,
}) {
  //   const initText = expanded ? children : children.split(' ').slice(0, collapsedNumWords).join(' ');
  const initText = children.split(' ').slice(0, collapsedNumWords).join(' ');
  const [showText, setShowText] = useState(expanded);
  const [text, setText] = useState(expanded ? children : initText);

  function expandTextHandler() {
    if (showText) {
      setText(initText);
    } else {
      setText(children);
    }

    setShowText((showText) => !showText);
  }

  return (
    <div className={className}>
      <p>{text}</p>

      <button
        style={{ backgroundColor: buttonColor }}
        onClick={expandTextHandler}
      >
        {!showText ? expandButtonText : collapseButtonText}
      </button>
    </div>
  );
}
