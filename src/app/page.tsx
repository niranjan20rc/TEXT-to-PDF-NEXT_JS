"use client";
import { useState } from "react";
import jsPDF from "jspdf";

const TextToPDF: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [fileName, setFileName] = useState<string>("document.pdf");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const generatePDF = (): void => {
    if (!text.trim()) {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
      return;
    }

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height || 297;
    const margin = 10;
    const lineHeight = 7;

    const lines = doc.splitTextToSize(text, 180);

    let y = margin;
    lines.forEach((line:any) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setShowPreview(true);
  };

  const handleDownload = (): void => {
    if (!text.trim()) {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
      return;
    }
    if (!pdfUrl) generatePDF();
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName || "document.pdf";
    link.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#000",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Text to PDF Converter
      </h1>

      {/* Alert animation */}
      {alertVisible && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ff4d4f",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            animation: "fadein 0.5s, fadeout 0.5s 1.5s",
            zIndex: 10,
          }}
        >
          Please enter some text before generating PDF!
        </div>
      )}

      {/* PDF File Name Input */}
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter PDF file name"
        style={{
          padding: "10px",
          border: "2px solid #000",
          borderRadius: "8px",
          marginBottom: "15px",
          outline: "none",
          fontSize: "16px",
          width: "90%",
          maxWidth: "400px",
          background: "#fff",
          color: "#000",
          boxSizing: "border-box",
        }}
      />

      {/* Textarea */}
      <textarea
        rows={10}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        placeholder="Enter your text here..."
        style={{
          padding: "10px",
          border: "2px solid #000",
          borderRadius: "8px",
          marginBottom: "10px",
          outline: "none",
          fontSize: "16px",
          width: "90%",
          maxWidth: "600px",
          resize: "vertical",
          background: "#fff",
          color: "#000",
          boxSizing: "border-box",
        }}
      />

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={generatePDF}
          style={{
            background: "#000",
            color: "#fff",
            border: "none",
            padding: "10px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            flex: "1 1 120px",
          }}
        >
          View PDF
        </button>

        <button
          onClick={handleDownload}
          style={{
            background: "#000",
            color: "#fff",
            border: "none",
            padding: "10px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            flex: "1 1 120px",
          }}
        >
          Download PDF
        </button>

        {showPreview && (
          <button
            onClick={() => setShowPreview(false)}
            style={{
              background: "#000",
              color: "#fff",
              border: "none",
              padding: "10px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              flex: "1 1 120px",
            }}
          >
            Close PDF
          </button>
        )}
      </div>

      {/* PDF Preview */}
      {showPreview && pdfUrl && (
        <div
          style={{
            width: "90%",
            maxWidth: "600px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            style={{
              width: "100%",
              height: "500px",
              border: "2px solid #000",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {/* Keyframes for alert */}
      <style>{`
        @keyframes fadein {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes fadeout {
          from {opacity: 1;}
          to {opacity: 0;}
        }
      `}</style>
    </div>
  );
};

export default TextToPDF;
