import React from 'react'
import { ReactComponent as ItalicIcon } from "../../../../assets/icons/italic.svg";
import { isMac } from '../../helpers/helpers';
import { RichUtils } from 'draft-js';
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"

export default function ItalicTool() {
    const { applyStyle, isActive } = useRichTextEditor()

    return (
        <button
        className={`icon_button tool_bar ${isActive('ITALIC', 'inline') ? 'active' : ""}`}
            onClick={e => applyStyle(e, 'ITALIC', 'inline')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <ItalicIcon />
            <span className="wysiwyg_tool_tip">
                Italic{" "}
                <span className="key_command">{isMac ? "cmd + i" : "ctrl + i"}</span>
            </span>
        </button>
    )
}
