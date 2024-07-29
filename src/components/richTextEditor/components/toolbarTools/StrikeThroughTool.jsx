import React from 'react'
import { ReactComponent as StrikeIcon } from "../../../../assets/icons/strike.svg";
import { isMac } from '../../helpers/helpers';
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"

export default function StrikeThroughTool() {
const { applyStyle, isActive, setMoreToolDd } = useRichTextEditor()

    return (
        <button
            className={`icon_button tool_bar ${isActive('STRIKETHROUGH', 'inline') ? 'active' : ""}`}
            onClick={(e) => {
                applyStyle(e, 'STRIKETHROUGH', 'inline')
                setMoreToolDd(false);
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <StrikeIcon />
            <span className="wysiwyg_tool_tip">
                Strike Through{" "}
                <span className="key_command">
                    alt + s
                </span>
            </span>
        </button>
    )
}
