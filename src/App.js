import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaGoogle, FaMicrosoft, FaApple, FaQrcode, FaDownload, FaSync } from 'react-icons/fa';

const CustomButton = ({ onClick, icon, text, variant = "primary" }) => (
  <Button variant={variant} onClick={onClick} className="d-flex align-items-center justify-content-center w-100 mb-2">
    {icon}
    <span className="ms-2">{text}</span>
  </Button>
);

function App() {
  const [url, setUrl] = useState('');
  const qrRef = useRef(null);

  const handleInputChange = (e) => setUrl(e.target.value);

  const downloadQRCode = () => {
    if (!url) {
      alert('Please enter a URL first.');
      return;
    }
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const refreshPage = () => setUrl('');

  const openCloudService = (service) => {
    const urls = {
      google: 'https://drive.google.com',
      onedrive: 'https://onedrive.live.com',
      icloud: 'https://www.icloud.com/'
    };
    window.open(urls[service] || '', '_blank');
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f8f9fa' }}>
      <Container className="my-3 my-md-5 flex-grow-1">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded-lg">
              <Card.Body className="p-3 p-md-5">
                <h1 className="text-center mb-4 text-primary fs-2 fs-md-1">
                  Shaun Hennedige's <br></br> <FaQrcode className="me-2" /> QR Code Generator
                </h1>
                <Card className="mb-4 border-0 bg-light">
                  <Card.Body>
                    <p className="text-center mb-3">Save your PDF to a cloud service and paste the sharing URL below:</p>
                    <Row className="g-2">
                      <Col xs={12} sm={4}>
                        <CustomButton onClick={() => openCloudService('google')} icon={<FaGoogle />} text="Google Drive" variant="outline-danger" />
                      </Col>
                      <Col xs={12} sm={4}>
                        <CustomButton onClick={() => openCloudService('onedrive')} icon={<FaMicrosoft />} text="OneDrive" variant="outline-primary" />
                      </Col>
                      <Col xs={12} sm={4}>
                        <CustomButton onClick={() => openCloudService('icloud')} icon={<FaApple />} text="iCloud" variant="outline-secondary" />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Enter URL or paste cloud storage sharing link"
                    value={url}
                    onChange={handleInputChange}
                    className="form-control-lg"
                  />
                </Form.Group>
                <div className="text-center mb-4" ref={qrRef}>
                  {url ? (
                    <QRCode value={url} size={Math.min(256, window.innerWidth - 64)} level="H" includeMargin={true} />
                  ) : (
                    <div className="border rounded p-5 text-muted" style={{ backgroundColor: '#f8f9fa' }}>
                      QR Code will appear here
                    </div>
                  )}
                </div>
                <Row className="g-2">
                  <Col xs={12} sm={6}>
                    <CustomButton onClick={downloadQRCode} icon={<FaDownload />} text="Download QR Code" disabled={!url} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <CustomButton onClick={refreshPage} icon={<FaSync />} text="Refresh" variant="secondary" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;