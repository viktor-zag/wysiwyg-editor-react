import React from "react";
// helpers
import BoldTool from "./toolbarTools/BoldTool";
import ItalicTool from "./toolbarTools/ItalicTool";
import HighlightTool from "./toolbarTools/HighlightTool";
import ColorTextTool from "./toolbarTools/ColorTextTool";
import ParagraphTool from "./toolbarTools/ParagraphTool";
import MoreTools from "./toolbarTools/MoreTools";
import AddLinkTool from "./toolbarTools/AddLinkTool";
import AddCodeTool from "./toolbarTools/AddCodeTool";
import AddQuoteTool from "./toolbarTools/AddQuoteTool";
import AddDividerTool from "./toolbarTools/AddDividerTool";
import OrderedListTool from "./toolbarTools/OrderedListTool"
import UnorderedListTool from "./toolbarTools/UnorderedListTool";
import InfoTool from "./toolbarTools/InfoTool";
import MonoSpaceTool from "./toolbarTools/MonoSpaceTool";
/*

tool options: {
            bold: true,
            italic: true,
            highlight: true,
            color: true,
            headings: true,
            other: {
              underline: true,
              strikeThrough: true,
              removeFormats: true
            },
            link: true,
            code: true,
            quote: true,
            divider: true,
            orderedList:true,
            unorderedList:true,
            info:true,
            monospace:true,

          }
*/


const ToolBar = ({ options }) => {


  return (
    <div className="wysiwyg_tool_bar">
      {options.tools.bold || !options ? <BoldTool /> : ""}
      {options.tools.italic || !options ? <ItalicTool /> : ""}
      {options.tools.monospace || !options ? <MonoSpaceTool /> : ""}
      {options.tools.highlight || options.tools.color || options.tools.headings ? <div className="wysiwyg_tool_bar_divider"></div> : ""}
      {options.tools.highlight || !options ? <HighlightTool /> : ""}
      {options.tools.color || !options ? <ColorTextTool /> : ""}
      {options.tools.headings || !options ? <ParagraphTool /> : ""}
      {
        options.tools.other.underline ||
          options.tools.other.strikeThrough ||
          options.tools.other.removeFormats || !options ? <MoreTools options={options} /> : ""
      }
      {options.tools.link || options.tools.code || options.tools.quote || options.tools.divider ? <div className="wysiwyg_tool_bar_divider"></div> : ""}
      {options.tools.info || !options ? <InfoTool /> : ""}
      {options.tools.link || !options ? <AddLinkTool /> : ""}
      {options.tools.code || !options ? <AddCodeTool /> : ""}
      {options.tools.quote || !options ? <AddQuoteTool /> : ""}
      {options.tools.divider || !options ? <AddDividerTool /> : ""}
      {options.tools.orderedList || !options ? <OrderedListTool /> : ""}
      {options.tools.unorderedList || !options ? <UnorderedListTool /> : ""}
    </div>
  );
};

export default ToolBar;
