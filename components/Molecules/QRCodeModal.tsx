import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import QRCodeCanvas from "qrcode.react";
import { getMobileOS } from "@/utils";

interface QRCodeModalType {
  isOpen: boolean;
  onClose: () => void;
  value: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  value,
}: QRCodeModalType) {
  const toastr = useToast();
  const [copied, setCopied] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const downloadQRCode = useCallback(() => {
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    if (canvas === null || canvas === undefined) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR Code.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toastr({
      description: "Link copied to clipboard",
      status: "success",
    });
  }, [value, toastr]);

  useEffect(() => {
    if (getMobileOS() !== "iOS") {
      setIsIOS(true);
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>QR Code</ModalHeader>
        <ModalBody>
          <Center>
            <QRCodeCanvas
              id="qr-gen"
              value={value}
              size={400}
              level={"H"}
              includeMargin
            />
          </Center>
          {isIOS && (
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                value={value}
                readOnly
                bgColor="blackAlpha.300"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleCopy}>
                  {copied ? "Copied" : "Copy"}
                </Button>
              </InputRightElement>
            </InputGroup>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={downloadQRCode}>
            Download
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
