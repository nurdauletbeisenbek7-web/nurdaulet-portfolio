'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { site } from '@/data/site';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Send failed');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Try the direct links below.');
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-intro">
            <Reveal as="p" className="section-label">
              [ 05 — Contact ]
            </Reveal>
            <Reveal as="h2" className="display-2">
              Let’s build <em>something real.</em>
            </Reveal>
            <Reveal as="p" className="contact-lead">
              Got a product, a landing, or an AI feature in mind? Send a message —
              it lands straight in my Telegram. I reply fast.
            </Reveal>

            <Reveal className="contact-direct">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  data-cursor="open"
                >
                  <span>{s.label}</span>
                  <em>{s.handle} ↗</em>
                </a>
              ))}
            </Reveal>
          </div>

          <Reveal className="contact-form-wrap">
            {status === 'success' ? (
              <div className="form-success">
                <span className="form-success-mark">✓</span>
                <h3>Message sent.</h3>
                <p>Thanks — I’ll reply in Telegram shortly.</p>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <label>
                  <span>01 / Name</span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    maxLength={80}
                  />
                </label>
                <label>
                  <span>02 / Contact</span>
                  <input
                    required
                    name="contact"
                    placeholder="Telegram / phone / email"
                    maxLength={120}
                  />
                </label>
                <label>
                  <span>03 / Message</span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="What do you want to build?"
                    maxLength={2000}
                  />
                </label>

                {status === 'error' && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={status === 'sending'}
                  data-cursor="send"
                >
                  {status === 'sending' ? 'Sending…' : (
                    <>Send via Telegram <span aria-hidden="true">↗</span></>
                  )}
                </button>
                <small>
                  Sends through a serverless function to my Telegram. No email,
                  no third-party storage.
                </small>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
