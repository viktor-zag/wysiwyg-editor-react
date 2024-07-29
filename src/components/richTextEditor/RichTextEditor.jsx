import React from "react";
import ToolBar from "./components/ToolBar";
import AddCodeModal from "./components/modals/AddCodeModal";
import AddLinkModal from "./components/modals/AddLinkModal";
import "highlight.js/styles/github.css";
import "./style.css"
import { RichTextEditorProvider } from './contexts/RichTextEditorContext';
import RichTextInput from "./components/RichTextInput";
// helpers

export default function RichTextEditor({ options }) {

  return (
    <RichTextEditorProvider>
      <div className="editable_container_cont">
          <AddCodeModal />
          <AddLinkModal />
          <RichTextInput options={options}/>
      </div>
    </RichTextEditorProvider>
  );
}
