import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import the CSS file for styling
import { ReactComponent as CopyIcon } from "../../../assets/icons/copy.svg";

const CodeReadOnlyBlock = (props) => {
  const codeRef = useRef(null);
  const { language, codeContent } = props.blockProps;

  const copyCode = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(codeContent)
      .then(() => {
        console.log('copied code!')
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    hljs.highlightElement(codeRef.current);
  }, [codeContent]);

  return (
    <div
      data-offset-key={props.offsetKey}
      className="formatted_code_block read_only"
    >
      <div className="code_block_header code_block_header_read_only">
        <p className="code_block_lang_text">{language}</p>
        <button
          className="icon_button tool_bar"
          onClick={copyCode}
          onMouseDown={(e) => e.preventDefault()}
        >
          <CopyIcon />
          <span className="wysiwyg_tool_tip">Copy Code</span>
        </button>
      </div>
      <pre className="code_block_cont">
        <code ref={codeRef} className={language.toLowerCase()}>
          {codeContent && codeContent.trim()}
        </code>
      </pre>
    </div>
  );
};

export default CodeReadOnlyBlock;
