import AddTodoList from "../addTodoList/AddTodoList";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styled from "styled-components";

const Layout = () => {
  const StyleLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 98vh;
    main {
      margin: auto;
      position: relative;
      bottom: 210px;
    }

    footer {
      margin-top: auto;
    }
  `;

  return (
    <div>
      <StyleLayout>
        <Header />
        <main>
          <AddTodoList />
        </main>
        <Footer />
      </StyleLayout>
    </div>
  );
};

export default Layout;
