import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Box, useDisclosure } from "@chakra-ui/react";
import QRCodeModal from "@/components/Molecules/QRCodeModal";

const subdomain = "demo"; // Replace with your custom subdomain

export default function Home() {
  const frame = useRef<HTMLIFrameElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (frame.current === null || frame.current === undefined) return;
    frame.current.setAttribute(
      "src",
      `https://${subdomain}.readyplayer.me/avatar?clearCache&bodyType=fullbody&frameApi`
    );

    function subscribe(event: any) {
      const json = parse(event);

      if (json?.source !== "readyplayerme") {
        return;
      }

      // Susbribe to all events sent from Ready Player Me once frame is ready
      if (json.eventName === "v1.frame.ready") {
        frame.current?.contentWindow?.postMessage(
          JSON.stringify({
            target: "readyplayerme",
            type: "subscribe",
            eventName: "v1.**",
          }),
          "*"
        );
      }

      // Get avatar GLB URL
      if (json.eventName === "v1.avatar.exported") {
        setValue(json.data.url);
        onOpen();
      }

      // Get user id
      if (json.eventName === "v1.user.set") {
        console.log(
          `User with id ${json.data.id} set: ${JSON.stringify(json)}`
        );
      }
    }

    function parse(event: any) {
      try {
        return JSON.parse(event.data);
      } catch (error) {
        return null;
      }
    }

    window.addEventListener("message", subscribe);
    document.addEventListener("message", subscribe);

    return () => {
      window.removeEventListener("message", subscribe);
      document.removeEventListener("message", subscribe);
    };
  }, [onOpen]);

  return (
    <div>
      <Head>
        <title>Demo Avatar Creation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h={{ base: "calc(100vh - 75px)", md: "100vh" }}>
        <iframe
          width="100%"
          height="100%"
          ref={frame}
          id="frame"
          className="frame"
          allow="camera *; microphone *; clipboard-write"
        ></iframe>
      </Box>
      <QRCodeModal isOpen={isOpen} onClose={onClose} value={value} />
    </div>
  );
}
