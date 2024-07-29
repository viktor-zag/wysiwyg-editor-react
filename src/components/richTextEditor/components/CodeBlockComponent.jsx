import React, { useRef, useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from '@uiw/codemirror-themes-all';
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { xml } from "@codemirror/lang-xml";
import CustomSelect from './CustomSelect';
import { ReactComponent as CopyIcon } from "../../../assets/icons/copy.svg";


const CodeBlockComponent = (props) => {
  console.log('hit code component')
  const [codeLanguage, setCodeLanguage] = useState(props.codeLang ? props.codeLang : "JavaScript")
  const [codeValue, setCodeValue] = useState(props.codeValue ? props.codeValue : "var noCode = null;")


  const handleLanguageChange = (value) => {
    setCodeLanguage(value.toLowerCase());
  };

  const languageList = ["HTML", "XML", "CSS", "JavaScript", "TypeScript"];

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case "javascript":
      case "typescript":
      case "jsx":
        return javascript();
      case "html":
        return html();
      case "css":
        return css();
      case "xml":
        return xml();
      // Add more cases for other languages as needed
      default:
        return javascript(); // default to javascript if language is not found
    }
  };

  const copyCode = (e) => {
    e.preventDefault()
  }
  /*
  Code values coming in from props
  - codeLang
  - codeValue
  */
  return (
    <div className='formatted_code_block' data-offset-key={props.offsetKey}>
      <div className="code_block_header">
        <div className="code_block_header_left">
          <CustomSelect
            options={languageList}
            setValue={handleLanguageChange}
            initialOption={codeLanguage}
          />
        </div>
        <div className="code_block_header_right">
          <button
            className={`icon_button tool_bar`}
            onClick={(e) => copyCode(e)}
            onMouseDown={(e) => e.preventDefault()}
          >
            <CopyIcon />
            <span className="wysiwyg_tool_tip">
              Copy Code
            </span>
          </button>
        </div>
      </div>
      <CodeMirror
        value={codeValue}
        height="200px"
        extensions={[getLanguageExtension(codeLanguage.toLowerCase()), vscodeDark]}
        onChange={(value) => setCodeValue(value)}
      />
    </div>
  );
};

export default CodeBlockComponent;
