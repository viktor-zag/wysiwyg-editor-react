import CodeBlockComponent from "./components/richTextEditor/components/CodeBlockComponent";
import CodeReadOnlyBlock from "./components/richTextEditor/components/CodeReadOnlyBlock";
import RichTextEditor from "./components/richTextEditor/RichTextEditor";
import EntityEditorExample from "./examples/EntityExample";
import RichEditorExample from "./examples/rich";
import LinkEditorExample from "./examples/test";

function App() {
  return (
    <div className="App">
      <div className="content">
        {/* Examples */}
        {/* <EntityEditorExample/> */}
        {/* <LinkEditorExample/> */}
        {/* <RichEditorExample/> */}
        {/* <CodeReadOnlyBlock/> */}
        
        {/* WIP Tool */}
        <RichTextEditor options={{
          tools: {
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
        }} />
      </div>
    </div>
  );
}

export default App;
