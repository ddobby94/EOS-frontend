import * as React from "react";
import { Link, RouteComponentProps  } from 'react-router-dom';
import '../styles/about-page.css';
import Button from '@material-ui/core/Button';

// interface RouterFunctionComponent extends React.SFC<any> {
//   children: string;
//   to: string;
// };

const AboutPage: React.SFC<RouteComponentProps> = () => {
  const title: string = 'About';

  return (
    <div>
      <h2 className="alt-header">{title}</h2>
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      {/* <Button 
        variant="outlined" 
        color="primary"
      >
        OUTLineeeee
      </Button> */}
      <p>
        This example app is part of the <a href="https://github.com/coryhouse/react-slingshot">React-Slingshot
        starter kit</a>.
      </p>
      <p>
        <Link to="/badlink">Click this bad link</Link> to see the 404 page.
      </p>
    </div>
  );
};

export default AboutPage;
