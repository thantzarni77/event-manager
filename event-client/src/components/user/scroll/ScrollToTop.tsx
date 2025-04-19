import { useEffect } from "react";
import { useLocation } from "react-router";

// type Scroll = {
//   pathname: string | number;
//   position: number;
// };

const ScrollToTop = () => {
  // const [scrollPosition, setScrollPosition] = useState<Scroll[]>([]);
  const { pathname } = useLocation(); // Detects route changes

  // const position = window.pageYOffset;

  useEffect(() => {
    // if (pathname == scrollPosition[scrollPosition.length - 2]?.pathname) {
    //   window.scrollTo(0, scrollPosition[scrollPosition.length - 2].position);
    // }
    window.scrollTo(0, 0); // Scrolls to the top on route change

    // setScrollPosition((prev) => [...prev, { pathname, position }]);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
