import { useState } from 'react';

export default function TextExpander({
  expanded = false,
  collapsedNumWords = 10,
  expandButtonText,
  collapseButtonText,
  buttonColor = '#ff6622',
  children,
}) {
  const initText = children.split(' ').slice(0, collapsedNumWords).join(' ');
  //   const [showText, setShowText] = useState(false);
  const [showText, setShowText] = useState(expanded);
  const [text, setText] = useState(expanded ? children : initText);

  function expandTextHandler() {
    if (showText) {
      //   setText((currentText) => currentText.split(' ').slice(0, 10).join(' '));
      setText(initText);
    } else {
      setText(children);
    }

    setShowText((showText) => !showText);
  }

  return (
    <div>
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
