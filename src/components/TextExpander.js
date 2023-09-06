import { useState } from 'react';

export default function TextExpander({
  collapsedNumWords = 10,
  expandButtonText,
  collapseButtonText,
  buttonColor = '#ff6622',
  children,
}) {
  const initText = children.split(' ').slice(0, collapsedNumWords).join(' ');
  const [showText, setShowText] = useState(false);
  const [text, setText] = useState(initText);

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
