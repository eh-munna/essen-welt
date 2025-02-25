const toastOptions = {
  loading: 'Loading',
  success: (user) => (
    <div className="bg-white px-6 animate-enter">{`Hi! ${user} `}</div>
  ),
  error: (err) => (
    <div className="bg-white px-6">
      {err.code === `auth/email-already-in-use` && 'Email already in use!'}
    </div>
  ),

  styles: {
    style: { paddingLeft: '1.5rem', paddingRight: '1.5rem' },
    loading: { position: 'top-right', duration: 3000 },
    success: { position: 'top-right', duration: 3000 },
    error: { position: 'top-right', duration: 3000 },
  },
};

export default toastOptions;
