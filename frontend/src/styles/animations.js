import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');

  /* Animation keyframes */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 var(--halo-color); }
    70% { box-shadow: 0 0 0 15px rgba(255, 107, 107, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Halo effect animation */
  .halo-effect {
    position: relative;
    z-index: 1;
  }

  .halo-effect::after {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: inherit;
    background: radial-gradient(circle at center, var(--halo-color) 0%, transparent 70%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .halo-effect:hover::after {
    opacity: 1;
    animation: pulse 2s infinite;
  }

  /* Card hover effects */
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card-hover:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  /* Floating animation for selected elements */
  .float-animation {
    animation: float 6s ease-in-out infinite;
  }

  /* Rotate animation */
  .rotate-animation {
    animation: rotate 10s linear infinite;
  }

  /* Gradient text effect */
  .gradient-text {
    background: linear-gradient(90deg, var(--accent) 0%, #9c27b0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export default GlobalStyles;
