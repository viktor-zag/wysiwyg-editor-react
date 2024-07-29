import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as FontcolorIcon } from "../../../../assets/icons/fontcolor.svg";
// state
import { useRichTextEditor } from '../../contexts/RichTextEditorContext';


const deepFontColors = [
    "#D0C031",
    "#D0481C",
    "#1B5E20",
    "#0D47A1",
    "#4A148C",
    "#D07C00",
    "#006064",
    "#B12917",
];


export default function ColorTextTool() {
    const colorDropDownRef = useRef(null);
    const [currentStyle, setCurrentStyle] = useState('')
    const {
        colorDdOpen,
        setColorDropDown,
        applyStyle,
        defaultTextColor,
        isActive
    } = useRichTextEditor();

    const handleDropDown = (e) => {
        e.preventDefault()
        if (colorDdOpen) {
            setColorDropDown(false)
        } else {
            setColorDropDown(true)
        }
    }

    const handleClickOutside = (event) => {
        if (
            colorDropDownRef.current &&
            !colorDropDownRef.current.contains(event.target)
        ) {
            event.stopPropagation();
            setColorDropDown(false)
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
            <FontcolorIcon />
            <span className="wysiwyg_tool_tip">Font Color</span>
            {/* drop down content */}
            <div
                className={`tool_bar_dd_content color_dd ${colorDdOpen ? "active" : ""
                    }`}
                ref={colorDropDownRef}
            >
                <div className="highlight_colors">
                    {deepFontColors.map((c) => (
                        <button
                            key={c}
                            className={`color_swatch ${isActive(c, 'inline') ? 'active' : ""}`}
                            onClick={e => {
                                applyStyle(e, c, 'inline')
                                setCurrentStyle(c)
                                setColorDropDown(false)
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            style={{ backgroundColor: c }}
                        ></button>
                    ))}
                </div>

                <button
                    className='tool_bar_dd_item p center clear_style_btn'
                    onClick={e => {
                        console.log('Clearing color, current color: ', currentStyle)
                        // and set new state as default
                        if (currentStyle !== "") {
                            applyStyle(e, currentStyle, 'inline')
                            setCurrentStyle('')
                            setColorDropDown(false)
                        }
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    Default
                </button>

            </div>
        </div>
    )
}
