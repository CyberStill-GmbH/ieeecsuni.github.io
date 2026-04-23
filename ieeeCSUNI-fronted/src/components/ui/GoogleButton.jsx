const GoogleButton = ({ onClick, text }) => (
  <button 
    type="button"
    onClick={onClick}
    className="w-full py-3 px-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
  >
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.712s.102-1.173.282-1.712V4.956H.957a8.996 8.996 0 000 8.088l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.454 0 2.38 2.05 1.252 5.044L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
    </svg>
    <span className="text-sm">{text} con Google</span>
  </button>
)
