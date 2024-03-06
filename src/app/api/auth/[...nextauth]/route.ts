import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize() {
				return null;
			},
		}),
	],
    pages:{
        signIn: '/auth/login',
    }
});

export { handler as GET, handler as POST };
