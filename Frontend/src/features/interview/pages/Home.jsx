import React, { useState, useRef, useEffect } from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/use.auth'

const Home = () => {
    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [resumeFile, setResumeFile] = useState(null)
    const resumeInputRef = useRef(null)
    const { generateReport, loading, reports, getReports } = useInterview()
    const navigate = useNavigate()
    const { handleLogout } = useAuth()

    useEffect(() => {
        getReports()
    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) setResumeFile(file)
    }

    const handleRemoveFile = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setResumeFile(null)
        if (resumeInputRef.current) resumeInputRef.current.value = ''
    }

    const handleGenerateReport = async () => {
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })

        if (data) {
            navigate(`/interview/${data._id}`)
        }
    }

    return (
        <div className='home-page'>
            {/* Loading Overlay */}
            {loading && (
                <div className='loading-overlay'>
                    <div className='loading-overlay__card'>
                        <div className='loading-overlay__icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
                            </svg>
                        </div>
                        <h2 className='loading-overlay__title'>Generating Your Strategy</h2>
                        <p className='loading-overlay__subtitle'>Our AI is analyzing your profile and the job requirements</p>
                        <div className='loading-overlay__steps'>
                            <div className='loading-step loading-step--active'>
                                <span className='loading-step__dot' />
                                <span>Parsing resume & job description</span>
                            </div>
                            <div className='loading-step'>
                                <span className='loading-step__dot' />
                                <span>Generating interview questions</span>
                            </div>
                            <div className='loading-step'>
                                <span className='loading-step__dot' />
                                <span>Building preparation roadmap</span>
                            </div>
                        </div>
                        <div className='loading-overlay__bar'>
                            <div className='loading-overlay__bar-fill' />
                        </div>
                    </div>
                </div>
            )}

            {/* Top Bar for Logout */}
            <div className='top-bar'>
                <button className='logout-btn' onClick={handleLogout} disabled={loading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Logout
                </button>
            </div>

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className={`dropzone ${resumeFile ? 'dropzone--has-file' : ''}`} htmlFor='resume'>
                                {resumeFile ? (
                                    <>
                                        <span className='dropzone__file-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                        </span>
                                        <p className='dropzone__filename'>{resumeFile.name}</p>
                                        <p className='dropzone__filesize'>{(resumeFile.size / 1024).toFixed(1)} KB</p>
                                        <button className='dropzone__remove' onClick={handleRemoveFile} type='button'>✕</button>
                                    </>
                                ) : (
                                    <>
                                        <span className='dropzone__icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                        </span>
                                        <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                        <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                    </>
                                )}
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' onChange={handleFileChange} />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        disabled={loading}
                        className={`generate-btn ${loading ? 'generate-btn--loading' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        {loading ? 'Generating...' : 'Generate My Interview Strategy'}
                    </button>
                </div>
            </div>

            {/* Recent REPORT lIST */}
            {reports && reports.length > 0 && (
                <div className='recent-reports'>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#e6edf3', margin: 0 }}>Recent Reports</h2>
                        <span style={{ fontSize: '0.75rem', color: '#7d8590', background: '#1c2230', padding: '0.15rem 0.6rem', borderRadius: '2rem', border: '1px solid #2a3348' }}>{reports.length} generated</span>
                    </div>
                    
                    <div className='reports-list'>
                        {reports.map(report => (
                            <div 
                                key={report._id} 
                                className='report-item' 
                                onClick={() => navigate(`/interview/${report._id}`)}
                                style={{ minWidth: '280px', transition: 'border-color 0.2s', ':hover': { borderColor: '#4a5568'} }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1rem', color: '#e6edf3', fontWeight: '600', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {report.title}
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', color: '#7d8590', whiteSpace: 'nowrap', marginTop: '0.2rem' }}>
                                        {new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #2a3348' }}>
                                    <div className='match-score' style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                        {report.matchScore}% Match
                                    </div>
                                    <div style={{ flex: 1 }}></div>
                                    <span style={{ fontSize: '0.75rem', color: '#ff2d78', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: '600', opacity: 0.9 }}>
                                        View Strategy
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}






            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home