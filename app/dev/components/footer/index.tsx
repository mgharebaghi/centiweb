import React from 'react';
import { Typography } from "@mui/material";
import { Button, Col, Divider, Row } from "antd";
import { GrNext, GrPrevious } from "react-icons/gr";

interface DevFooterProps {
  items: Array<{ label: string }>;
  itemKey: string;
  setKey: (key: string) => void;
}

const DevFooter: React.FC<DevFooterProps> = ({ items, itemKey, setKey }) => {
  const currentIndex = Number(itemKey);
  const prevItem = items[currentIndex - 1];
  const nextItem = items[currentIndex + 1];

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < items.length) {
      setKey(newIndex.toString());
      window.scrollTo(0, 0);
    }
  };

  return (
    <Row>
      <Col span={11} className="flex justify-end items-center pr-10">
        {prevItem && (
          <>
            <Button
              type="text"
              icon={<GrPrevious />}
              className="text-2xl hover:bg-gray-200 transition-colors"
              onClick={() => handleNavigation('prev')}
              aria-label="Previous item"
            />
            <Typography className="text-slate-500 ml-2">
              {prevItem.label}
            </Typography>
          </>
        )}
      </Col>
      <Col span={2} className="flex justify-center items-center">
        <Divider type="vertical" className="h-8" />
      </Col>
      <Col span={11} className="flex justify-start items-center">
        {nextItem && (
          <>
            <Typography className="text-slate-500 mr-2">
              {nextItem.label}
            </Typography>
            <Button
              type="text"
              icon={<GrNext />}
              className="text-2xl pl-3 hover:bg-gray-200 transition-colors"
              onClick={() => handleNavigation('next')}
              aria-label="Next item"
            />
          </>
        )}
      </Col>
    </Row>
  );
};

export default DevFooter;
