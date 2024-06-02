import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className='footer'>
      <div className='developer'>
        <p>Developed by Tiffany Liu</p>
      </div>
      <div className='linkedin'>
        <a href="https://www.linkedin.com/in/tiffanyliu2008/" target="blank">
          <FontAwesomeIcon icon={faLinkedin} size="2x"/>
        </a>
      </div>
      <div className='github'>
        <a href="https://github.com/TiffanyLiu2008" target="blank">
          <FontAwesomeIcon icon={faGithub} size="2x"/>
        </a>
      </div>
    </div>
  );
}

export default Footer;
