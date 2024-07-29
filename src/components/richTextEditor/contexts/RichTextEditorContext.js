import React, { createContext, useContext, useState, useRef } from "react";

import {
  EditorState,
  Modifier,
  RichUtils,
  ContentBlock,
  genKey,
  SelectionState,
  CompositeDecorator,
  AtomicBlockUtils,
} from "draft-js";
import LinkComponent from "../components/LinkComponent";
import CodeBlockComponent from "../components/CodeBlockComponent";

const RichTextEditorContext = createContext();
// add custom link
// Function to find link entities in the content
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

function findCodeBlockEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "CODE_BLOCK"
    );
  }, callback);
}

// Decorator to handle link rendering
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkComponent,
  },
  {
    strategy: findCodeBlockEntities,
    component: CodeBlockComponent,
  },
]);

export const useRichTextEditor = () => {
  return useContext(RichTextEditorContext);
};

export const RichTextEditorProvider = ({ children }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  const [state, setState] = useState({
    colorDdOpen: false,
    linkModalOpen: false,
    codeModalOpen: false,
    highlightDdOpen: false,
    textAlignDdOpen: false,
    paragraphDdOpen: false,
    toolBarBoldActive: false,
    toolBarColorActive: false,
    toolBarItalicActive: false,
    toolBarBkgColorActive: false,
    toolBarColor: "", // string of what color is selected to highlight the tool
    toolBarBkgColor: "", // string of what color is selected to highlight the tool
    toolBarParagraph: "", // string of what the parent is
    // link test
    urlValue: "",
    labelValue: "",
    codeLang: "javascript",
    codeValue: "",
  });
  // const { codeLang, codeValue } = state;
  const editorRef = useRef(null);
  const hrefRef = useRef(null);

  const focusEditor = () => {
    editorRef.current.focus();
  };

  const blurEditor = () => {
    if (editorRef.current) {
      console.log("unfocus editor");
      editorRef.current.blur();
    }
  };

  // clear format function
  const clearFormatting = () => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    // Remove inline styles
    const stylesToRemove = [
      "STRIKETHROUGH",
      "header-one",
      "header-two",
      "header-three",
      "header-four",
      "BOLD",
      "ITALIC",
      "UNDERLINE",
      "INFO_ELM",
      "MONOSPACE",
      "CODE",
      "#D0C031",
      "#D0481C",
      "#1B5E20",
      "#0D47A1",
      "#4A148C",
      "#D07C00",
      "#006064",
      "#B12917",
      "#FFEB3B",
      "#FF5722",
      "#4CAF50",
      "#2196F3",
      "#9C27B0",
      "#FF9800",
      "#00BCD4",
      "#eb361e",
    ];
    let newContentState = stylesToRemove.reduce((content, style) => {
      return Modifier.removeInlineStyle(content, selection, style);
    }, contentState);

    // Remove block type
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-inline-style"
    );
    setEditorState(RichUtils.toggleBlockType(newEditorState, "unstyled"));
  };

  // toggle hr element
  const insertHrBlock = () => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    // Create a new ContentBlock for the <hr> element
    const hrBlock = new ContentBlock({
      key: genKey(),
      type: "hr",
      text: "",
    });

    // Create a new ContentBlock for the paragraph after the <hr>
    const newBlock = new ContentBlock({
      key: genKey(),
      type: "unstyled",
      text: "",
    });

    const blockMap = contentState.getBlockMap();
    const blocksBefore = blockMap
      .toSeq()
      .takeUntil(
        (v) => v === contentState.getBlockForKey(selectionState.getStartKey())
      );
    const blocksAfter = blockMap
      .toSeq()
      .skipUntil(
        (v) => v === contentState.getBlockForKey(selectionState.getStartKey())
      )
      .rest();

    const newBlocks = blocksBefore
      .concat(
        [
          [
            contentState.getBlockForKey(selectionState.getStartKey()).getKey(),
            contentState.getBlockForKey(selectionState.getStartKey()),
          ],
          [hrBlock.getKey(), hrBlock],
          [newBlock.getKey(), newBlock],
        ],
        blocksAfter
      )
      .toOrderedMap();

    const newContentState = contentState.merge({
      blockMap: newBlocks,
      selectionBefore: selectionState,
      selectionAfter: SelectionState.createEmpty(newBlock.getKey()),
    });

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-fragment"
    );
    setEditorState(newEditorState);
  };

  // drop down state managers
  const setParaDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, paragraphDdOpen: payload }));
  };

  // background highlight drop down
  const setHighlightDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, highlightDdOpen: payload }));
  };

  // Font color drop down
  const setColorDropDown = (payload) => {
    setState((prevState) => ({ ...prevState, colorDdOpen: payload }));
  };

  // value for the link modal
  const setUrlValue = (payload) => {
    setState((prevState) => ({ ...prevState, urlValue: payload }));
  };

  // value for the link modal
  const setLabelValue = (payload) => {
    setState((prevState) => ({ ...prevState, labelValue: payload }));
  };
  // value for the link modal
  const setCodeLanguage = (payload) => {
    setState((prevState) => ({ ...prevState, codeLang: payload }));
  };

  // value for the link modal
  const setCodeValue = (payload) => {
    setState((prevState) => ({ ...prevState, codeValue: payload }));
  };

  const setLinkModal = (payload) => {
    setState((prevState) => ({ ...prevState, linkModalOpen: payload }));
  };

  const setCodeModal = (payload) => {
    setState((prevState) => ({ ...prevState, codeModalOpen: payload }));
  };

  const setMoreToolDd = (payload) => {
    setState((prevState) => ({ ...prevState, textAlignDdOpen: payload }));
  };

  // Toolbar states
  const setToolBarBoldActive = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarBoldActive: payload }));
  };

  const setToolBarItalicActive = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarItalicActive: payload }));
  };

  const setToolBarBkgColorActive = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarBkgColorActive: payload }));
  };

  const setToolBarBkgColor = (payload) => {
    setState((prevState) => ({ ...prevState, toolBarBkgColor: payload }));
  };

  // apply block or inline style
  const applyStyle = (e, style, method) => {
    e.preventDefault();
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  // apply block or inline style
  const keyCodeApplyStyle = (style, method) => {
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // is active function
  const isActive = (style, method) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  // create atomic block
  // const createAtomicBlock = (entityType, entityData) => {
  //   const contentState = editorState.getCurrentContent();
  //   const contentStateWithEntity = contentState.createEntity(
  //     entityType,
  //     "IMMUTABLE",
  //     entityData
  //   );
  //   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  //   const newEditorState = AtomicBlockUtils.insertAtomicBlock(
  //     editorState,
  //     entityKey,
  //     " "
  //   );

  //   const newSelection = newEditorState.getCurrentContent().getSelectionAfter();

  //   return EditorState.forceSelection(newEditorState, newSelection);
  // };
  const createAtomicBlock = ( entityType, entityData) => {
    console.log('hit the block creator');
    
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const currentBlock = contentState.getBlockForKey(selectionState.getStartKey());
    const isAtEndOfBlock = selectionState.getEndOffset() === currentBlock.getLength();
  
    let newContentState = contentState;
    let newSelection = selectionState;
  
    // If the current block is not empty and the cursor is not at the end, move to the next line
    if (currentBlock.getText().trim() !== '' && !isAtEndOfBlock) {
      const newBlockKey = genKey();
      const newBlock = new ContentBlock({
        key: newBlockKey,
        type: 'unstyled',
        text: '',
      });
  
      const blockMap = contentState.getBlockMap();
      const blocksBefore = blockMap.toSeq().takeUntil(v => v === currentBlock);
      const blocksAfter = blockMap.toSeq().skipUntil(v => v === currentBlock).rest();
      const newBlocks = blocksBefore.concat(
        [[currentBlock.getKey(), currentBlock], [newBlockKey, newBlock]],
        blocksAfter
      ).toOrderedMap();
  
      newContentState = contentState.merge({
        blockMap: newBlocks,
        selectionBefore: selectionState,
        selectionAfter: SelectionState.createEmpty(newBlockKey),
      });
  
      newSelection = newContentState.getSelectionAfter().set('focusKey', newBlockKey);
    }
  
    const contentStateWithEntity = newContentState.createEntity(
      entityType,
      "IMMUTABLE",
      entityData
    );
  
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      EditorState.set(editorState, { currentContent: newContentState }),
      entityKey,
      " "
    );
  
    // Create an empty block after the atomic block for typing
    const newBlockKey = genKey();
    const newBlock = new ContentBlock({
      key: newBlockKey,
      type: 'unstyled',
      text: '',
    });
  
    const blockMap = newEditorState.getCurrentContent().getBlockMap();
    const blocksBefore = blockMap.toSeq().takeUntil(v => v === newEditorState.getCurrentContent().getBlockForKey(newSelection.getFocusKey()));
    const blocksAfter = blockMap.toSeq().skipUntil(v => v === newEditorState.getCurrentContent().getBlockForKey(newSelection.getFocusKey())).rest();
    const newBlocks = blocksBefore.concat(
      [[newSelection.getFocusKey(), newEditorState.getCurrentContent().getBlockForKey(newSelection.getFocusKey())], [newBlockKey, newBlock]],
      blocksAfter
    ).toOrderedMap();
  
    newContentState = newEditorState.getCurrentContent().merge({
      blockMap: newBlocks,
      selectionAfter: SelectionState.createEmpty(newBlockKey),
    });
  
    const finalEditorState = EditorState.push(
      newEditorState,
      newContentState,
      'insert-fragment'
    );
  
    const finalSelection = finalEditorState.getCurrentContent().getSelectionAfter();
    return EditorState.forceSelection(finalEditorState, finalSelection);
  };

  return (
    <RichTextEditorContext.Provider
      value={{
        ...state,
        hrefRef,
        isActive,
        editorRef,
        applyStyle,
        blurEditor,
        editorState,
        focusEditor,
        setUrlValue,
        setCodeValue,
        setLinkModal,
        setCodeModal,
        setLabelValue,
        setMoreToolDd,
        insertHrBlock,
        setEditorState,
        setParaDropDown,
        setCodeLanguage,
        clearFormatting,
        setColorDropDown,
        createAtomicBlock,
        keyCodeApplyStyle,
        setToolBarBkgColor,
        setHighlightDropDown,
        setToolBarBoldActive,
        setToolBarItalicActive,
        setToolBarBkgColorActive,
      }}
    >
      {children}
    </RichTextEditorContext.Provider>
  );
};
