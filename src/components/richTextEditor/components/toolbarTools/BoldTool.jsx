import React from 'react'
import { ReactComponent as BoldIcon } from "../../../../assets/icons/bold.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"
import { isMac } from '../../helpers/helpers';

export default function BoldTool() {
    const { applyStyle, isActive } = useRichTextEditor()

    return (
        <button
            className={`icon_button tool_bar ${isActive('BOLD', 'inline') ? 'active' : ""}`}
            onClick={(e) => applyStyle(e, 'BOLD', 'inline')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <BoldIcon />
            <span className="wysiwyg_tool_tip">
                Bold{" "}
                <span className="key_command">{isMac ? "cmd + b" : "ctrl + b"}</span>
            </span>
        </button>
    )
}
