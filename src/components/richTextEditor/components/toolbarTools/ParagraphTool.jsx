import React, { useEffect, useRef } from "react";
import { ReactComponent as H1Icon } from "../../../../assets/icons/h1.svg";
import { ReactComponent as H2Icon } from "../../../../assets/icons/h2.svg";
import { ReactComponent as H3Icon } from "../../../../assets/icons/h3.svg";
import { ReactComponent as H4Icon } from "../../../../assets/icons/h4.svg";
// state
import { useRichTextEditor } from "../../contexts/RichTextEditorContext";

export default function ParagraphTool() {



    const {
        paragraphDdOpen,
        setParaDropDown,
        toggleBlockType,
        applyStyle,
        isActive
    } = useRichTextEditor();
    const paragraphDropDownRef = useRef(null);

    const handleOpenDropDown = (e) => {
        e.preventDefault()
        setParaDropDown(true)
    }

    const createHeadings = (e, tag) => {
        e.preventDefault()
        toggleBlockType(tag)
    }

    const handleClickOutside = (event) => {
        if (
            paragraphDropDownRef.current &&
            !paragraphDropDownRef.current.contains(event.target)
        ) {
            event.stopPropagation();
            setParaDropDown(false);
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
                onClick={(e) => handleOpenDropDown(e)}
                onMouseDown={(e) => e.preventDefault()}
            ></button>
            <p>Heading</p>
            <div
                className={`tool_bar_dd_content ${paragraphDdOpen ? "active" : ""}`}
                ref={paragraphDropDownRef}
            >
                <button
                    className={`tool_bar_dd_item h1 ${isActive("header-one", 'block') ? "active" : ""}`}
                    onClick={(e) => {
                        applyStyle(e, "header-one", 'block')
                        // close dropdown
                        setParaDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>Heading 1</span>
                    <H1Icon />
                </button>
                <button
                    className={`tool_bar_dd_item h2 ${isActive("header-two", 'block') ? "active" : ""}`}
                    onClick={(e) => {
                        applyStyle(e, "header-two", 'block')
                        // close dropdown
                        setParaDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>Heading 2</span>
                    <H2Icon />
                </button>
                <button
                    className={`tool_bar_dd_item h3 ${isActive("header-three", 'block') ? "active" : ""}`}
                    onClick={(e) => {
                        applyStyle(e, "header-three", 'block')
                        // close dropdown
                        setParaDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>Heading 3</span>
                    <H3Icon />
                </button>
                <button
                    className={`tool_bar_dd_item h4 ${isActive("header-four", 'block') ? "active" : ""}`}
                    onClick={(e) => {
                        applyStyle(e, "header-four", 'block')
                        // close dropdown
                        setParaDropDown(false)
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <span>Heading 4</span>
                    <H4Icon />
                </button>
               
            </div>
        </div>
    )
}
