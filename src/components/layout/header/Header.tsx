import styled from "styled-components";

const Header = () => {
  const StyleHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
    margin-inline: auto;

    background: #87cefa;
    width: 100%;

    img {
      width: 130px;
      height: 80px;
    }
  `;
  return (
    <StyleHeader>
      <div>
        <img
          src="https://www.svgrepo.com/show/263767/film-reel-film.svg"
          alt=""
        />
      </div>
      <div>
        <h1>Movie List</h1>
      </div>
    </StyleHeader>
  );
};

export default Header;
