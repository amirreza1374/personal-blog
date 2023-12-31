import "./Courses.css";
import { useEffect, useState } from "react";
import MyNavbar from "../../components/navbar/MyNavbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Accordion, Col, Container, Row, Form, Alert } from "react-bootstrap";
import { FaSort, FaFilter } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import CourseItem from "../../components/course/CourseItem";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [sortType, setSortType] = useState("earliest");
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState("");
  const [courseState, setCourseState] = useState("");

  useEffect(() => {
    if (sortType == "earliest") getCoursesByOrder("desc", "id");
    else if (sortType == "latest") getCoursesByOrder("asc", "id");
    else if (sortType == "expensivest") getCoursesByOrder("desc", "mainPrice");
    else if (sortType == "cheapest") getCoursesByOrder("asc", "mainPrice");
  }, [sortType]);

  useEffect(() => {
    if (courseState == "completed") getCoursesByState("completed");
    else if (courseState == "presell") getCoursesByState("presell");
    else if (courseState == "recording") getCoursesByState("recording");
  }, [courseState]);

  useEffect(() => {
    if (category == "frontend") getCoursesByCategory("فرانت اند");
    else if (category == "backend") getCoursesByCategory("بک اند");
  }, [category]);

  const sortHandler = (e) => {
    setSortType(e.target.id);
  };

  const getCoursesByOrder = (order, column) => {
    axios
      .get(
        `http://localhost/react/api/courses/?order=${order}&column=${column}`
      )
      .then((response) => setCourses(response.data.data));
  };

  const getCoursesByCategory = (category) => {
    axios
      .get(`http://localhost/react/api/courses/?category=${category}`)
      .then((response) => setCourses(response.data.data));
  };

  const getCoursesByState = (state) => {
    axios
      .get(`http://localhost/react/api/courses/?state=${state}`)
      .then((response) => setCourses(response.data.data));
  };

  const searchInputHandler = (e) => {
    setSearchKey(e.target.value);
  };

  const searchButtonHandler = () => {
    axios
      .get(
        `http://localhost/react/api/articles/?search=${searchKey}&column=writter`
      )
      .then((response) => setCourses(response.data.data));
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const courseStateHandler = (e) => {
    setCourseState(e.target.value);
  };

  return (
    <>
      <MyNavbar />
      <Container>
        <div className="searchSection">
          <h1>لیست مقالات</h1>
          <div className="searchBoxContainer">
            <input
              type="text"
              className="searchInput"
              onChange={searchInputHandler}
            />
            <button className="searchButton" onClick={searchButtonHandler}>
              جستجو
            </button>
          </div>
        </div>
        <Row>
          <Col className="col-12 col-lg-3">
            <Accordion alwaysOpen className="py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <FaSort size="20px" />
                  <b>مرتب سازی</b>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Check
                      type="radio"
                      id="earliest"
                      name="sort"
                      label="جدید ترین"
                      onChange={sortHandler}
                    />
                    <Form.Check
                      type="radio"
                      id="latest"
                      name="sort"
                      label="قدیمی ترین"
                      onChange={sortHandler}
                    />
                    <Form.Check
                      type="radio"
                      id="expensivest"
                      name="sort"
                      label="گران ترین"
                      onChange={sortHandler}
                    />
                    <Form.Check
                      type="radio"
                      id="cheapest"
                      name="sort"
                      label="ارزان ترین"
                      onChange={sortHandler}
                    />
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="filterWrapper">
              <div className="filterIcon">
                <MdCategory />
                <b>دسته بندی</b>
              </div>
              <Form>
                <Form.Check
                  type="checkbox"
                  value="frontend"
                  label="فرانت اند"
                  onChange={categoryHandler}
                  checked={category == "frontend" ? true : false}
                />
                <Form.Check
                  type="checkbox"
                  value="backend"
                  label="بک اند"
                  onChange={categoryHandler}
                  checked={category == "backend" ? true : false}
                />
              </Form>
            </div>
            <div className="filterWrapper">
              <div className="filterIcon">
                <FaFilter />
                <b>وضعیت دوره</b>
              </div>
              <Form>
                <Form.Check
                  type="switch"
                  value="completed"
                  label="تکمیل شده"
                  onChange={courseStateHandler}
                  checked={courseState == "completed" ? true : false}
                />
                <Form.Check
                  type="switch"
                  value="presell"
                  label="پیش فروش"
                  onChange={courseStateHandler}
                  checked={courseState == "presell" ? true : false}
                />
                <Form.Check
                  type="switch"
                  value="recording"
                  label="در حال ضبط"
                  onChange={courseStateHandler}
                  checked={courseState == "recording" ? true : false}
                />
              </Form>
            </div>
          </Col>
          <Col className="col-12 col-lg-9">
            <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 gy-4 py-3">
              {courses.map((course) => (
                <Col key={course.id}>
                  <CourseItem {...course} />
                </Col>
              ))}
            </Row>

            {courses.length == 0 && (
              <Alert variant="warning" className="py-3 gy-4 mt-2">
                <p>مقاله ای یافت نشد!!!!</p>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Courses;
