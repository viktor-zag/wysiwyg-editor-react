import React, { useState, useRef, useCallback, useEffect } from 'react';
import { convertToRaw, CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

// Styling for the components
const styles = {
  root: {
    fontFamily: 'arial',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ddd',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: 'arial',
    marginRight: 10,
    padding: 3,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};

// Main component for the link editor example
const LinkEditorExample = () => {
  // State to manage the editor content
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
  // State to show/hide URL input
  const [showURLInput, setShowURLInput] = useState(false);
  // State to manage the URL value
  const [urlValue, setUrlValue] = useState('');
  // State to manage the label value
  const [labelValue, setLabelValue] = useState('');
  // Refs for editor and URL input
  const editorRef = useRef(null);
  const urlRef = useRef(null);

  // Function to focus the editor
  const focus = useCallback(() => {
    editorRef.current.focus();
  }, []);

  // Function to handle changes in the editor state
  const handleChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  // Function to log the current state of the editor
  const logState = useCallback(() => {
    const content = editorState.getCurrentContent();
    console.log(convertToRaw(content));
  }, [editorState]);

  // Function to prompt for a link, showing the URL input modal
  // this has been added to the tool button
  const promptForLink = useCallback((e) => {
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
      setShowURLInput(true);
      setUrlValue(url);
      setLabelValue(label);

      setTimeout(() => urlRef.current.focus(), 0);
    }
  }, [editorState]);

  // Function to confirm the link and update the editor state
  const confirmLink = useCallback((e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue, label: labelValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    // close modal
    setShowURLInput(false);
    // clear values
    setUrlValue('');
    setLabelValue('');
    // focus editor
    setTimeout(() => editorRef.current.focus(), 0);
  }, [editorState, urlValue, labelValue]);

  // Function to handle Enter key press in the URL input
  const handleLinkInputKeyDown = useCallback((e) => {
    if (e.which === 13) {
      confirmLink(e);
    }
  }, [confirmLink]);

  // Function to remove a link from the selected text
  const removeLink = useCallback((e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  }, [editorState]);

  // Effect hook to handle keyboard shortcuts
  useEffect(() => {
    const handleKeyCommand = (e) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        promptForLink(e);
      }
    };

    document.addEventListener('keydown', handleKeyCommand);
    return () => {
      document.removeEventListener('keydown', handleKeyCommand);
    };
  }, [promptForLink]);

  // URL input component to show/hide URL input
  const urlInput = showURLInput && (
    <URLInput
      urlValue={urlValue}
      labelValue={labelValue}
      onChangeUrl={(e) => setUrlValue(e.target.value)}
      onChangeLabel={(e) => setLabelValue(e.target.value)}
      onKeyDown={handleLinkInputKeyDown}
      onConfirm={confirmLink}
      ref={urlRef}
    />
  );

  return (
    <div style={styles.root}>
      <Instructions />
      <div style={styles.buttons}>
        <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
          Add Link
        </button>
        <button onMouseDown={removeLink}>Remove Link</button>
      </div>
      {urlInput}
      <div style={styles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={handleChange}
          placeholder="Enter some text..."
          ref={editorRef}
        />
      </div>
      <input onClick={logState} style={styles.button} type="button" value="Log State" />
    </div>
  );
};

// Component to show instructions
const Instructions = () => (
  <div style={{ marginBottom: 10 }}>
    Select some text, then use the buttons to add or remove links on the selected text. You can also use Ctrl + L to add a link.
  </div>
);

// URL input component
const URLInput = React.forwardRef(({ urlValue, labelValue, onChangeUrl, onChangeLabel, onKeyDown, onConfirm }, ref) => (
  <div style={styles.urlInputContainer}>
    <input
      onChange={onChangeLabel}
      style={styles.urlInput}
      type="text"
      value={labelValue}
      placeholder="Label"
    />
    <input
      onChange={onChangeUrl}
      ref={ref}
      style={styles.urlInput}
      type="text"
      value={urlValue}
      placeholder="URL"
      onKeyDown={onKeyDown}
    />
    <button onMouseDown={onConfirm}>Confirm</button>
  </div>
));

// Function to find link entities in the content
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    },
    callback
  );
}

// Component to render the link
const Link = (props) => {
  const { url, label } = props.contentState.getEntity(props.entityKey).getData();
  return <a href={url} style={{ color: "blue", textDecoration: "underline" }}>{label || props.children}</a>;
};

// Decorator to handle link rendering
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export default LinkEditorExample;
