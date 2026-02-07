import React from 'react';

const Login = () => {
    return (
        <div className="pt-40 pb-24 px-6 md:px-12 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-zinc-900 rounded-[2.5rem] border border-white/5 p-10 md:p-12 shadow-2xl">
                <h2 className="text-3xl font-black text-white mb-8 text-center italic tracking-tight">WELCOME BACK</h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                    <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg shadow-xl active:scale-[0.98] transition-all mt-4">
                        LOGIN
                    </button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-8">
                    Don't have an account? <span className="text-white font-bold cursor-pointer underline underline-offset-4">Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
