import React from 'react'
import { ReactComponent as MonoIcon } from "../../../../assets/icons/monotype.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"
import { isMac } from '../../helpers/helpers';


export default function MonoSpaceTool() {
    const { applyStyle, isActive } = useRichTextEditor()
    return (
        <button
            className={`icon_button tool_bar ${isActive('MONOSPACE', 'inline') ? 'active' : ""}`}
            onClick={(e) => applyStyle(e, 'MONOSPACE', 'inline')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <MonoIcon />
            <span className="wysiwyg_tool_tip">
                Monospace{" "}
                <span className="key_command">alt + m</span>
            </span>
        </button>
    )
}
