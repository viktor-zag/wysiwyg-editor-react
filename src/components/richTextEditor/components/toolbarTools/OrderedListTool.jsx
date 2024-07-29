import React from 'react'
import { ReactComponent as OLIcon } from "../../../../assets/icons/ordered-list.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"
import { isMac } from '../../helpers/helpers';


export default function OrderedListTool() {
    const { applyStyle, isActive } = useRichTextEditor()
    return (
        <button
            className={`icon_button tool_bar ${isActive('ordered-list-item', 'block') ? 'active' : ""}`}
            onClick={(e) => applyStyle(e, 'ordered-list-item', 'block')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <OLIcon />
            <span className="wysiwyg_tool_tip">
                Ordered List{" "}
                <span className="key_command">alt + 1</span>
            </span>
        </button>
    )
}
