// components/scroll/scroll.tsx
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import styled from 'styled-components';

const StyledScrollContainer= styled(SimpleBar)<({marginY: string, overflowY: string, overflowX: string})>`
  height: 100%; 
  width: 100%;
  background: transparent;
  overflow-y: ${(props) => props.overflowY};
  overflow-x: ${(props) => props.overflowX};
  
  .simplebar-track {
    margin: ${(props) => props.marginY} 0 !important;
    background: transparent; 
  }

  ::-webkit-scrollbar {
    display: none;
}

  .simplebar-thumb {
    background: rgba(128, 128, 128, 0.8); 
    border-radius: 10px; 
  }

  .simplebar-thumb:hover {
    background: rgba(128, 128, 128, 1);
  }
`;

const ScrollContainer: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; marginY: string; overflowX:string; overflowY: string }> = ({ marginY,overflowY, overflowX, children, style }) => {
  return <StyledScrollContainer overflowY={overflowY} overflowX={overflowX} marginY={marginY} style={style}>{children}</StyledScrollContainer>;
};

export default ScrollContainer;
