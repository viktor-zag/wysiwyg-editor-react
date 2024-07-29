import React, { useEffect, useState, useCallback } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";
import { EditorState, Modifier, RichUtils, SelectionState } from "draft-js";

const urlRegex =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[a-z\d_]*)?$/i;

const AddLinkModal = () => {
  const {
    linkModalOpen,
    setLinkModal,
    setEditorState,
    editorState,
    focusEditor,
    setUrlValue,
    setLabelValue,
    urlValue,
    labelValue,
    hrefRef,
    editorRef,
  } = useRichTextEditor();


  const handleClose = (e) => {
    e.preventDefault();
    // clear out the label
    setUrlValue('')
    setLabelValue('')
    setLinkModal(false);
    focusEditor();
  };

  const confirmLink = useCallback((e) => {
    e.preventDefault();
    // Validate the URL
    if (!urlRegex.test(urlValue)) {
      console.log("Please include a valid link");
      return;
    }
    const contentState = editorState.getCurrentContent();
    // Create a new entity and get its key
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      url: urlValue,
      label: labelValue,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // Create a new editor state with the updated content state
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    // Apply the entity to the selected text using RichUtils.toggleLink
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    // Close the modal and clear input values
    setLinkModal(false);
    setUrlValue('');
    setLabelValue('');
    // Focus the editor
    setTimeout(() => editorRef.current.focus(), 0);
  }, [editorState, urlValue, labelValue, setEditorState, setLinkModal, setUrlValue, setLabelValue, editorRef]);
  
  

  const handleCreateLink = (e) => {
    e.preventDefault();
    if (!labelValue) {
      console.log("Please include a label for the link");
      return;
    }
    if (!urlValue) {
      console.log("Please include a link for the link");
      return;
    }
    // add create link here
    console.log("Link Data: ", { labelValue, urlValue });
    // create the link
    confirmLink(e);
  };

  if (!linkModalOpen) {
    return null;
  }

  return (
    <div className="hub_modal_outer_cont">
      <div className="hub_modal fit_content shade0">
        <button
          className="modal_close icon_button"
          onClick={(e) => handleClose(e)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <CloseIcon />
        </button>
        <div className="hub_modal_header">
          <h3>Add a Link</h3>
        </div>
        <div className="hub_modal_content fit_content">
          <div className="form_cont create">
            <div className="form_group">
              <label htmlFor="label">Link Label</label>
              <input

                type="text"
                placeholder="Label..."
                name="label"
                onChange={e => setLabelValue(e.target.value)}
                value={labelValue || ""}
              />
            </div>
            <div className="form_group">
              <label htmlFor="href">Link href</label>
              <input
                ref={hrefRef}
                type="text"
                name="href"
                onChange={e => setUrlValue(e.target.value)}
                value={urlValue || ""}
                placeholder="https://www.mylink.com..."
              />
            </div>
          </div>
        </div>
        <div className="hub_modal_footer">
          <div className="hub_footer_actions">
            <button
              className="form_action_btn"
              onClick={e => handleCreateLink(e)}
              onMouseDown={(e) => e.preventDefault()}
            >
              Add Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddLinkModal;
