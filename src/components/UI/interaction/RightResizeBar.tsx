import React, {RefObject} from "react";
import styled from "styled-components";

const Bar = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(50%);
  height: 100%;
  width: 6px;
  
  &:hover {
    cursor: e-resize;
  }
`;

function RightResizeBar(props: { toResize: RefObject<HTMLElement>, className?: string }) {
    function resize(e: MouseEvent) {
        props.toResize.current!.style.width = e.pageX - props.toResize.current!.getBoundingClientRect().left + 'px';
    }

    function stopResize(e: MouseEvent) {
        window.removeEventListener('mousemove', resize);
    }

    function handleResizer(e: React.MouseEvent) {
        if (props.toResize.current) {
            e.preventDefault();
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        }
    }

    return <Bar onMouseDown={handleResizer}/>
}

export default RightResizeBar;