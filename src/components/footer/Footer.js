import { Container , Row , Col } from "react-bootstrap";
import "./Footer.css";
function Footer() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
        <path
          fill="#eee"
          fillOpacity="1"
          d="M0,64L48,69.3C96,75,192,85,288,96C384,107,480,117,576,128C672,139,768,149,864,133.3C960,117,1056,75,1152,85.3C1248,96,1344,160,1392,192L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <footer>
        <Container>
          <Row>
            <Col>
              <p>ستون 1</p>
            </Col>
            <Col>
              <p>ستون 2</p>
            </Col>
            <Col>
              <p>ستون 3</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
