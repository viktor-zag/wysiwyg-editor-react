import { getDefaultKeyBinding, RichUtils } from "draft-js";

export const getSelectedText = (editorState) => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const anchorOffset = selectionState.getAnchorOffset();
  const focusKey = selectionState.getFocusKey();
  const focusOffset = selectionState.getFocusOffset();
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  let selectedText = "";
  blockMap.forEach((block) => {
    const key = block.getKey();
    if (key === anchorKey || key === focusKey) {
      const text = block.getText();
      const start = key === anchorKey ? anchorOffset : 0;
      const end = key === focusKey ? focusOffset : text.length;
      selectedText += text.slice(start, end);
    }
  });
  return selectedText;
};


// key command utils
export const myKeyBindingFn = (e) => {
  console.log(e);
  console.log(e.keyCode);
  console.log(e.key);
  // check for "ctrl + /" to clear styles
  if (e.keyCode === 191 && isCtrlKey(e)) {
    return 'clear-styles';
  }
  // check for "alt + 1" to create ordered list
  if (e.keyCode === 49 && isAltKey(e)) {
    return 'ordered-list';
  }
  // check for "alt + u" to create ordered list
  if (e.keyCode === 85 && isAltKey(e)) {
    return 'unordered-list';
  }
  // check for "alt + s" to create ordered list
  if (e.keyCode === 83 && isAltKey(e)) {
    return 'strike-through';
  }
  // check for "alt + s" to create ordered list
  if (e.keyCode === 77 && isAltKey(e)) {
    return 'mono-type';
  }
  // put other key commands here
  return getDefaultKeyBinding(e);
};


// handle ctrl click
export const isCtrlKey = (e) => {
  if (e.ctrlKey) {
    return true
  } else {
    return false
  }
}
// handle alt key click
export const isAltKey = (e) => {
  if (e.altKey) {
    return true
  } else {
    return false
  }
}
// handle shift Key click
export const isShiftKey = (e) => {
  if (e.shiftKey) {
    return true
  } else {
    return false
  }
}