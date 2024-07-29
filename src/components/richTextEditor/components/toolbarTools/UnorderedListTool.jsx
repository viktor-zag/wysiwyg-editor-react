import React from 'react'
import { ReactComponent as ULIcon } from "../../../../assets/icons/unordered-list.svg";
import { useRichTextEditor } from "../../contexts/RichTextEditorContext"
import { isMac } from '../../helpers/helpers';

export default function UnorderedListTool() {
   const { applyStyle, isActive } = useRichTextEditor()
  return (
     <button
            className={`icon_button tool_bar ${isActive('unordered-list-item', 'block') ? 'active' : ""}`}
            onClick={(e) => applyStyle(e, 'unordered-list-item', 'block')}
            onMouseDown={(e) => e.preventDefault()}
        >
            <ULIcon />
            <span className="wysiwyg_tool_tip">
                Unordered List{" "}
                <span className="key_command">alt + u</span>
            </span>
        </button>
  )
}
