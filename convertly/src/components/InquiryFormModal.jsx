import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, CheckCircle, AlertCircle, Mail,
  Building2, User, Phone, MapPin, Briefcase, Layers, Droplets,
  Gauge, Hash, MessageSquare, Calendar, Settings
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Responsive CSS injected once — avoids inline-style media query limitations
───────────────────────────────────────────────────────────────────────────── */
const STYLE_ID = 'emifree-form-styles';
const injectStyles = () => {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
    .emifree-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    @media (max-width: 540px) {
      .emifree-grid-2 {
        grid-template-columns: 1fr;
      }
      .emifree-modal-inner {
        border-radius: 12px !important;
      }
      .emifree-header {
        padding: 16px 16px 0 !important;
      }
      .emifree-body {
        padding: 16px !important;
      }
      .emifree-footer {
        flex-direction: column !important;
        align-items: stretch !important;
      }
      .emifree-footer-buttons {
        flex-direction: column !important;
        width: 100%;
      }
      .emifree-footer-buttons button {
        width: 100%;
        justify-content: center;
      }
      .emifree-chip-row {
        gap: 8px !important;
      }
      .emifree-chip-row button {
        flex: 1 1 calc(33% - 8px);
        min-width: 0 !important;
      }
      .emifree-contact-strip {
        flex-direction: column !important;
        gap: 6px !important;
      }
    }
  `;
  document.head.appendChild(el);
};

/* ─────────────────────────────────────────────────────────────────────────────
   Date picker helpers
───────────────────────────────────────────────────────────────────────────── */
const getMinDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const day = d.getDay();
  if (day === 6) d.setDate(d.getDate() + 2); // Saturday → Monday
  if (day === 0) d.setDate(d.getDate() + 1); // Sunday  → Monday
  return d.toISOString().split('T')[0];
};

const getMaxDate = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 2);
  return d.toISOString().split('T')[0];
};

const isWeekend = (dateStr) => {
  if (!dateStr) return false;
  const day = new Date(dateStr + 'T00:00:00').getDay();
  return day === 0 || day === 6;
};

/* ─────────────────────────────────────────────────────────────────────────────
   InquiryFormModal
───────────────────────────────────────────────────────────────────────────── */
const InquiryFormModal = ({ isOpen, onClose, productType }) => {
  useEffect(() => { injectStyles(); }, []);

  const initialFormData = {
    company: '',
    address: '',
    contactPerson: '',
    departmentPosition: '',
    telephone: '',
    email: '',
    usesAirFilters: '',
    currentSuppliers: '',
    isExistingCustomer: '',
    machinesAvailable: '',
    machiningType: '',
    machineType: '',
    appliedRefrigerant: '',
    evacuationVolume: '',
    pipeDiameterMm: '',
    machinesOnOneUnit: '',
    others: '',
    personalVisitDesired: '',
    desiredAppointmentTime: '',
  };

  const [formData, setFormData]     = useState(initialFormData);
  const [formStatus, setFormStatus] = useState('idle');
  const [errors, setErrors]         = useState({});
  const [dateError, setDateError]   = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData(initialFormData);
        setFormStatus('idle');
        setErrors({});
        setDateError('');
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (isWeekend(value)) {
      setDateError('Please select a weekday (Monday – Friday).');
      setFormData(prev => ({ ...prev, desiredAppointmentTime: '' }));
    } else {
      setDateError('');
      setFormData(prev => ({ ...prev, desiredAppointmentTime: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim())       newErrors.company       = 'Company name is required.';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required.';
    if (!formData.telephone.trim())     newErrors.telephone     = 'Telephone is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(`emifree-field-${firstKey}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setFormStatus('submitting');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  const SuccessScreen = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 16px', textAlign: 'center', gap: '16px' }}>
      <CheckCircle size={56} color="#16a34a" />
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Inquiry Sent!</h3>
      <p style={{ color: '#4b5563', maxWidth: '380px', margin: 0 }}>
        Thank you for your interest in Emifree's{' '}
        <strong>
          {productType === 'mechanical'
            ? 'Mechanical'
            : productType === 'electrostatic'
            ? 'Electrostatic'
            : 'Dust'} Filtration
        </strong>
        {' '}systems.
      </p>
      <p style={{ color: '#4b5563', maxWidth: '380px', margin: 0 }}>
        Our engineers will review your application and reply within 1 business day.
      </p>
      <p style={{ fontWeight: 600, marginTop: '4px' }}>Need immediate assistance?</p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="mailto:info@emifree.com" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', textDecoration: 'none', fontSize: '0.9rem' }}>
          <Mail size={15} /> info@emifree.com
        </a>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontSize: '0.9rem' }}>
          <Phone size={15} /> +49 3076283520
        </span>
      </div>
      <button onClick={onClose} style={{ marginTop: '8px', padding: '10px 28px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}>
        Close this window
      </button>
    </div>
  );

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.55)',
            // On mobile use 0 padding so modal fills edge-to-edge
            padding: '8px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="emifree-modal-inner"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              background: '#fff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '720px',
              maxHeight: '96vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
            }}
          >
            {/* ── HEADER ──────────────────────────────────────────────────── */}
            <div
              className="emifree-header"
              style={{ padding: '20px 24px 14px', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ minWidth: 0 }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 2px', lineHeight: 1.3 }}>
                    Emifree — Product Inquiry
                  </h2>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1d4ed8', margin: '0 0 4px' }}>
                    {productType === 'mechanical'
                      ? 'Mechanical Filtration Quote Request'
                      : productType === 'electrostatic'
                      ? 'Electrostatic Filtration Quote Request'
                      : 'Dust Filtration Quote Request'}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
                    Complete the form so our engineers can configure the right solution.{' '}
                    <span style={{ color: '#dc2626' }}>*</span> Required fields
                  </p>
                </div>
                <button
                  onClick={onClose}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px', color: '#6b7280', flexShrink: 0 }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Quick-contact strip */}
              <div
                className="emifree-contact-strip"
                style={{ marginTop: '10px', fontSize: '0.8rem', color: '#6b7280', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Mail size={12} />
                  <a href="mailto:info@emifree.com" style={{ color: '#2563eb', textDecoration: 'none' }}>info@emifree.com</a>
                </span>
                <span style={{ color: '#d1d5db' }}>·</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Phone size={12} />
                  +49 3076283520
                </span>
              </div>
            </div>

            {/* ── SCROLLABLE BODY ─────────────────────────────────────────── */}
            <div className="emifree-body" style={{ overflowY: 'auto', padding: '20px 24px', flex: 1 }}>
              {formStatus === 'success' ? (
                <SuccessScreen />
              ) : (
                <form onSubmit={handleSubmit} noValidate>

                  {/* ── SECTION 1 · CONTACT ─────────────────────────────── */}
                  <SectionHeader label="Contact Information" />
                  <div className="emifree-grid-2">
                    <Field id="emifree-field-company"           label="Company"                  name="company"           required icon={Building2} formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-address"           label="Address"                  name="address"                    icon={MapPin}    formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-contactPerson"     label="Contact Person"           name="contactPerson"     required icon={User}       formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-departmentPosition" label="Department / Position"   name="departmentPosition"         icon={Briefcase} formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-telephone"         label="Telephone"                name="telephone"         required icon={Phone}      formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-email"             label="Email"                    name="email"             required type="email" icon={Mail} formData={formData} errors={errors} onChange={handleChange} />
                  </div>

                  {/* ── SECTION 2 · FURTHER SPECIFICATIONS ──────────────── */}
                  <SectionHeader label="Further Specifications" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    {/* Q1: Air filters */}
                    <SpecRow label="Does the company already use air filters?">
                      <RadioGroup name="usesAirFilters" value={formData.usesAirFilters} onChange={handleChange} />
                      {/* Conditional supplier field — only present when needed, no phantom height */}
                      {formData.usesAirFilters === 'yes' && (
                        <div style={{ marginTop: '12px' }}>
                          <Field
                            id="emifree-field-currentSuppliers"
                            label="Current supplier(s)"
                            name="currentSuppliers"
                            icon={Settings}
                            formData={formData} errors={errors} onChange={handleChange}
                          />
                        </div>
                      )}
                    </SpecRow>

                    {/* Q2: Existing customer — no conditional content, no phantom space */}
                    <SpecRow label="Are you already a customer of Emifree?" sublabel="(directly or via distributors)">
                      <RadioGroup name="isExistingCustomer" value={formData.isExistingCustomer} onChange={handleChange} />
                    </SpecRow>

                    <Field
                      id="emifree-field-machinesAvailable"
                      label="Number of machines / units available"
                      name="machinesAvailable"
                      icon={Hash}
                      formData={formData} errors={errors} onChange={handleChange}
                    />
                  </div>

                  {/* ── SECTION 3 · APPLICATION ──────────────────────────── */}
                  <SectionHeader label="Application Details" />
                  <div className="emifree-grid-2">
                    <Field id="emifree-field-machiningType"      label="Machining type"                   name="machiningType"      icon={Settings}  formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-machineType"        label="Machine type / model"             name="machineType"        icon={Settings}  formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-appliedRefrigerant" label="Applied refrigerant / coolant"    name="appliedRefrigerant" icon={Droplets}  formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-evacuationVolume"   label="Evacuation volume (m³/h)"         name="evacuationVolume"   icon={Gauge}     formData={formData} errors={errors} onChange={handleChange} />
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <PipeDiameterSelector formData={formData} onChange={handleChange} />
                  </div>

                  <div className="emifree-grid-2" style={{ marginTop: '16px' }}>
                    <Field id="emifree-field-machinesOnOneUnit" label="Machines on one unit"        name="machinesOnOneUnit" icon={Layers}        formData={formData} errors={errors} onChange={handleChange} />
                    <Field id="emifree-field-others"            label="Others (enter if necessary)" name="others"            icon={MessageSquare} formData={formData} errors={errors} onChange={handleChange} />
                  </div>

                  {/* ── SECTION 4 · SITE VISIT ───────────────────────────── */}
                  <SectionHeader label="Site Visit Preference" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    <SpecRow label="Is a personal visit desired?">
                      <RadioGroup name="personalVisitDesired" value={formData.personalVisitDesired} onChange={handleChange} />
                      {/* Date picker only appears when "yes" is selected — no phantom height */}
                      {formData.personalVisitDesired === 'yes' && (
                        <div style={{ marginTop: '12px' }}>
                          <label style={labelStyle}>
                            <Calendar size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle', color: '#6b7280' }} />
                            Desired Appointment Time
                          </label>
                          <input
                            type="date"
                            name="desiredAppointmentTime"
                            value={formData.desiredAppointmentTime}
                            min={getMinDate()}
                            max={getMaxDate()}
                            onChange={handleDateChange}
                            style={{ ...inputStyle, maxWidth: '240px' }}
                          />
                          {dateError && (
                            <p style={{ ...errorMsgStyle, marginTop: '4px' }}>
                              <AlertCircle size={13} style={{ display: 'inline', marginRight: '4px' }} />
                              {dateError}
                            </p>
                          )}
                          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px', marginBottom: 0 }}>
                            Mon – Fri only · {getMinDate()} → {getMaxDate()}
                          </p>
                        </div>
                      )}
                    </SpecRow>

                  </div>

                  {formStatus === 'error' && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', marginTop: '16px', color: '#dc2626', fontSize: '0.88rem' }}>
                      <AlertCircle size={17} style={{ flexShrink: 0, marginTop: '1px' }} />
                      <span>
                        Something went wrong. Please try again or email us at{' '}
                        <a href="mailto:info@emifree.com" style={{ color: '#dc2626' }}>info@emifree.com</a>
                      </span>
                    </div>
                  )}

                  {/* ── FOOTER ──────────────────────────────────────────── */}
                  <div
                    className="emifree-footer"
                    style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}
                  >
                    <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0, flex: 1, minWidth: '160px' }}>
                      Alternatively, send machine photos to{' '}
                      <a href="mailto:info@emifree.com" style={{ color: '#2563eb', textDecoration: 'none' }}>info@emifree.com</a>
                      {' '}.
                    </p>
                    <div className="emifree-footer-buttons" style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={onClose}
                        style={{ padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: 500, color: '#374151', fontSize: '0.9rem' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 22px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              style={{ display: 'inline-block' }}
                            >⏳</motion.span>
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            Send Inquiry
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Shared style objects
───────────────────────────────────────────────────────────────────────────── */
const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '5px',
};

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const errorMsgStyle = {
  fontSize: '0.78rem',
  color: '#dc2626',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
};

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components — defined OUTSIDE modal for render stability
───────────────────────────────────────────────────────────────────────────── */

const SectionHeader = ({ label }) => (
  <div style={{ margin: '24px 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>
      {label}
    </span>
    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
  </div>
);

/**
 * SpecRow — card-style question block.
 * Height is entirely driven by its children — no phantom minHeight.
 */
const SpecRow = ({ label, sublabel, children }) => (
  <div style={{
    padding: '14px 16px',
    background: '#f9fafb',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }}>
    <div>
      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#374151' }}>{label}</span>
      {sublabel && (
        <span style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginTop: '1px' }}>{sublabel}</span>
      )}
    </div>
    {children}
  </div>
);

const Field = ({
  id, label, name, type = 'text', required = false,
  placeholder, icon: Icon, formData, errors, onChange,
}) => (
  <div id={id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <label style={labelStyle}>
      {Icon && <Icon size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#6b7280' }} />}
      {label}
      {required && <span style={{ color: '#dc2626', marginLeft: '2px' }}>*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={formData[name]}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        ...inputStyle,
        borderColor: errors[name] ? '#dc2626' : '#d1d5db',
      }}
    />
    {/* Always-present error slot — fixed height avoids reflow */}
    <div style={{ height: '18px', display: 'flex', alignItems: 'center' }}>
      {errors[name] && (
        <span style={errorMsgStyle}>
          <AlertCircle size={12} style={{ marginRight: '4px', flexShrink: 0 }} />
          {errors[name]}
        </span>
      )}
    </div>
  </div>
);

const RadioGroup = ({ name, value, onChange }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {['yes', 'no'].map(opt => (
      <label
        key={opt}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 16px',
          border: `1.5px solid ${value === opt ? '#1d4ed8' : '#d1d5db'}`,
          borderRadius: '8px',
          background: value === opt ? '#eff6ff' : '#fff',
          cursor: 'pointer',
          fontSize: '0.88rem',
          fontWeight: value === opt ? 600 : 400,
          transition: 'border-color 0.15s, background 0.15s',
          userSelect: 'none',
        }}
      >
        <input
          type="radio"
          name={name}
          value={opt}
          checked={value === opt}
          onChange={onChange}
          style={{ display: 'none' }}
        />
        {value === opt && <CheckCircle size={13} color="#1d4ed8" />}
        {opt === 'yes' ? 'Yes' : 'No'}
      </label>
    ))}
  </div>
);

const PipeDiameterSelector = ({ formData, onChange }) => {
  const diameters = ['100', '120', '150', '200', '250'];
  return (
    <div>
      <p style={{ ...labelStyle, marginBottom: '10px' }}>
        Diameter of the raw gas pipe connection (mm)
      </p>
      <div className="emifree-chip-row" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {diameters.map(d => {
          const selected = formData.pipeDiameterMm === d;
          return (
            <button
              key={d}
              type="button"
              onClick={() => onChange({ target: { name: 'pipeDiameterMm', value: d } })}
              style={{
                padding: '8px 16px',
                border: `1.5px solid ${selected ? '#1d4ed8' : '#d1d5db'}`,
                borderRadius: '8px',
                background: selected ? '#eff6ff' : '#fff',
                color: selected ? '#1d4ed8' : '#374151',
                fontWeight: selected ? 700 : 400,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s, color 0.15s',
                minWidth: '64px',
                fontFamily: 'inherit',
              }}
            >
              ⌀ {d}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InquiryFormModal;