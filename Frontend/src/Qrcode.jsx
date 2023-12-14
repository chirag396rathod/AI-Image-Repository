import React, { useState } from "react";
import { QRCode, Modal } from "antd";

const Qrcode = () => {
  let count = 1;
  const downloadQR = (index) => {
    const svg = document.getElementById(`my-svg-${index}`); // Assuming you set an id for your SVG

    // Create a new Blob object with SVG data
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });

    // Create a temporary anchor element
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my_svg_image.svg"; // Set the filename for the downloaded SVG

    // Append the anchor to the body and click it
    document.body.appendChild(link);
    link.click();

    // Clean up - remove the anchor and URL object
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState(false);

  const handleOk = (val) => {
    setIsModalOpen(!isModalOpen);
    setSelectedQRCode(val || "");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
      ].map((item, index) => (
        <>
          <QRCode
            className={`my-svg-${index}`}
            value={`KP${6112300441384 + index}`}
          />
          <button onClick={() => handleOk(`KP${6112300441384 + index}`)}>
            Show
          </button>
          <h4>Index : {index + 1}</h4>
          <h4>Code : {`KP${6112300441384 + index}`}</h4>
        </>
      ))}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <QRCode className={`my-svg`} value={selectedQRCode} />
        <h4>Code : {selectedQRCode}</h4>
      </Modal>
    </>
  );
};

export default Qrcode;
