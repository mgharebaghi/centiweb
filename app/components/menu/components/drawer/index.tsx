import { Drawer, List, ListItem, Typography, Button } from "@mui/material";
import { Col, Row } from "antd";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { Dispatch, SetStateAction, ReactNode } from 'react';
import Link from 'next/link';

function CustomDrawer({
  isOpen,
  onClose,
  menuItems,
  activeItem,
  setActiveItem
}: {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{ path: string; label: string; icon: ReactNode; color: string }>;
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Drawer
      PaperProps={{
        elevation: 0,
        sx: {
          width: "65%",
          backgroundColor: "#1F2937",
          color: "white",
          position: "absolute",
        },
      }}
      open={isOpen}
      onClose={onClose}
      anchor="right"
    >
      <Row className="shadow-sm border-b border-gray-700">
        <Col span={12} className="p-4 flex items-center">
          <Button
            startIcon={<BiArrowBack size={25} />}
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Back
          </Button>
        </Col>
        <Col span={12} className="p-4 flex justify-end">
          <Link href="/">
            <Image
              alt="centichain logo"
              src="/images/Logo.png"
              width={40}
              height={40}
              onClick={() => {
                onClose();
                setActiveItem("");
              }}
              className="cursor-pointer"
            />
          </Link>
        </Col>
      </Row>
      <List className="py-4">
        {menuItems.map((menuItem, index) => (
          <Link href={menuItem.path} passHref key={index}>
            <ListItem
              className={`w-full transition duration-200 hover:bg-gray-700 ${
                activeItem === menuItem.path ? 'bg-gray-800' : ''
              } cursor-pointer`}
              onClick={() => {
                window.scroll(0, 0);
                onClose();
                setActiveItem(menuItem.path);
              }}
            >
              <div className="flex items-center space-x-4 py-2 px-4 w-full">
                <div
                  className="text-2xl"
                  style={{ color: menuItem.color }}
                >
                  {menuItem.icon}
                </div>
                <Typography className="text-white">{menuItem.label}</Typography>
              </div>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
