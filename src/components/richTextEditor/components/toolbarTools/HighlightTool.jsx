import React, { useEffect, useState, useRef } from 'react'
import { ReactComponent as HighlightIcon } from "../../../../assets/icons/highlight.svg";
// state
import { useRichTextEditor } from '../../contexts/RichTextEditorContext';

const highlightColors = [
    "#FFEB3B",
    "#FF5722",
    "#4CAF50",
    "#2196F3",
    "#9C27B0",
    "#FF9800",
    "#00BCD4",
    "#eb361e",
];

export default function HighlightTool() {
    const highlightColorDropDownRef = useRef(null);
    const [currentStyle, setCurrentStyle] = useState('')
    const {
        highlightDdOpen,
        setHighlightDropDown,
        applyStyle,
        isActive
    } = useRichTextEditor();

    const handleDropDown = (e) => {
        e.preventDefault()
        if (highlightDdOpen) {
            setHighlightDropDown(false)
        } else {
            setHighlightDropDown(true)
        }
    }

    const handleClickOutside = (event) => {
        if (
            highlightColorDropDownRef.current &&
            !highlightColorDropDownRef.current.contains(event.target)
        ) {
            event.stopPropagation();
            setHighlightDropDown(false);
        }
    };

    // if click outside of dropdowns
    useEffect(() => {
        document.addEventListener("mousedown", (e) => handleClickOutside(e));
        return () => {
            document.removeEventListener("mousedown", (e) => handleClickOutside(e));
        };
    }, []);

    return (
        <div className="icon_button tool_bar tool_bar_dd">
            <button
                className="btn_overlay"
                onClick={handleDropDown}
                onMouseDown={(e) => e.preventDefault()}
            ></button>
            <HighlightIcon />
            <span className="wysiwyg_tool_tip">Highlight Color</span>
            {/* drop down content */}
            <div
                className={`tool_bar_dd_content color_dd ${highlightDdOpen ? "active" : ""
                    }`}
                ref={highlightColorDropDownRef}
            >
                <div className="highlight_colors">
                    {highlightColors.map((c) => (
                        <button
                            key={c}
                            className={`color_swatch ${isActive(c, 'inline') ? 'active' : ""}`}
                            onClick={e => {
                                applyStyle(e, c, 'inline')
                                setCurrentStyle(c)
                                setHighlightDropDown(false)
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            style={{ backgroundColor: c }}
                        ></button>
                    ))}
                </div>

                <button
                    className='tool_bar_dd_item p center clear_style_btn'
                    onClick={e => {
                        console.log('Clearing bkg, current color: ', currentStyle)
                        if (currentStyle !== "") {
                            applyStyle(e, currentStyle, 'inline')
                            setCurrentStyle('')
                            setHighlightDropDown(false)
                        }
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    None
                </button>

            </div>
        </div>
    )
}
