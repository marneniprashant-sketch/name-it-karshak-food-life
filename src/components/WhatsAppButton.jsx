import React, { useState } from 'react'
import './WhatsAppButton.css'

const PHONE = '918919499446'
const MESSAGE = 'Hello! I am interested in your products at Karshak Food Life. Could you please help me?'

export default function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true)

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <div className="wa-wrap">
      {tooltip && (
        <div className="wa-tooltip">
          <span>Chat with us!</span>
          <button className="wa-tooltip-close" onClick={() => setTooltip(false)} aria-label="Close">×</button>
        </div>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        aria-label="Chat on WhatsApp"
        onClick={() => setTooltip(false)}
      >
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="white" width="28" height="28">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.522.686 4.882 1.88 6.91L2 30l7.338-1.848A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.894-1.614l-.422-.252-4.356 1.098 1.118-4.244-.276-.436A11.56 11.56 0 0 1 4.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6zm6.34-8.66c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.552-.174-.784.174-.232.348-.9 1.132-1.102 1.366-.204.232-.406.26-.754.086-.348-.174-1.47-.542-2.8-1.726-1.034-.922-1.732-2.06-1.936-2.408-.204-.348-.022-.536.154-.71.158-.156.348-.406.522-.61.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.61-.088-.174-.784-1.888-1.074-2.586-.282-.68-.57-.588-.784-.598l-.668-.012c-.232 0-.61.088-.93.436-.32.348-1.218 1.19-1.218 2.902s1.246 3.366 1.42 3.598c.174.232 2.45 3.74 5.934 5.244.83.358 1.478.572 1.982.732.832.264 1.59.226 2.188.138.668-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.656-.086-.144-.318-.232-.666-.406z"/>
        </svg>
        <span className="wa-pulse" />
      </a>
    </div>
  )
}
