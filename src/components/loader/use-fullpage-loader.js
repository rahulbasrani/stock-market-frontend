import * as React from "react";

import Loader from "./Loader";

const useFullPageLoader = () => {
  const [loading, setLoading] = React.useState(false);

  return [
    loading ? <Loader /> : null,
    () => setLoading(true), //show loader

    () => setLoading(false), //hide loader
  ];
};

export default useFullPageLoader;
