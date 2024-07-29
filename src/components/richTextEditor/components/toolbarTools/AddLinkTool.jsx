import React, { useCallback } from "react";
import { ReactComponent as LinkIcon } from "../../../../assets/icons/link.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";
import { getSelectedText } from "../../helpers/utils";

export default function AddLinkTool() {
  const { setLinkModal, setUrlValue,
    setLabelValue, editorState, hrefRef } = useRichTextEditor();

  const handleOpenLinkModal = useCallback((e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      let label = contentState.getBlockForKey(startKey).getText().slice(startOffset, selection.getEndOffset());
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
        label = linkInstance.getData().label || label;
      }

      // show the inputs
      setLinkModal(true);
      setUrlValue(url);
      setLabelValue(label);

      setTimeout(() => hrefRef.current.focus(), 0);
    } else {
      // toast here saying "Please select some text first"
      console.log('Please select some text first')
      return
    }
  }, [editorState]);


  return (
    <button
      className="icon_button tool_bar heading"
      onClick={e => handleOpenLinkModal(e)}
      onMouseDown={(e) => e.preventDefault()}
    >
      <LinkIcon />
      <span className="wysiwyg_tool_tip">Link</span>
    </button>
  );
}
