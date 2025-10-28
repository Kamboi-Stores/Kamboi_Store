"use client";

export default function Page() {
  return (
    <div className="card">
      <h1 style={{marginTop:0, color: 'var(--fg)'}}>Contact Us</h1>
      <form
        action="https://formspree.io/f/xldpgwpd"
        method="POST"
        className="grid"
        style={{gap:12}}
      >
        {/*
          TODO: For Formspree redirect to work after submission, you must:
          1. Deploy your site to your production domain (e.g., Vercel).
          2. Add and verify your domain in your Formspree dashboard.
          3. Change the _redirect value below to the full URL of your thank you page (e.g., https://yourdomain.com/contact-success).
          On the free tier, Formspree does not support redirects to localhost or relative URLs.
        */}
        <input type="hidden" name="_redirect" value="/contact-success" />
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
        </div>
        <div className="grid cols-2">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" />
          </div>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={4} required />
        </div>
        {/* Consent statement below form */}
        {/* Optionally, add a _redirect field for a custom thank you page */}
        {/* <input type="hidden" name="_redirect" value="/contact-success" /> */}
        <p style={{fontSize:'0.97rem',color:'var(--muted)',margin:'1px 0 0 0',textAlign:'center'}}>
          By submitting this form you consent to be contacted by us.
        </p>
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
}
