import React, {useRef, useState} from "react";
import styled from "styled-components";
import RightResizeBar from "../UI/interaction/RightResizeBar";
import Theme from "../../types/Theme";

interface EditorProps {
    theme: Theme,
    open: boolean,
}

const EditorBody = styled.div`
  position: relative;
  
  margin-top: 12px;
  margin-bottom: 6px;
  min-width: 150px;
  max-width: 275px;
  height: calc(100% - 18px);
  
  background-color: ${(props: EditorProps) => props.theme.primaryColor};
  border: solid 1px ${(props: EditorProps) => props.theme.tertiaryColor};
  border-radius: 0 8px 8px 0;
  border-left-color: transparent;
  
  left: ${(props: EditorProps) => props.open ? '0' : '-1000px'};
`

const CloseBar = styled.div`
  position: absolute;
  
  width: 22px;
  height: 100%;
  right: -1px;
  top: -1px;
  transform: translate(-1px, 1px);
  
  border-width: 0;

  border-radius: 0 7px 7px 0;
  
  &:hover {
    // background-color: ${(props: { theme: Theme }) => props.theme.tertiaryColor};
    background-color: rgba(0, 0, 0, 0.05);
    transition: background-color 100ms ease-out;
  }
`

function ScheduleEditor() {
    const editorRef = useRef<HTMLDivElement>(null);
    const [editorOpen, setEditorOpen] = useState(true);

    return (
        <EditorBody ref={editorRef} open={editorOpen}>
            <RightResizeBar toResize={editorRef} />
            <CloseBar />
        </EditorBody>
    )
}

export default ScheduleEditor;