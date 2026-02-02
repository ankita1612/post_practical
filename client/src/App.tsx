import Card from "react-bootstrap/Card";
import Header from "./layouts/Header";
import { Routes, Route } from "react-router-dom";
import PostList from "./component/post/PostList";
import PostAdd from "./component/post/PostAdd";
function App() {
  return (
    <Card>
      <Header></Header>
      <Card.Body>
        <Routes>
          <Route path="/post/add/:id?" element={<PostAdd />} />
          <Route path="/" element={<PostList />} />
        </Routes>
      </Card.Body>
    </Card>
  );
}

export default App;
