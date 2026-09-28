import logoImage from '../logo.jpg';

const config = {
  pageName: 'SUNIL TRADERS OFFICIAL™',
  telegramLink: 'https://telegram.me/+NRqHPiAy90w4MDU1',
  imageSrc: logoImage,
};

const features = [
  { icon: '✅', className: 'green', text: 'Discover Elite Financial Education & Trading Basics' },
  { icon: '📈', className: 'purple', text: 'Learn Stock Market Strategies from Experts' },
];

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function handleTelegramClick(event) {
  if (!event.nativeEvent.isTrusted) {
    event.preventDefault();
    return;
  }

  if (localStorage.getItem('telegram_subscribed') === 'true') {
    return;
  }

  const eventId = `tg_sub_${Date.now()}`;
  localStorage.setItem('telegram_subscribed', 'true');

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Subscribe', {}, { eventID: eventId });
  }

  fetch('/api/capi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_id: eventId,
      event_name: 'Subscribe',
      event_time: Math.floor(Date.now() / 1000),
      user_agent: navigator.userAgent,
      page: window.location.href,
      fbc: getCookie('_fbc'),
      fbp: getCookie('_fbp'),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Subscribe CAPI response:', data);
    })
    .catch((error) => {
      console.error('Subscribe CAPI error:', error);
    });
}

function App() {
  return (
    <section className="bg-color">
      <div className="container">
        <div className="hero">
          <h1 className="gold">📚 <span>{config.pageName}</span> 📚</h1>
          <div className="hero-content">
            <p className="magenta">Explore Nifty &amp; BankNifty with Free Educational Resources</p>
            <div className="logo">
              <img src={config.imageSrc} alt="Educational Channel Logo" loading="eager" decoding="async" />
            </div>
            <a id="telegram-link" target="_blank" rel="noreferrer" className="cta" href={config.telegramLink} onClick={handleTelegramClick}>Join Free Telegram</a>
            {features.map((feature) => (
              <div className="feature-card" key={feature.text}>
                <p className={feature.className}><span className="emoji" aria-hidden="true">{feature.icon}</span>{feature.text}</p>
              </div>
            ))}
            <p className="orange">Join our community to access free tutorials, strategies, and educational content focused on stock market learning.</p>
            <p className="blue"><a href="https://telegram.me/+2brlAMzDH7EyNDVl">EVOLUTION DIGITAL MARKETING™</a></p>
            <p className="disclaimer"><span>Disclaimer:</span> This platform is for educational purposes only and is not registered with SEBI. We do not offer financial advice, investment recommendations, or guarantees of any kind. Trading and investments involve significant risks, including the potential loss of capital, and may not be suitable for all individuals. Past performance is not indicative of future results. Always consult a qualified, SEBI-registered financial advisor before making any investment decisions. By using this platform, you acknowledge and accept all associated risks.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
