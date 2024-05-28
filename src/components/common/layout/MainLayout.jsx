import Header from "./Header";

const MainLayout = ({ children, $isDisplay }) => {
  return (
    <section>
      <Header $isDisplay={$isDisplay} />
      {children}
    </section>
  );
};
export default MainLayout;
