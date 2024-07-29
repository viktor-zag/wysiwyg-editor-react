import React from 'react'
import { ReactComponent as UnderlineIcon } from "../../../../assets/icons/underline.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"
import { isMac } from '../../helpers/helpers';

export default function UnderlineTool() {
    const { applyStyle, isActive, setMoreToolDd } = useRichTextEditor()


    return (
        <button
            className={`icon_button tool_bar ${isActive('UNDERLINE', 'inline') ? 'active' : ""}`}
            onClick={(e) => {
                applyStyle(e, 'UNDERLINE', 'inline')
                setMoreToolDd(false);
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <UnderlineIcon />
            <span className="wysiwyg_tool_tip">
                Underline{" "}
                <span className="key_command">
                    {isMac ? "cmd + u" : "ctrl + u"}
                </span>
            </span>
        </button>
    )
}
