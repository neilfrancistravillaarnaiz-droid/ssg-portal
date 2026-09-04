import { useState } from "react";
import { FileText, Upload, X } from "lucide-react";

export default function Forms() {
  const [isIdRequestOpen, setIsIdRequestOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="student-page">
      <div className="page-title">
        <FileText size={26} />
        <div>
          <h1>Forms</h1>
          <p>Submit and access online student service forms.</p>
        </div>
      </div>

      <div className="page-list">
        <div className="page-card">
          <h3>ID Request Form</h3>
          <p>Request a student identification card from the SSG office.</p>
          <button className="page-btn" onClick={() => { setSubmitted(false); setIsIdRequestOpen(true); }}>
            Request Student ID
          </button>
        </div>

      </div>

      {isIdRequestOpen ? (
        <div className="form-modal-overlay" onClick={() => setIsIdRequestOpen(false)}>
          <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="id-request-title" onClick={(event) => event.stopPropagation()}>
            <div className="form-modal-header">
              <div>
                <span className="eyebrow">Student services</span>
                <h2 id="id-request-title">ID Request Form</h2>
                <p>Complete your details and upload a clear photo of your valid ID.</p>
              </div>
              <button className="form-modal-close" type="button" aria-label="Close ID request form" onClick={() => setIsIdRequestOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="form-success-state">
                <strong>ID request submitted</strong>
                <span>Your request has been sent to the SSG office for review.</span>
                <button className="page-btn" type="button" onClick={() => setIsIdRequestOpen(false)}>Close</button>
              </div>
            ) : (
              <form className="id-request-form" onSubmit={handleSubmit}>
                <div className="form-field full-width">
                  <label htmlFor="full-name">Full Name (Last Name, First Name, M.I.)</label>
                  <input id="full-name" name="fullName" className="page-input" placeholder="e.g. Dela Cruz, Juan P." required />
                </div>

                <div className="form-field">
                  <label htmlFor="birthdate">Date of Birth</label>
                  <input id="birthdate" name="birthdate" className="page-input" type="date" required />
                </div>
                <div className="form-field">
                  <label htmlFor="student-id">Student ID</label>
                  <input id="student-id" name="studentId" className="page-input" placeholder="e.g. 2026-00001" required />
                </div>

                <div className="form-field full-width">
                  <label htmlFor="address">Current Address</label>
                  <textarea id="address" name="address" className="page-textarea" placeholder="House number, street, barangay, city/province" rows={3} required />
                </div>

                <div className="form-field">
                  <label htmlFor="guardian-name">Parent/Guardian Full Name</label>
                  <input id="guardian-name" name="guardianName" className="page-input" required />
                </div>
                <div className="form-field">
                  <label htmlFor="guardian-address">Parent/Guardian Address</label>
                  <input id="guardian-address" name="guardianAddress" className="page-input" required />
                </div>

                <div className="form-field full-width">
                  <label htmlFor="id-picture">Upload Valid ID Picture</label>
                  <label className="id-upload-box" htmlFor="id-picture">
                    <Upload size={22} />
                    <span>Choose a clear photo of your valid ID</span>
                    <small>Accepted formats: JPG, JPEG, PNG</small>
                  </label>
                  <input id="id-picture" name="idPicture" type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" required />
                </div>

                <div className="form-modal-actions">
                  <button className="page-btn secondary" type="button" onClick={() => setIsIdRequestOpen(false)}>Cancel</button>
                  <button className="page-btn" type="submit">Submit ID Request</button>
                </div>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}