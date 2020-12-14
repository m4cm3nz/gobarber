import React from 'react';
import { Container } from './styles';

interface ToolTipPrpops {
  title: string;
  className?: string;
}

const Tooltip: React.FC<ToolTipPrpops> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
