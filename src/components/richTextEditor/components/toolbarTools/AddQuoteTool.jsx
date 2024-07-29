import React from 'react'
import { ReactComponent as QuoteIcon } from "../../../../assets/icons/quote.svg";
// state
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";


export default function AddQuoteTool() {
    const {
        isActive,
        applyStyle
    } = useRichTextEditor();

    return (
        <button
            className={`icon_button tool_bar heading ${isActive("blockquote", 'block')? 'active':''}`}
            onClick={(e) => applyStyle(e, "blockquote", 'block')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <QuoteIcon />
            <span className="wysiwyg_tool_tip">Quote</span>
        </button>
    )
}
