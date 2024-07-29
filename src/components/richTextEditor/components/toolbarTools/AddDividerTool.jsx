import React from "react";
import { ReactComponent as DividerIcon } from "../../../../assets/icons/divider.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";

export default function AddDividerTool() {
  // state
  const { insertHrBlock } = useRichTextEditor();

  const createDivider = (e) => {
    e.preventDefault();
    insertHrBlock();
    console.log("Create Divider");
  };

  return (
    <button
      className="icon_button tool_bar heading"
      onClick={(e) => createDivider(e)}
      onMouseDown={(e) => e.preventDefault()}
    >
      <DividerIcon />
      <span className="wysiwyg_tool_tip">Divider</span>
    </button>
  );
}
