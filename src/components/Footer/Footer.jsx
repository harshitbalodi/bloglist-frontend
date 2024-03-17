import React from 'react'
import './Footer.css';
import GithubLogo from '../../assets/github-logo.svg';
import TwitterLogo from '../../assets/twitterX-logo.svg';
import LinkedInLogo from '../../assets/linkedIn-logo.svg';

const FooterLink = () => {
  return <div>
    <h4>Contact</h4>
    <p>You can reach me through my social media</p>
    <a href="https://github.com/harshitbalodi/"> <img src={GithubLogo} alt="github-logo" /></a>
    <a href="https://www.linkedin.com/in/harshit-balodi/"> <img src={LinkedInLogo} alt="linnkedin-logo" /></a>
    <a href="https://twitter.com/BalodiHarshit"><img src={TwitterLogo} alt="twitter-logo" /></a>
  </div>
}
const Footer = () => {
  return (
    <div className='footer'>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga mollitia minima impedit voluptatum vero, saepe facere tenetur unde nemo dicta ad quidem perspiciatis est non ipsum ipsam reiciendis ratione provident.
      <FooterLink />
      <div>@ All copyright reserved 2024</div>
    </div>
  )
}

export default Footer