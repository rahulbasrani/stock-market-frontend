import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const Loader = () => {
  const [progress, setProgress] = React.useState(0);

  /**********************   it would continuously render for 1.5 seconds while loader becomes 0 to 100 in progress of 10  **********************/

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="loader-content">
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};
export default Loader;
