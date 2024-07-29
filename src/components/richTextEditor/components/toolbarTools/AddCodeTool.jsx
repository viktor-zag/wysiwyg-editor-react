import React from 'react'
import { ReactComponent as CodeIcon } from "../../../../assets/icons/code.svg";
import { useRichTextEditor } from '../../contexts/RichTextEditorContext';

export default function AddCodeTool() {

    const {
        setCodeModal,

    } = useRichTextEditor();


    const handleTriggerAddCode = (e) => {
        e.preventDefault()

        // show the modal
        setCodeModal(true)
    }

    return (
        <button
            className="icon_button tool_bar heading"
            onClick={e => handleTriggerAddCode(e)}
            onMouseDown={(e) => e.preventDefault()}
        >
            <CodeIcon />
            <span className="wysiwyg_tool_tip">Code Block</span>
        </button>
    )
}
