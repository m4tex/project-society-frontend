import React, {useRef} from "react";
import styled from "styled-components";
import RightResizeBar from "../UI/interaction/RightResizeBar";

const EditorBody = styled.div`
  min-width: 225px;
  position: relative;
  height: calc(100% - 40px);
  background-color: aqua;
`

function ScheduleEditor() {
    const editorRef = useRef<HTMLDivElement>(null);

    return (
        <EditorBody ref={editorRef}>
            <RightResizeBar toResize={editorRef} />
        </EditorBody>
    )
}

export default ScheduleEditor;