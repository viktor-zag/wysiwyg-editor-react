export const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "INFO_ELEMENT":
        return "info_element";
      case "code-block":
        return "code_block_preview";
      default:
        break;
    }
  };