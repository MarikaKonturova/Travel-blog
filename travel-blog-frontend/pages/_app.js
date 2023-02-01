import { NavBar } from "../components/NavBar";
import '../styles/globals.css'

/* перевести на typescript */
/* изменить вёрстку */
/* догуглить вопросы */


 const MyApp = ({ Component, pageProps }) => {
  return (
    <div className='app-container'>
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
